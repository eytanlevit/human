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
    .container { max-width: 600px; text-align: center; }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #fff; }
    .tagline { font-size: 1.1rem; color: #888; margin-bottom: 2rem; }
    .install-box {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 1.5rem 2rem;
      margin-bottom: 2rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    .install-cmd { font-size: 1.3rem; color: #4ade80; }
    .install-cmd .prefix { color: #888; }
    .copy-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .copy-btn:hover { background: #333; }
    .copy-btn svg { width: 20px; height: 20px; fill: #888; }
    .copy-btn:hover svg { fill: #fff; }
    .copy-btn.copied svg { fill: #4ade80; }
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
    <h1>humanskill.sh</h1>
    <p class="tagline">Get a human to answer your questions</p>
    <div class="install-box">
      <code class="install-cmd"><span class="prefix">$</span> npx skills add eytanlevit/human</code>
      <button class="copy-btn" onclick="copyCmd()" title="Copy to clipboard">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
      </button>
    </div>
    <script>
      function copyCmd() {
        navigator.clipboard.writeText('npx skills add eytanlevit/human');
        const btn = document.querySelector('.copy-btn');
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1500);
      }
    </script>
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
      <a href="https://t.me/HumanSkillBot" class="cta">Get API Key</a>
      <a href="https://github.com/eytanlevit/human" class="cta secondary">GitHub</a>
    </div>
    <div class="footer">
      <p>Built by humans, for agents</p>
    </div>
  </div>
</body>
</html>`;

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

// Generate a short unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

// Send message to Telegram
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

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// JSON response helper
function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check (API)
    if (path === '/health') {
      return json({ 
        status: 'ok', 
        service: 'humanskill.sh',
        version: '0.1.0',
        endpoints: ['/v1/ask', '/v1/verify', '/v1/status/:id']
      });
    }

    // Landing page
    if (path === '/' || path === '/index.html') {
      return new Response(LANDING_PAGE, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // === API Routes ===
    
    // POST /v1/ask - Ask a human a question
    if (path === '/v1/ask' && request.method === 'POST') {
      try {
        const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (!apiKey) {
          return json({ error: 'Missing API key' }, 401);
        }

        // Look up API key
        const keyData = await env.REQUESTS.get(`apikey:${apiKey}`, 'json') as ApiKey | null;
        if (!keyData) {
          return json({ error: 'Invalid API key' }, 401);
        }

        const body = await request.json() as any;
        const { prompt, imageUrl, timeout = 300 } = body;

        if (!prompt) {
          return json({ error: 'Missing prompt' }, 400);
        }

        // Create request record
        const reqId = generateId();
        const reqData: HumanRequest = {
          id: reqId,
          type: 'ask',
          prompt,
          imageUrl,
          humanId: keyData.humanTelegramId,
          status: 'pending',
          createdAt: Date.now(),
        };

        // Store request
        await env.REQUESTS.put(`request:${reqId}`, JSON.stringify(reqData), {
          expirationTtl: 86400, // 24 hours
        });

        // Send to human via Telegram
        const message = `🤖 *Human Skill Request*\n\n${prompt}\n\n_Reply to this message to respond._\n\n\`ID: ${reqId}\``;
        
        const sent = await sendTelegram(env.TELEGRAM_BOT_TOKEN, keyData.humanTelegramId, message);
        
        if (!sent) {
          return json({ error: 'Failed to reach human' }, 500);
        }

        return json({
          requestId: reqId,
          status: 'pending',
          pollUrl: `https://humanskill.sh/v1/status/${reqId}`,
          message: 'Request sent to human. Poll status endpoint for response.',
        });

      } catch (e: any) {
        return json({ error: e.message }, 500);
      }
    }

    // POST /v1/verify - Ask human to verify expected vs actual
    if (path === '/v1/verify' && request.method === 'POST') {
      try {
        const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (!apiKey) {
          return json({ error: 'Missing API key' }, 401);
        }

        const keyData = await env.REQUESTS.get(`apikey:${apiKey}`, 'json') as ApiKey | null;
        if (!keyData) {
          return json({ error: 'Invalid API key' }, 401);
        }

        const body = await request.json() as any;
        const { expected, actual, context } = body;

        if (!expected || !actual) {
          return json({ error: 'Missing expected or actual' }, 400);
        }

        const reqId = generateId();
        const reqData: HumanRequest = {
          id: reqId,
          type: 'verify',
          prompt: context || 'Please verify',
          expected,
          actual,
          humanId: keyData.humanTelegramId,
          status: 'pending',
          createdAt: Date.now(),
        };

        await env.REQUESTS.put(`request:${reqId}`, JSON.stringify(reqData), {
          expirationTtl: 86400,
        });

        const message = `🔍 *Verification Request*\n\n${context || 'Please verify:'}\n\n*Expected:*\n\`\`\`\n${expected}\n\`\`\`\n\n*Actual:*\n\`\`\`\n${actual}\n\`\`\`\n\n_Reply ✅ to confirm, ❌ to reject, or explain the issue._\n\n\`ID: ${reqId}\``;

        const sent = await sendTelegram(env.TELEGRAM_BOT_TOKEN, keyData.humanTelegramId, message);

        if (!sent) {
          return json({ error: 'Failed to reach human' }, 500);
        }

        return json({
          requestId: reqId,
          status: 'pending',
          pollUrl: `https://humanskill.sh/v1/status/${reqId}`,
        });

      } catch (e: any) {
        return json({ error: e.message }, 500);
      }
    }

    // GET /v1/status/:id - Check request status
    if (path.startsWith('/v1/status/') && request.method === 'GET') {
      const reqId = path.split('/').pop();
      if (!reqId) {
        return json({ error: 'Missing request ID' }, 400);
      }

      const reqData = await env.REQUESTS.get(`request:${reqId}`, 'json') as HumanRequest | null;
      if (!reqData) {
        return json({ error: 'Request not found' }, 404);
      }

      return json({
        requestId: reqData.id,
        status: reqData.status,
        response: reqData.response,
        createdAt: reqData.createdAt,
        respondedAt: reqData.respondedAt,
      });
    }

    // POST /webhook/telegram - Receive Telegram updates
    if (path === '/webhook/telegram' && request.method === 'POST') {
      try {
        const update = await request.json() as any;
        const message = update.message;
        
        if (!message?.text || !message?.reply_to_message?.text) {
          return new Response('OK');
        }

        // Extract request ID from the original message
        const originalText = message.reply_to_message.text;
        const idMatch = originalText.match(/ID: ([a-z0-9]+)/);
        
        if (!idMatch) {
          return new Response('OK');
        }

        const reqId = idMatch[1];
        const reqData = await env.REQUESTS.get(`request:${reqId}`, 'json') as HumanRequest | null;

        if (!reqData || reqData.status === 'completed') {
          return new Response('OK');
        }

        // Update request with response
        reqData.status = 'completed';
        reqData.response = message.text;
        reqData.respondedAt = Date.now();

        await env.REQUESTS.put(`request:${reqId}`, JSON.stringify(reqData), {
          expirationTtl: 86400,
        });

        // Confirm to human
        await sendTelegram(
          env.TELEGRAM_BOT_TOKEN,
          message.chat.id.toString(),
          `✅ Response recorded for request \`${reqId}\``
        );

        return new Response('OK');

      } catch (e) {
        console.error('Webhook error:', e);
        return new Response('OK');
      }
    }

    // POST /v1/register - Register a new user (temporary, for MVP)
    if (path === '/v1/register' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const { telegramId } = body;

        if (!telegramId) {
          return json({ error: 'Missing telegramId' }, 400);
        }

        // Generate API key
        const apiKey = 'hsk_' + generateId() + generateId();
        
        const keyData: ApiKey = {
          userId: generateId(),
          humanTelegramId: telegramId,
          createdAt: Date.now(),
        };

        await env.REQUESTS.put(`apikey:${apiKey}`, JSON.stringify(keyData));

        // Notify the human
        await sendTelegram(
          env.TELEGRAM_BOT_TOKEN,
          telegramId,
          `🎉 *Welcome to Human Skill!*\n\nYour API key:\n\`${apiKey}\`\n\nAdd this to your agent's environment and start receiving requests from AI agents.\n\nDocs: https://humanskill.sh/docs`
        );

        return json({
          apiKey,
          message: 'API key sent to your Telegram',
        });

      } catch (e: any) {
        return json({ error: e.message }, 500);
      }
    }

    // 404 for unknown routes
    return json({ error: 'Not found' }, 404);
  },
};
