import { requireAuth } from './_auth.js';
import { supabase } from './_supabase.js';

export function crudHandler(table) {
  return async function handler(req, res) {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from(table).select('*').order('sort_order');
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (!requireAuth(req, res)) return; // writes require login

    if (req.method === 'POST') {
      const { data, error } = await supabase.from(table).insert(req.body).select();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data[0]);
    }

    if (req.method === 'PUT') {
      const { id, ...fields } = req.body;
      const { data, error } = await supabase.from(table).update(fields).eq('id', id).select();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(204).end();
    }

    res.status(405).end();
  };
}
