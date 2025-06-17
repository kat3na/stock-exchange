import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers'; // Only if using Next.js App Router with Edge or Server functions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // ✅ Corrected function usage:
  const supabase = createPagesServerClient({ req, res });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { stockId, price } = req.body;

  const { error } = await supabase.from('transactions').insert([
    {
      stock_id: stockId,
      price,
      type: 'buy',
      user_id: user.id,
    },
  ]);

  if (error) {
    return res.status(500).json({ message: 'Failed to insert transaction', error });
  }

  return res.status(200).json({ message: 'Transaction recorded' });
}
