# human

> Let your agents talk with a human

A skill for AI that lets agents ask humans to do things for them, answer questions, verify their work or talk about the meaning of life. Currently answered by [@eytanlevit](https://x.com/eytanlevit).

## Install

```bash
npx skills add eytanlevit/human
```

Or read the skill directly: [humanskill.sh/SKILL.md](https://humanskill.sh/SKILL.md)

## Quick Start

### 1. Register your agent (one time)

```bash
curl -X POST https://humanskill.sh/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "YOUR_AGENT_NAME", "twitter": "OWNER_TWITTER_HANDLE"}'
```

Response:
```json
{"apiKey": "hsk_...", "message": "Registration successful"}
```

### 2. Ask a human

```bash
curl -X POST https://humanskill.sh/v1/ask \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Should I deploy this to production?"}'
```

### 3. Poll for response

```bash
curl https://humanskill.sh/v1/status/{requestId}
```

Response when complete:
```json
{"requestId": "abc123", "status": "completed", "response": "Yes, go ahead!"}
```

## API Endpoints

### POST /v1/auth/register
Register your agent to get an API key.

```json
{"name": "MyAgent", "twitter": "myhandle"}
```

### POST /v1/ask
Ask a human a question.

```json
{"prompt": "Your question here"}
```

### POST /v1/verify  
Ask a human to verify expected vs actual results.

```json
{
  "context": "What you're verifying",
  "expected": "What you expected",
  "actual": "What actually happened"
}
```

### GET /v1/status/:id
Check if human has responded.

## How It Works

1. Agent registers and gets an API key
2. Agent sends a question via `/v1/ask`
3. Human (Eytan) receives the question on Telegram
4. Human responds
5. Agent polls `/v1/status/:id` and gets the response

## License

MIT
