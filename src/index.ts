const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>humanskill.sh - Get a human to answer your questions</title>
  <meta name="description" content="API for AI agents to ask humans questions, verify work, and get expert advice.">
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
    h1 { font-size: 3rem; margin-bottom: 0.5rem; color: #fff; }
    .tagline { font-size: 1.1rem; color: #888; margin-bottom: 2rem; }
    .tagline s { color: #888; text-decoration: line-through; font-size: inherit; }
    .section-label {
      font-size: 1.2rem;
      color: #4ade80;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-bottom: 1rem;
      font-weight: bold;
    }
    .primary-box {
      background: #1a1a1a;
      border: 2px solid #4ade80;
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
      background: #4ade80;
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
    .copy-btn-primary.copied { background: #166534; color: #fff; }
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
      background: #4ade80;
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
    <h1>human</h1>
    <p class="tagline">Let your agents talk with a <s>human</s> Eytan</p>
    <p class="section-label">📋 Copy this to your agent</p>
    <div class="primary-box">
      <p class="primary-instruction">Please read https://humanskill.sh/SKILL.md and follow the instructions</p>
      <button class="copy-btn-primary" onclick="copyPrimary()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
        Copy
      </button>
    </div>
    <p class="secondary-text">Or install as a skill: <code>npx skills add eytanlevit/human</code> <span class="copy-link" onclick="copySecondary()">(copy)</span></p>
    <p class="description">
      An API for AI agents to ask humans questions, verify their work, and get expert advice.
      When your agent is stuck or needs approval, it asks a human and waits for the response.
    </p>
    <div class="endpoints">
      <div class="endpoint">
        <span class="method">POST</span> <span class="path">/v1/ask</span>
        <div class="endpoint-desc">Ask a human a question</div>
      </div>
      <div class="endpoint">
        <span class="method">POST</span> <span class="path">/v1/verify</span>
        <div class="endpoint-desc">Verify expected vs actual results</div>
      </div>
      <div class="endpoint">
        <span class="method">GET</span> <span class="path">/v1/status/:id</span>
        <div class="endpoint-desc">Check if human has responded</div>
      </div>
    </div>
    <div>
      <a href="https://t.me/human_skill_bot" class="cta">Get API Key</a>
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
description: Get help from a human when you're stuck, need verification, or want expert advice.
---

# Human Skill

Ask humans questions and get their responses. Use when you need judgment calls, verification, or are blocked on a decision.

## Setup

1. Get your API key: Message @human_skill_bot on Telegram and send /start
2. Set the environment variable:
\`\`\`bash
export HUMANSKILL_API_KEY="hsk_..."
\`\`\`

## How to Ask a Human

Send a POST request to ask a question:

\`\`\`bash
curl -X POST https://humanskill.sh/v1/ask \\
  -H "Authorization: Bearer $HUMANSKILL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Your question here"}'
\`\`\`

Response:
\`\`\`json
{"requestId": "abc123", "status": "pending", "pollUrl": "https://humanskill.sh/v1/status/abc123"}
\`\`\`

## How to Get the Response

Poll until status is "completed":

\`\`\`bash
curl https://humanskill.sh/v1/status/REQUEST_ID \\
  -H "Authorization: Bearer $HUMANSKILL_API_KEY"
\`\`\`

Response when complete:
\`\`\`json
{"requestId": "abc123", "status": "completed", "response": "The human's answer"}
\`\`\`

## Verify Command

Ask a human to verify expected vs actual results:

\`\`\`bash
curl -X POST https://humanskill.sh/v1/verify \\
  -H "Authorization: Bearer $HUMANSKILL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "context": "What you are verifying",
    "expected": "What you expected",
    "actual": "What actually happened"
  }'
\`\`\`

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
`;

interface Env {
  REQUESTS: KVNamespace;
  TELEGRAM_BOT_TOKEN: string;
  ENVIRONMENT: string;
}

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
  userId: string;
  humanTelegramId: string;
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
        if (!apiKey) return json({ error: 'Missing API key' }, 401);

        const keyData = await env.REQUESTS.get(`apikey:${apiKey}`, 'json') as ApiKey | null;
        if (!keyData) return json({ error: 'Invalid API key' }, 401);

        const body = await request.json() as any;
        const { prompt, imageUrl } = body;
        if (!prompt) return json({ error: 'Missing prompt' }, 400);

        const reqId = generateId();
        const reqData: HumanRequest = {
          id: reqId, type: 'ask', prompt, imageUrl,
          humanId: keyData.humanTelegramId, status: 'pending', createdAt: Date.now(),
        };

        await env.REQUESTS.put(`request:${reqId}`, JSON.stringify(reqData), { expirationTtl: 86400 });

        const message = `🤖 *Human Skill Request*\n\n${prompt}\n\n_Reply to this message to respond._\n\n\`ID: ${reqId}\``;
        const sent = await sendTelegram(env.TELEGRAM_BOT_TOKEN, keyData.humanTelegramId, message);
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
        if (!apiKey) return json({ error: 'Missing API key' }, 401);

        const keyData = await env.REQUESTS.get(`apikey:${apiKey}`, 'json') as ApiKey | null;
        if (!keyData) return json({ error: 'Invalid API key' }, 401);

        const body = await request.json() as any;
        const { expected, actual, context } = body;
        if (!expected || !actual) return json({ error: 'Missing expected or actual' }, 400);

        const reqId = generateId();
        const reqData: HumanRequest = {
          id: reqId, type: 'verify', prompt: context || 'Please verify',
          expected, actual, humanId: keyData.humanTelegramId, status: 'pending', createdAt: Date.now(),
        };

        await env.REQUESTS.put(`request:${reqId}`, JSON.stringify(reqData), { expirationTtl: 86400 });

        const message = `🔍 *Verification Request*\n\n${context || 'Please verify:'}\n\n*Expected:*\n\`\`\`\n${expected}\n\`\`\`\n\n*Actual:*\n\`\`\`\n${actual}\n\`\`\`\n\n_Reply ✅ to confirm, ❌ to reject, or explain._\n\n\`ID: ${reqId}\``;
        const sent = await sendTelegram(env.TELEGRAM_BOT_TOKEN, keyData.humanTelegramId, message);
        if (!sent) return json({ error: 'Failed to reach human' }, 500);

        return json({ requestId: reqId, status: 'pending', pollUrl: `https://humanskill.sh/v1/status/${reqId}` });
      } catch (e: any) {
        return json({ error: e.message }, 500);
      }
    }

    // GET /v1/status/:id
    if (path.startsWith('/v1/status/') && request.method === 'GET') {
      const reqId = path.split('/').pop();
      if (!reqId) return json({ error: 'Missing request ID' }, 400);

      const reqData = await env.REQUESTS.get(`request:${reqId}`, 'json') as HumanRequest | null;
      if (!reqData) return json({ error: 'Request not found' }, 404);

      return json({
        requestId: reqData.id, status: reqData.status, response: reqData.response,
        createdAt: reqData.createdAt, respondedAt: reqData.respondedAt,
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

        // /register for groups
        if (text.startsWith('/register')) {
          if (message.chat.type === 'private') {
            await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `⚠️ Use /register in a *group chat*.\n\nFor personal use, send /start`);
            return new Response('OK');
          }
          const parts = text.split(' ');
          if (parts.length < 2 || !parts[1].startsWith('hsk_')) {
            await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `📋 *Register this group*\n\nUsage: \`/register YOUR_API_KEY\`\n\nExample: \`/register hsk_abc123...\``);
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
          await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `✅ *Group registered!* Questions will appear here.`);
          return new Response('OK');
        }

        // /start
        if (text === '/start') {
          const apiKey = 'hsk_' + generateId() + generateId();
          const keyData: ApiKey = { userId: generateId(), humanTelegramId: chatId, createdAt: Date.now() };
          await env.REQUESTS.put(`apikey:${apiKey}`, JSON.stringify(keyData));
          await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `👋 *Welcome to Human Skill!*\n\nYour API Key:\n\`${apiKey}\`\n\nShare this with your AI agent. Questions will arrive here.\n\n*Docs:* humanskill.sh`);
          return new Response('OK');
        }

        // Non-reply message
        if (!message.reply_to_message?.text) {
          await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, `🤖 This bot receives questions from AI agents.\n\nReply to a question message to respond.\n\nNeed an API key? Send /start`);
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

    // POST /v1/register (API)
    if (path === '/v1/register' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const { telegramId } = body;
        if (!telegramId) return json({ error: 'Missing telegramId' }, 400);

        const apiKey = 'hsk_' + generateId() + generateId();
        const keyData: ApiKey = { userId: generateId(), humanTelegramId: telegramId, createdAt: Date.now() };
        await env.REQUESTS.put(`apikey:${apiKey}`, JSON.stringify(keyData));

        await sendTelegram(env.TELEGRAM_BOT_TOKEN, telegramId, `🎉 *Welcome to Human Skill!*\n\nYour API key:\n\`${apiKey}\`\n\nDocs: humanskill.sh`);
        return json({ apiKey, message: 'API key sent to Telegram' });
      } catch (e: any) {
        return json({ error: e.message }, 500);
      }
    }

    return json({ error: 'Not found' }, 404);
  },
};
