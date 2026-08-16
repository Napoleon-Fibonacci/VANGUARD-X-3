import { requireAuth } from './_auth.js';
import { supabase } from './_supabase.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!requireAuth(req, res)) return;

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const buffer = Buffer.concat(chunks);

  const ext = (req.headers['x-file-name'] || 'jpg').split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from('photos').upload(path, buffer, {
    contentType: req.headers['content-type'] || 'application/octet-stream'
  });
  if (error) return res.status(500).json({ error: error.message });

  const { data } = supabase.storage.from('photos').getPublicUrl(path);
  res.status(200).json({ url: data.publicUrl });
}