import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const { env } = getRequestContext();
  const bucket = (env as any).R2_BUCKET;
  const object = await bucket.get(params.key);
  
  if (!object) {
    return new Response('Not Found', { status: 404 });
  }
  
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  
  return new Response(object.body, { headers });
}
