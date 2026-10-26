// Minimal Vercel function for optional sharing via KV (Upstash/Cloudflare)
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { text, options, ttl = 86400 } = req.body || {}
  if (typeof text !== 'string' || !options) return res.status(400).json({ error: 'Bad payload' })

  const url = process.env.VITE_SHARE_KV_URL
  const token = process.env.VITE_SHARE_KV_TOKEN
  if (!url || !token) return res.status(501).json({ error: 'KV not configured' })

  const slug = Math.random().toString(36).slice(2, 8)
  const payload = JSON.stringify({ t: text, o: options })
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: `share:${slug}`, value: payload, ttl })
  })
  if (!r.ok) return res.status(502).json({ error: 'KV error' })
  return res.json({ slug })
}
