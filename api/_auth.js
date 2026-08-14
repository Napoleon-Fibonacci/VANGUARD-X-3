import jwt from 'jsonwebtoken';

export function requireAuth(req, res) {
  const cookie = req.headers.cookie || '';
  const token = cookie.split('; ').find(c => c.startsWith('admin_token='))?.split('=')[1];
  if (!token) {
    res.status(401).json({ error: 'Belum login' });
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(401).json({ error: 'Token invalid/expired' });
    return null;
  }
}
