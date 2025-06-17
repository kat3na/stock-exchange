import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-08-16.basil' as any,
});

export async function POST(req: NextRequest) {
  const { stockId, stockSymbol, sellAmount, userId } = await req.json();

  if (!stockId || !sellAmount || !userId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Sell ${stockSymbol}`,
        },
        unit_amount: Math.round(sellAmount * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    metadata: {
      stockId,
      stockSymbol,
      amount: sellAmount.toString(),
      type: 'sell',
      userId,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
