'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/auth-helpers-nextjs';
import LoginHead from './head';

export default function LoginorSignup() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('getSession error:', error);
      } else {
        setSession(session);
        if (session?.user) {
          router.push('/');
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        router.replace('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const redirectUrl = typeof window !== 'undefined'
    ? `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/`
    : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <LoginHead />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-N644GXSK"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div className="min-h-screen flex items-center justify-center bg-[#0B1120] px-4">
        <div className="w-full max-w-md bg-[#1B2430] p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to PiWallet
          </h2>
          
          {/* Google Sign-in (Supabase built-in) */}
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            redirectTo={redirectUrl}
            onlyThirdPartyProviders
          />

          {/* Manual Email/Password Login */}
          <form onSubmit={handleManualLogin} className="mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full p-2 mb-4 rounded bg-[#0B1120] text-white placeholder-gray-400"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your email password"
              className="w-full p-2 mb-4 rounded bg-[#0B1120] text-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Sign in
            </button>
          </form>

          <div className="text-sm text-center mt-4">
            <a href="/reset-password" className="text-gray-400 underline block">
              Forgot your password?
            </a>
            <a href="/signup" className="text-gray-400 underline block mt-2">
              Don’t have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
