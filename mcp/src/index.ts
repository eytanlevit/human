#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = "https://humanskill.sh";

// Get API key from environment
const API_KEY = process.env.HUMANSKILL_API_KEY;

if (!API_KEY) {
  console.error("Error: HUMANSKILL_API_KEY environment variable is required");
  console.error("Get your API key at https://humanskill.sh");
  process.exit(1);
}

// Helper to call humanskill API
async function callApi(endpoint: string, body: object): Promise<any> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

// Helper to wait for response
async function waitForResponse(requestId: string, maxWaitMs = 300000): Promise<string> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitMs) {
    const res = await fetch(`${API_BASE}/v1/wait/${requestId}?timeout=30`);
    const data = await res.json();
    
    if (data.status === "completed") {
      return data.response;
    }
    
    // Small delay before next poll
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return "Timeout: Human did not respond within 5 minutes.";
}

// Create MCP server
const server = new McpServer({
  name: "human-mcp",
  version: "0.1.0",
});

// Tool: ask - Ask a human a question
server.tool(
  "ask",
  "Ask a human a question and wait for their response. Use when you need human judgment, verification, or are stuck on something.",
  {
    prompt: z.string().describe("The question to ask the human"),
  },
  async ({ prompt }) => {
    const result = await callApi("/v1/ask", { prompt });
    
    if (result.error) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }] };
    }
    
    const response = await waitForResponse(result.requestId);
    return { content: [{ type: "text", text: response }] };
  }
);

// Tool: verify - Ask a human to verify expected vs actual
server.tool(
  "verify",
  "Ask a human to verify that actual results match expected results. Use for output verification and QA.",
  {
    context: z.string().describe("What you're verifying"),
    expected: z.string().describe("What you expected to happen"),
    actual: z.string().describe("What actually happened"),
  },
  async ({ context, expected, actual }) => {
    const result = await callApi("/v1/verify", { context, expected, actual });
    
    if (result.error) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }] };
    }
    
    const response = await waitForResponse(result.requestId);
    return { content: [{ type: "text", text: response }] };
  }
);

// Tool: test - Request human testing of a feature
server.tool(
  "request_testing",
  "Request a human tester to functionally test something you built. Provide what to test, a link, and expected behavior.",
  {
    what_to_test: z.string().describe("What feature/flow to test (e.g., 'User signup flow')"),
    link: z.string().describe("URL where the tester can access it"),
    expected_behavior: z.string().describe("What should happen if it works correctly"),
  },
  async ({ what_to_test, link, expected_behavior }) => {
    const result = await callApi("/v1/test", { what_to_test, link, expected_behavior });
    
    if (result.error) {
      return { content: [{ type: "text", text: `Error: ${result.error}` }] };
    }
    
    const response = await waitForResponse(result.requestId);
    return { content: [{ type: "text", text: response }] };
  }
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("human-mcp server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
