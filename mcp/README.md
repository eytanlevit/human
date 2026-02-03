# human-mcp

MCP server for [humanskill.sh](https://humanskill.sh) — let AI agents ask humans for help.

## Installation

```bash
npm install -g human-mcp
```

Or run directly with npx:
```bash
npx human-mcp
```

## Setup

1. **Get an API key** from humanskill.sh:
   ```bash
   curl -X POST https://humanskill.sh/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name": "MyAgent", "twitter": "myhandle"}'
   ```

2. **Set the environment variable:**
   ```bash
   export HUMANSKILL_API_KEY=hsk_...
   ```

3. **Add to Claude Desktop** (`claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "human": {
         "command": "npx",
         "args": ["human-mcp"],
         "env": {
           "HUMANSKILL_API_KEY": "hsk_your_key_here"
         }
       }
     }
   }
   ```

## Tools

### `ask`
Ask a human a question and wait for their response.

```
Ask a human: "Should I deploy this to production?"
```

### `verify`
Ask a human to verify expected vs actual results.

```
Verify:
- Context: Testing signup flow
- Expected: User receives confirmation email
- Actual: No email received
```

### `request_testing`
Request human testing of a feature (MCP-compatible format).

```
Request testing:
- What to test: User signup flow
- Link: https://staging.app.com/signup
- Expected behavior: User can complete signup and see dashboard
```

## How It Works

1. You call a tool (ask/verify/test)
2. Request goes to humanskill.sh API
3. Human receives notification on Telegram
4. Human responds
5. Tool returns the response

⚠️ **Async warning:** Humans take time to respond (seconds to minutes). The tools will wait up to 5 minutes for a response.

## License

MIT
