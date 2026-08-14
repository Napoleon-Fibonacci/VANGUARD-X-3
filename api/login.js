import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Password salah' });
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=28800; SameSite=Strict; Secure`);
  res.status(200).json({ ok: true });
}
