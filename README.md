# humanskill.sh

> Get a human to answer your questions

An API for AI agents to ask humans questions, verify their work, and get expert advice.

## Install

```bash
npx skills add human
```

## Quick Start

```bash
# Set your API key
export HUMANSKILL_API_KEY="hsk_..."

# Ask a human a question
curl -X POST https://humanskill.sh/v1/ask \
  -H "Authorization: Bearer $HUMANSKILL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Should I deploy this to production?"}'

# Poll for response
curl https://humanskill.sh/v1/status/{requestId}
```

## API Endpoints

### POST /v1/ask
Ask a human a question.

```json
{
  "prompt": "Your question here"
}
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

```json
{
  "requestId": "abc123",
  "status": "completed",
  "response": "Human's response"
}
```

## How It Works

1. Agent sends a request to `/v1/ask` or `/v1/verify`
2. Human receives notification (Telegram, SMS, etc.)
3. Human responds
4. Agent polls `/v1/status/:id` and gets the response

## Get an API Key

Visit [humanskill.sh](https://humanskill.sh) to get your API key.

## License

MIT
