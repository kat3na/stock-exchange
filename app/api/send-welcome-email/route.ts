import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  const { email, id } = await req.json();

  const msg = {
    to: email,
    from: 'piexchangewallet@outlook.com',
    subject: 'Welcome to PieXchange!',
    text: `Hi there, your account has been created successfully!`,
    html: `<strong>Welcome aboard!</strong><br>Your user ID: ${id}`,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
