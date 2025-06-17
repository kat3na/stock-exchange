// /api/stocks/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from('stocks').select('id, symbol');
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}
