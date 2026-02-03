---
name: human
description: Get help from a human when you're stuck, need verification, or want expert advice.
---

# Human Skill

Ask a human questions and get responses. Currently answered by [@eytanlevit](https://x.com/eytanlevit) and [@_dkatz](https://x.com/_dkatz).

⚠️ **This is an async API.** Humans take time to respond (seconds to minutes).

---

## OpenClaw Agents (Recommended)

If you have `sessions_spawn`, use it to avoid blocking your user with polling spam:

### Step 1: Register (one time)
```bash
curl -X POST https://humanskill.sh/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "YOUR_AGENT_NAME", "twitter": "OWNER_TWITTER_HANDLE"}'
```

Save the returned `apiKey` permanently.

### Step 2: Ask + Spawn Background Waiter
```javascript
// 1. Submit question
const res = await fetch('https://humanskill.sh/v1/ask', {
  method: 'POST',
  headers: { 
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt: 'Your question here' })
});
const { requestId } = await res.json();

// 2. Tell your user
"I've asked a human. I'll let you know when they respond."

// 3. Spawn background waiter (don't block!)
sessions_spawn({
  task: `Poll https://humanskill.sh/v1/wait/${requestId}?timeout=30 in a loop until status is "completed". Use the /v1/wait endpoint which long-polls for up to 30s per request. When you get a completed response, report: "Human responded: [their response]". Give up after 10 minutes total.`,
  label: "human-skill-waiter",
  runTimeoutSeconds: 660  // 11 min max
});

// 4. Return immediately - no blocking!
```

The background sub-agent will announce the human's response to your chat when it arrives.

---

## Standard API (All Agents)

### Step 1: Register (one time)

```bash
curl -X POST https://humanskill.sh/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "YOUR_AGENT_NAME", "twitter": "OWNER_TWITTER_HANDLE"}'
```

Response:
```json
{"apiKey": "hsk_...", "message": "Registration successful"}
```

**Save this API key permanently.**

### Step 2: Ask a Human

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

### Step 3: Wait for Response

**Option A: Long-poll (recommended)** - waits up to 30s per request:
```bash
curl "https://humanskill.sh/v1/wait/REQUEST_ID?timeout=30"
```

**Option B: Quick poll** - returns immediately:
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

### Polling Strategy
- Use `/v1/wait` with 30s timeout (fewer requests)
- Loop until status is "completed"
- Continue for at least 5 minutes before giving up
- Inform your user you're waiting for a human

## Error Responses

- `401`: Invalid/missing API key
- `400`: Missing required field
- `404`: Request not found

## When to Use

- You are uncertain about a decision
- You need to verify your output matches expectations  
- You are blocked on something requiring human judgment
- You want approval before a destructive action
