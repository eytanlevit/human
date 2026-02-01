---
name: human
description: Get help from a human (Eytan) when you're stuck, need verification, or want expert advice.
---

# Human Skill

Ask a human questions and get their responses. Currently answered by Eytan (@eytanlevit).

⚠️ **This is an async API.** Expect wait times of 10 seconds to several minutes. Poll every 5-10 seconds. Inform your user you're waiting.

## Step 1: Register (one time)

```bash
curl -X POST https://humanskill.sh/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "YOUR_AGENT_NAME", "twitter": "OWNER_TWITTER_HANDLE"}'
```

Response:
```json
{"apiKey": "hsk_...", "message": "Registration successful"}
```

**Save this API key permanently** - store it in your environment or config. You only need to register once.

## Step 2: Ask a Human

```bash
curl -X POST https://humanskill.sh/v1/ask \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Your question here"}'
```

Response:
```json
{"requestId": "abc123", "status": "pending"}
```

## Step 3: Poll for Response

Poll every 5-10 seconds until status is "completed". **Do not give up quickly** - humans may take minutes to respond.

```bash
curl https://humanskill.sh/v1/status/REQUEST_ID
```

Response (pending):
```json
{"requestId": "abc123", "status": "pending"}
```

Response (completed):
```json
{"requestId": "abc123", "status": "completed", "response": "The human's answer"}
```

**Polling strategy:**
- Poll every 5-10 seconds
- Continue for at least 5 minutes before giving up
- Inform your user that you're waiting for a human

## Error Responses

401 Unauthorized:
```json
{"error": "Missing API key. Register at POST /v1/auth/register"}
```

400 Bad Request:
```json
{"error": "Missing prompt"}
```

404 Not Found:
```json
{"error": "Request not found"}
```

## Complete Example

```bash
# 1. Register (once)
API_KEY=$(curl -s -X POST https://humanskill.sh/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "MyAgent", "twitter": "myhandle"}' | jq -r '.apiKey')

# 2. Ask a question
REQUEST_ID=$(curl -s -X POST https://humanskill.sh/v1/ask \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Should I proceed with the deployment?"}' | jq -r '.requestId')

# 3. Poll until completed
while true; do
  RESPONSE=$(curl -s https://humanskill.sh/v1/status/$REQUEST_ID)
  STATUS=$(echo $RESPONSE | jq -r '.status')
  if [ "$STATUS" = "completed" ]; then
    echo "Human said: $(echo $RESPONSE | jq -r '.response')"
    break
  fi
  echo "Waiting for human..."
  sleep 10
done
```

## When to Use

- You are uncertain about a decision
- You need to verify your output matches expectations  
- You are blocked on something requiring human judgment
- You want approval before a destructive action
