import { searchServer } from '@/lib/search';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

// Stateless MCP server (JSON-RPC over HTTP, JSON responses).
// The Kashfy dashboard help assistant calls `search_kashfy_docs` here
// (kashfy-app/src/app/api/dashboard/help/route.ts), so keep the tool name.

const PROTOCOL_VERSION = '2025-06-18';
const MAX_PAGES = 4;
const MAX_PAGE_CHARS = 6000;

type RpcRequest = {
  jsonrpc: '2.0';
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
};

type ToolResult = { content: { type: 'text'; text: string }[]; isError?: boolean };

const TOOLS = [
  {
    name: 'search_kashfy_docs',
    description:
      'Search the Kashfy documentation (clinic management: appointments, AI agent, WhatsApp, patients, dental, lab, radiology, finance, billing, settings). Returns the most relevant pages as Markdown.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'What to search for' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_kashfy_doc_page',
    description: 'Get one Kashfy documentation page as Markdown by its path, e.g. "/lab/intake".',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Page path, e.g. "/appointments/reminders"' },
      },
      required: ['path'],
    },
  },
];

function findPage(url: string) {
  const path = url.split('#')[0].replace(/\/+$/, '') || '/';
  return source.getPages('en').find((p) => p.url === path);
}

async function renderPage(page: NonNullable<ReturnType<typeof findPage>>) {
  const text = await page.data.getText('processed');
  const body = text.length > MAX_PAGE_CHARS ? `${text.slice(0, MAX_PAGE_CHARS)}\n\n...` : text;
  return `# ${page.data.title}\nURL: ${siteUrl}${page.url}\n\n${body}`;
}

async function searchDocs(query: string): Promise<ToolResult> {
  const results = await searchServer.search(query, { locale: 'en' });
  const urls: string[] = [];
  for (const r of results) {
    const url = r.url.split('#')[0];
    if (!urls.includes(url)) urls.push(url);
    if (urls.length >= MAX_PAGES) break;
  }

  const content: ToolResult['content'] = [];
  for (const url of urls) {
    const page = findPage(url);
    if (page) content.push({ type: 'text', text: await renderPage(page) });
  }
  if (content.length === 0) content.push({ type: 'text', text: 'No matching documentation found.' });
  return { content };
}

async function getDocPage(path: string): Promise<ToolResult> {
  const page = findPage(path.startsWith('/') ? path : `/${path}`);
  if (!page) return { content: [{ type: 'text', text: `No page at ${path}` }], isError: true };
  return { content: [{ type: 'text', text: await renderPage(page) }] };
}

async function callTool(name: unknown, args: Record<string, unknown>): Promise<ToolResult> {
  if (name === 'search_kashfy_docs') {
    const query = typeof args.query === 'string' ? args.query.trim().slice(0, 500) : '';
    if (!query) return { content: [{ type: 'text', text: 'query is required' }], isError: true };
    return searchDocs(query);
  }
  if (name === 'get_kashfy_doc_page') {
    const path = typeof args.path === 'string' ? args.path.trim() : '';
    if (!path) return { content: [{ type: 'text', text: 'path is required' }], isError: true };
    return getDocPage(path);
  }
  throw Object.assign(new Error(`Unknown tool: ${String(name)}`), { code: -32602 });
}

async function handle(req: RpcRequest) {
  const params = req.params ?? {};
  switch (req.method) {
    case 'initialize':
      return {
        protocolVersion:
          typeof params.protocolVersion === 'string' ? params.protocolVersion : PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: 'kashfy-docs', version: '1.0.0' },
      };
    case 'ping':
      return {};
    case 'tools/list':
      return { tools: TOOLS };
    case 'tools/call':
      return callTool(params.name, (params.arguments as Record<string, unknown>) ?? {});
    default:
      throw Object.assign(new Error(`Method not found: ${req.method}`), { code: -32601 });
  }
}

async function respond(req: RpcRequest) {
  // Notifications (no id) get no response.
  if (req.id === undefined) return null;
  try {
    return { jsonrpc: '2.0', id: req.id, result: await handle(req) };
  } catch (err) {
    const e = err as Error & { code?: number };
    return { jsonrpc: '2.0', id: req.id, error: { code: e.code ?? -32603, message: e.message } };
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } },
      { status: 400 },
    );
  }

  if (Array.isArray(body)) {
    const out = (await Promise.all(body.map((r) => respond(r as RpcRequest)))).filter(Boolean);
    return out.length ? Response.json(out) : new Response(null, { status: 202 });
  }

  const out = await respond(body as RpcRequest);
  return out ? Response.json(out) : new Response(null, { status: 202 });
}

export function GET() {
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}

export function DELETE() {
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
