import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-08-16.basil' as any,
});

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const {
      stockSymbol,
      stockId,
      depositAmount,
      paymentMethod, // 'card', 'paypal', etc.
      userId,        // current user ID
    } = await req.json();

    if (!stockSymbol || !stockId || !depositAmount || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: [paymentMethod], // 'card', 'paypal', etc.
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Buy ${stockSymbol} Stock`,
          },
          unit_amount: Math.round(depositAmount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: {
        userId,
        stockId,
        stockSymbol,
        depositAmount: depositAmount.toString(),
        type: 'buy',
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    // Optionally log transaction intent before payment is completed
    await supabase.from('transaction_logs').insert([
      {
        user_id: userId,
        stock_id: stockId,
        stock_symbol: stockSymbol,
        amount: depositAmount,
        status: 'pending',
        method: paymentMethod,
        type: 'buy',
      }
    ]);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe session error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
