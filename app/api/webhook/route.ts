import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false, // Stripe expects the raw body
  },
};

// ✅ Fix: TypeScript-compatible override for unsupported API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil' as any,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const buf = await req.arrayBuffer();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // ✅ Safe access to metadata
    const metadata = session.metadata || {};

    const { stockId, price, type, user_id } = metadata as {
      stockId?: string;
      price?: string;
      type?: 'buy' | 'sell';
      user_id?: string;
    };

    if (stockId && price && type && user_id) {
      const { error } = await supabase.from('transactions').insert([
        {
          stock_id: stockId,
          price: parseFloat(price),
          type,
          user_id,
        },
      ]);

      if (error) {
        console.error('❌ Supabase insert error:', error.message);
        return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
      }

      console.log('✅ Transaction saved in Supabase');
    } else {
      console.warn('⚠️ Missing metadata for transaction');
    }
  }

  return NextResponse.json({ received: true });
}
