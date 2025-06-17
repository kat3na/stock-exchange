'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const insertTransaction = async ({ symbol, price, type }) => {
  const supabase = createClientComponentClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase.from('transactions').insert([
    {
      user_id: user.id,
      symbol,
      price,
      type,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
};
