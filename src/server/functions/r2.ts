import { getRequestContext } from '@cloudflare/next-on-pages';

export async function uploadToR2(file: File): Promise<string> {
  const { env } = getRequestContext();
  const bucket = (env as any).R2_BUCKET;
  if (!bucket) throw new Error('R2_BUCKET binding is missing in Cloudflare');

  const arrayBuffer = await file.arrayBuffer();
  const fileKey = `${crypto.randomUUID()}-${file.name.replace(/\s+/g, '_')}`;
  
  // Нативная Edge-загрузка в бакет
  await bucket.put(fileKey, arrayBuffer, {
    httpMetadata: { contentType: file.type }
  });

  // Возвращаем локальный роут
  return `/api/media/${fileKey}`;
}