const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>human - Let your agents talk with a human</title>
  <meta name="description" content="A skill for AI that lets agents ask humans questions, verify work, and get expert advice.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='5' r='1'/><path d='m9 20 3-6 3 6'/><path d='m6 8 6 2 6-2'/><path d='M12 10v4'/></svg>">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
      background: #0a0a0a;
      color: #e0e0e0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .container { max-width: 650px; text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 1.5rem; color: #fff; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
    h1 svg { width: 2.5rem; height: 2.5rem; stroke: #fff; }
    .description { color: #aaa; line-height: 1.8; margin-bottom: 1rem; }
    .operators { color: #888; margin-bottom: 2.5rem; }
    .operators a { color: #fff; text-decoration: none; }
    .operators a:hover { text-decoration: underline; }
    .tagline s { color: #888; text-decoration: line-through; font-size: inherit; }
    .section-label {
      font-size: 1.2rem;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-bottom: 1rem;
      font-weight: bold;
    }
    .primary-box {
      background: #1a1a1a;
      border: 2px solid #fff;
      border-radius: 8px;
      padding: 1.5rem 2rem 1rem 2rem;
      margin-bottom: 1.5rem;
    }
    .primary-instruction {
      font-size: 0.9rem;
      color: #999;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .copy-btn-primary {
      background: #fff;
      border: none;
      cursor: pointer;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      color: #000;
      font-weight: bold;
      font-size: 0.85rem;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .copy-btn-primary:hover { background: #22c55e; transform: translateY(-1px); }
    .copy-btn-primary svg { width: 16px; height: 16px; fill: #000; }
    .copy-btn-primary.copied { background: #888; color: #fff; }
    .copy-btn-primary.copied svg { fill: #fff; }
    .secondary-text {
      font-size: 0.85rem;
      color: #555;
      margin-bottom: 2rem;
    }
    .secondary-text code {
      color: #888;
      background: #1a1a1a;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .secondary-text .copy-link {
      color: #666;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .secondary-text .copy-link:hover { color: #888; }
    .description { color: #aaa; line-height: 1.8; margin-bottom: 2rem; }
    .endpoints {
      text-align: left;
      background: #111;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .endpoint { margin-bottom: 1rem; }
    .endpoint:last-child { margin-bottom: 0; }
    .method { color: #60a5fa; font-weight: bold; }
    .path { color: #fbbf24; }
    .endpoint-desc { color: #888; font-size: 0.9rem; margin-left: 1rem; }
    .cta {
      display: inline-block;
      background: #fff;
      color: #000;
      padding: 0.8rem 2rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      margin-right: 1rem;
      margin-bottom: 1rem;
      transition: transform 0.1s;
    }
    .cta:hover { transform: translateY(-2px); }
    .cta.secondary { background: #333; color: #fff; }
    .footer { margin-top: 3rem; color: #555; font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>human</h1>
    <p class="description">
      human is a skill that lets AI agents ask humans for help. We're starting with <strong>coding agents</strong> — unsticking them on tasks they're still not great at: UI validation, login flows, voice interfaces, and anything that needs human eyes. Also handy for answering questions, doing things agents can't, or just chatting about the meaning of life.
    </p>
    <p class="operators">Human operators: <a href="https://x.com/eytanlevit" target="_blank">@eytanlevit</a>, <a href="https://x.com/_dkatz" target="_blank">@_dkatz</a></p>
    <p class="section-label">📋 Copy this to your agent</p>
    <div class="primary-box">
      <p class="primary-instruction">Please read https://humanskill.sh/SKILL.md and follow the instructions</p>
      <button class="copy-btn-primary" onclick="copyPrimary()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
        Copy
      </button>
    </div>
    <p class="secondary-text">Or install as a skill: <code>npx skills add eytanlevit/human</code> <span class="copy-link" onclick="copySecondary()">(copy)</span></p>
    <div>
      <a href="https://github.com/eytanlevit/human" class="cta secondary">GitHub</a>
    </div>
    <div class="footer">
      <p>Built by humans, for agents</p>
    </div>
  </div>
  <script>
    function copyPrimary() {
      navigator.clipboard.writeText('Please read https://humanskill.sh/SKILL.md and follow the instructions');
      const btn = document.querySelector('.copy-btn-primary');
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy';
        btn.classList.remove('copied');
      }, 2000);
    }
    function copySecondary() {
      navigator.clipboard.writeText('npx skills add eytanlevit/human');
      const link = document.querySelector('.copy-link');
      link.textContent = '(copied!)';
      setTimeout(() => link.textContent = '(copy)', 1500);
    }
  </script>
</body>
</html>`;

const SKILL_MD = `---
name: human
description: Get help from a human (Eytan) when you're stuck, need verification, or want expert advice.
---

# Human Skill

Ask a human questions and get their responses. Currently answered by Eytan (@eytanlevit) and David (@_dkatz).

⚠️ **This is an async API.** Humans take time to respond (seconds to minutes).

---

## OpenClaw Agents (Recommended)

If you have \`sessions_spawn\`, use it to avoid blocking your user with polling spam:

### Step 1: Register (one time)
\`\`\`bash
curl -X POST https://humanskill.sh/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name": "YOUR_AGENT_NAME", "twitter": "OWNER_TWITTER_HANDLE"}'
\`\`\`

Save the returned \`apiKey\` permanently.

### Step 2: Ask + Spawn Background Waiter
\`\`\`javascript
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
  task: \`Poll https://humanskill.sh/v1/wait/\${requestId}?timeout=30 in a loop until status is "completed". Use the /v1/wait endpoint which long-polls for up to 30s per request. When you get a completed response, report: "Human responded: [their response]". Give up after 10 minutes total.\`,
  label: "human-skill-waiter",
  runTimeoutSeconds: 660  // 11 min max
});

// 4. Return immediately - no blocking!
\`\`\`

The background sub-agent will announce the human's response to your chat when it arrives.

---

## Standard API (All Agents)

### Step 1: Register (one time)

\`\`\`bash
curl -X POST https://humanskill.sh/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name": "YOUR_AGENT_NAME", "twitter": "OWNER_TWITTER_HANDLE"}'
\`\`\`

Response:
\`\`\`json
{"apiKey": "hsk_...", "message": "Registration successful"}
\`\`\`

**Save this API key permanently.**

### Step 2: Ask a Human

\`\`\`bash
curl -X POST https://humanskill.sh/v1/ask \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Your question here"}'
\`\`\`

Response:
\`\`\`json
{"requestId": "abc123", "status": "pending"}
\`\`\`

### Step 3: Wait for Response

**Option A: Long-poll (recommended)** - waits up to 30s per request:
\`\`\`bash
curl "https://humanskill.sh/v1/wait/REQUEST_ID?timeout=30"
\`\`\`

**Option B: Quick poll** - returns immediately:
\`\`\`bash
curl https://humanskill.sh/v1/status/REQUEST_ID
\`\`\`

Response (pending):
\`\`\`json
{"requestId": "abc123", "status": "pending"}
\`\`\`

Response (completed):
\`\`\`json
{"requestId": "abc123", "status": "completed", "response": "The human's answer"}
\`\`\`

### Polling Strategy
- Use \`/v1/wait\` with 30s timeout (fewer requests)
- Loop until status is "completed"
- Continue for at least 5 minutes before giving up
- Inform your user you're waiting for a human

## Error Responses

- \`401\`: Invalid/missing API key
- \`400\`: Missing required field
- \`404\`: Request not found

## When to Use

- You are uncertain about a decision
- You need to verify your output matches expectations  
- You are blocked on something requiring human judgment
- You want approval before a destructive action
`;

interface Env {
  REQUESTS: KVNamespace;
  TELEGRAM_BOT_TOKEN: string;
  ENVIRONMENT: string;
}

// Eytan's Telegram group - all questions go here
const EYTAN_CHAT_ID = "-5225350201";

interface HumanRequest {
  id: string;
  type: 'ask' | 'verify';
  prompt: string;
  imageUrl?: string;
  expected?: string;
  actual?: string;
  humanId: string;
  status: 'pending' | 'completed';
  response?: string;
  createdAt: number;
  respondedAt?: number;
}

interface ApiKey {
  agentName: string;
  ownerTwitter: string;
  createdAt: number;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

async function sendTelegram(
  token: string,
  chatId: string,
  text: string,
  replyMarkup?: object
): Promise<boolean> {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const body: any = {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown',
  };
  if (replyMarkup) {
    body.reply_markup = JSON.stringify(replyMarkup);
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.ok;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check
    if (path === '/health') {
      return json({ status: 'ok', service: 'humanskill.sh', version: '0.1.0' });
    }

    // Landing page
    if (path === '/' || path === '/index.html') {
      return new Response(LANDING_PAGE, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // SKILL.md - Instructions for agents
    if (path === '/SKILL.md' || path === '/skill.md') {
      return new Response(SKILL_MD, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      });
    }

    // POST /v1/ask
    if (path === '/v1/ask' && request.method === 'POST') {
      try {
        const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (!apiKey) return json({ error: 'Missing API key. Register at POST /v1/auth/register' }, 401);

        const keyData = await env.REQUESTS.get(`apikey:${apiKey}`, 'json') as ApiKey | null;
        if (!keyData) return json({ error: 'Invalid API key. Register at POST /v1/auth/register' }, 401);

        const body = await request.json() as any;
        const { prompt } = body;
        if (!prompt) return json({ error: 'Missing prompt' }, 400);

        const reqId = generateId();
        // Route to the API key owner's chat if set, otherwise fallback to default group
        const targetChat = keyData.humanTelegramId || EYTAN_CHAT_ID;
        const reqData: HumanRequest = {
          id: reqId, type: 'ask', prompt,
          humanId: targetChat, status: 'pending', createdAt: Date.now(),
        };

        await env.REQUESTS.put(`request:${reqId}`, JSON.stringify(reqData), { expirationTtl: 86400 });

        // Build "From" line - handle both /start keys and /v1/auth/register keys
        const fromName = keyData.agentName || 'Agent';
        const fromOwner = keyData.ownerTwitter || (keyData.userId ? `user:${keyData.userId.slice(0,8)}` : 'unknown');
        const message = `🤖 *Human Skill Request*\n\nFrom: *${fromName}* (${fromOwner})\n\n${prompt}\n\n_Reply to this message to respond._\n\n\`ID: ${reqId}\``;
        const sent = await sendTelegram(env.TELEGRAM_BOT_TOKEN, targetChat, message);
        if (!sent) return json({ error: 'Failed to reach human' }, 500);

        return json({ requestId: reqId, status: 'pending', pollUrl: `https://humanskill.sh/v1/status/${reqId}` });
      } catch (e: any) {
        return json({ error: e.message }, 500);
      }
    }

    // POST /v1/verify
    if (path === '/v1/verify' && request.method === 'POST') {
      try {
        const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (!apiKey) return json({ error: 'Missing API key. Register at POST /v1/auth/register' }, 401);

        const keyData = await env.REQUESTS.get(`apikey:${apiKey}`, 'json') as ApiKey | null;
        if (!keyData) return json({ error: 'Invalid API key. Register at POST /v1/auth/register' }, 401);

        const body = await request.json() as any;
        const { expected, actual, context } = body;
        if (!expected || !actual) return json({ error: 'Missing expected or actual' }, 400);

        const reqId = generateId();
        // Route to the API key owner's chat if set, otherwise fallback to default group
        const targetChat = keyData.humanTelegramId || EYTAN_CHAT_ID;
        const reqData: HumanRequest = {
          id: reqId, type: 'verify', prompt: context || 'Please verify',
          expected, actual, humanId: targetChat, status: 'pending', createdAt: Date.now(),
        };

        await env.REQUESTS.put(`request:${reqId}`, JSON.stringify(reqData), { expirationTtl: 86400 });

        // Build "From" line - handle both /start keys and /v1/auth/register keys
        const fromName = keyData.agentName || 'Agent';
        const fromOwner = keyData.ownerTwitter || (keyData.userId ? `user:${keyData.userId.slice(0,8)}` : 'unknown');
        const message = `🔍 *Verification Request*\n\nFrom: *${fromName}* (${fromOwner})\n\n${context || 'Please verify:'}\n\n*Expected:*\n\`\`\`\n${expected}\n\`\`\`\n\n*Actual:*\n\`\`\`\n${actual}\n\`\`\`\n\n_Reply ✅ to confirm, ❌ to reject, or explain._\n\n\`ID: ${reqId}\``;
        const sent = await sendTelegram(env.TELEGRAM_BOT_TOKEN, targetChat, message);
        if (!sent) return json({ error: 'Failed to reach human' }, 500);

        return json({ requestId: reqId, status: 'pending', pollUrl: `https://humanskill.sh/v1/status/${reqId}` });
      } catch (e: any) {
        return json({ error: e.message }, 500);
      }
    }

    // GET /v1/status/:id
    if (path.startsWith('/v1/status/') && !path.includes('/wait/') && request.method === 'GET') {
      const reqId = path.split('/').pop();
      if (!reqId) return json({ error: 'Missing request ID' }, 400);

      const reqData = await env.REQUESTS.get(`request:${reqId}`, 'json') as HumanRequest | null;
      if (!reqData) return json({ error: 'Request not found' }, 404);

      return json({
        requestId: reqData.id, status: reqData.status, response: reqData.response,
        createdAt: reqData.createdAt, respondedAt: reqData.respondedAt,
      });
    }

    // GET /v1/wait/:id - Long-polling endpoint (waits up to 30s for response)
    if (path.startsWith('/v1/wait/') && request.method === 'GET') {
      const reqId = path.split('/').pop();
      if (!reqId) return json({ error: 'Missing request ID' }, 400);

      const timeoutParam = url.searchParams.get('timeout');
      const maxWait = Math.min(parseInt(timeoutParam || '30', 10), 30) * 1000; // Max 30s
      const pollInterval = 2000; // Check every 2s
      const startTime = Date.now();

      // Initial check
      let reqData = await env.REQUESTS.get(`request:${reqId}`, 'json') as HumanRequest | null;
      if (!reqData) return json({ error: 'Request not found' }, 404);

      // If already completed, return immediately
      if (reqData.status === 'completed') {
        return json({
          requestId: reqData.id, status: reqData.status, response: reqData.response,
          createdAt: reqData.createdAt, respondedAt: reqData.respondedAt,
        });
      }

      // Long-poll: wait until completed or timeout
      while (Date.now() - startTime < maxWait) {
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        
        reqData = await env.REQUESTS.get(`request:${reqId}`, 'json') as HumanRequest | null;
        if (!reqData) return json({ error: 'Request not found' }, 404);
        
        if (reqData.status === 'completed') {
          return json({
            requestId: reqData.id, status: reqData.status, response: reqData.response,
            createdAt: reqData.createdAt, respondedAt: reqData.respondedAt,
          });
        }
      }

      // Timeout - return pending status
      return json({
        requestId: reqData.id, status: 'pending', 
        createdAt: reqData.createdAt, waitedMs: Date.now() - startTime,
      });
    }

    // POST /webhook/telegram
    if (path === '/webhook/telegram' && request.method === 'POST') {
      try {
        const update = await request.json() as any;
        const message = update.message;
        if (!message?.text) return new Response('OK');

        const chatId = message.chat.id.toString();
        const text = message.text.trim();

        // /register for groups - link API key to this chat
        if (text.startsWith('/register')) {
          const parts = text.split(' ');
          if (parts.length < 2 || !parts[1].startsWith('hsk_')) {
            await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `📋 *Register this chat to receive questions*\n\nUsage: \`/register YOUR_API_KEY\`\n\nGet an API key at humanskill.sh (agents register via API)`);
            return new Response('OK');
          }
          const apiKey = parts[1];
          const keyData = await env.REQUESTS.get(`apikey:${apiKey}`, 'json') as ApiKey | null;
          if (!keyData) {
            await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `❌ Invalid API key.`);
            return new Response('OK');
          }
          keyData.humanTelegramId = chatId;
          await env.REQUESTS.put(`apikey:${apiKey}`, JSON.stringify(keyData));
          const chatType = message.chat.type === 'private' ? 'chat' : 'group';
          await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `✅ *${chatType} registered!* Questions for this API key will appear here.`);
          return new Response('OK');
        }

        // Non-reply message - just explain what this bot does
        if (!message.reply_to_message?.text) {
          await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `🤖 This bot receives questions from AI agents.\n\nReply to a question message to respond.\n\n*Docs:* humanskill.sh`);
          return new Response('OK');
        }

        // Handle reply
        const originalText = message.reply_to_message.text;
        const idMatch = originalText.match(/ID: ([a-z0-9]+)/);
        if (!idMatch) return new Response('OK');

        const reqId = idMatch[1];
        const reqData = await env.REQUESTS.get(`request:${reqId}`, 'json') as HumanRequest | null;
        if (!reqData || reqData.status === 'completed') return new Response('OK');

        reqData.status = 'completed';
        reqData.response = message.text;
        reqData.respondedAt = Date.now();
        await env.REQUESTS.put(`request:${reqId}`, JSON.stringify(reqData), { expirationTtl: 86400 });

        await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `✅ Response recorded for \`${reqId}\``);
        return new Response('OK');
      } catch (e) {
        return new Response('OK');
      }
    }

    // POST /v1/auth/register - Self-service API key registration
    if (path === '/v1/auth/register' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const { name, twitter } = body;
        
        if (!name) return json({ error: 'Missing name (your agent name)' }, 400);
        if (!twitter) return json({ error: 'Missing twitter (owner Twitter handle)' }, 400);

        const apiKey = 'hsk_' + generateId() + generateId();
        const keyData: ApiKey = { 
          agentName: name, 
          ownerTwitter: twitter.startsWith('@') ? twitter : '@' + twitter,
          createdAt: Date.now() 
        };
        await env.REQUESTS.put(`apikey:${apiKey}`, JSON.stringify(keyData));

        return json({ 
          apiKey, 
          message: 'Registration successful. Use this key in Authorization header.',
          usage: 'Authorization: Bearer ' + apiKey
        });
      } catch (e: any) {
        return json({ error: e.message }, 500);
      }
    }

    return json({ error: 'Not found' }, 404);
  },
};
