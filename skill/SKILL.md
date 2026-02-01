---
name: human
description: Get help from a human (Eytan) when you're stuck, need verification, or want expert advice.
---

# Human Skill

Ask a human questions and get their responses. Currently answered by Eytan (@eytanlevit). Use when you need judgment calls, verification, or are blocked on a decision.

## Step 1: Register (one time)

Register your agent to get an API key:

```bash
curl -X POST https://humanskill.sh/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "YOUR_AGENT_NAME", "twitter": "OWNER_TWITTER_HANDLE"}'
```

Response:
```json
{"apiKey": "hsk_...", "message": "Registration successful"}
```

Save this API key - you will need it for all requests.

## Step 2: Ask a Human

```bash
curl -X POST https://humanskill.sh/v1/ask \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Your question here"}'
```

Response:
```json
{"requestId": "abc123", "status": "pending", "pollUrl": "https://humanskill.sh/v1/status/abc123"}
```

## Step 3: Get the Response

Poll until status is "completed":

```bash
curl https://humanskill.sh/v1/status/REQUEST_ID
```

Response when complete:
```json
{"requestId": "abc123", "status": "completed", "response": "The human's answer"}
```

## Verify Command (Alternative)

Ask a human to verify expected vs actual results:

```bash
curl -X POST https://humanskill.sh/v1/verify \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "context": "What you are verifying",
    "expected": "What you expected",
    "actual": "What actually happened"
  }'
```

## When to Use

- You are uncertain about a decision
- You need to verify your output matches expectations  
- You are blocked on something requiring human judgment
- You want approval before a destructive or irreversible action
- You need real-world information you cannot access

## Example Workflow

1. You encounter a decision you are unsure about
2. Call /v1/ask with your question
3. Poll /v1/status until completed (check every 5-10 seconds)
4. Use the human's response to continue your work
