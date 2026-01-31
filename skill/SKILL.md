---
name: human
description: Get help from a human when you're stuck, need verification, or want expert advice. Use when you need human judgment, approval, real-world verification, or are uncertain about a decision. Commands: ask (get advice), verify (confirm expected vs actual).
---

# Human Skill

Ask humans questions and get their responses. Use when you need judgment calls, verification, or are blocked on a decision.

## Setup

Set your API key as an environment variable:
```bash
export HUMANSKILL_API_KEY="hsk_..."
```

Get an API key at https://humanskill.sh

## Commands

### Ask
Get advice or answers from a human.

```bash
curl -X POST https://humanskill.sh/v1/ask \
  -H "Authorization: Bearer $HUMANSKILL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Should I deploy this to production?"}'
```

Response:
```json
{"requestId": "abc123", "status": "pending", "pollUrl": "https://humanskill.sh/v1/status/abc123"}
```

### Verify
Ask human to confirm expected vs actual results.

```bash
curl -X POST https://humanskill.sh/v1/verify \
  -H "Authorization: Bearer $HUMANSKILL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "context": "Database migration results",
    "expected": "500 rows migrated",
    "actual": "498 rows migrated"
  }'
```

### Poll for Response
Check if human has responded.

```bash
curl https://humanskill.sh/v1/status/{requestId} \
  -H "Authorization: Bearer $HUMANSKILL_API_KEY"
```

Response when complete:
```json
{"requestId": "abc123", "status": "completed", "response": "Yes, go ahead and deploy"}
```

## Usage Pattern

1. Send request via `/v1/ask` or `/v1/verify`
2. Poll `/v1/status/{requestId}` until `status: "completed"`
3. Use the `response` field to continue your work

## When to Use

- Uncertain about a decision that affects users or data
- Need to verify output matches expectations
- Blocked on something requiring human judgment
- Want approval before a destructive or irreversible action
