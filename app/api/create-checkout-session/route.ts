// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// ✅ Fix: use `as any` to bypass the unsupported API version error
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-08-16.basil' as any,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, stockId, price, user_id } = body;

    if (!type || !stockId || !price || !user_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: type === 'buy' ? 'Buy Stock' : 'Sell Stock',
            },
            unit_amount: parseInt((parseFloat(price) * 100).toFixed(0)), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?cancelled=true`,
      metadata: {
        stockId,
        price,
        type,
        user_id,
      },
    });

    // Optionally insert a placeholder or log pre-transaction
    await supabase.from('transactions').insert([
      {
        stock_id: stockId,
        type,
        price: parseFloat(price),
        user_id,
      },
    ]);

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Create checkout session error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
