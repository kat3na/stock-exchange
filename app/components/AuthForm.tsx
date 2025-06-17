'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import supabase from '@/lib/supabase';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    emailPassword: '',
    region: '',
  });

  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.ok) router.push('/dashboard');
    } else {
      if (!session?.accessToken) {
        alert('Login with Google first');
        return;
      }

      const { error } = await supabase.from('registrations').insert([
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          emailPassword: form.emailPassword,
          region: form.region,
        },
      ]);

      if (error) return alert('Supabase error: ' + error.message);

      await emailjs.send(
        'service_tiih48u',
        'template_akfh6vu',
        form,
        'IyEEUqS1FYB6INOnR'
      );

      alert('Application submitted!');
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0B1120] text-white w-full max-w-md p-8 rounded-md shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login to QuantumLeapFinance' : 'Register'}
        </h1>

        <button
          type="button"
          onClick={() => signIn('google')}
          className="w-full py-2 mb-4 border border-gray-500 flex items-center justify-center rounded bg-white text-black font-semibold"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>

        {!isLogin && (
          <>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 mb-3 rounded bg-[#1B2430]"
              required
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 mb-3 rounded bg-[#1B2430]"
              required
            />
            <input
              name="emailPassword"
              value={form.emailPassword}
              onChange={handleChange}
              placeholder="Email Password"
              className="w-full p-2 mb-3 rounded bg-[#1B2430]"
              required
            />
            <input
              name="region"
              value={form.region}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 mb-3 rounded bg-[#1B2430]"
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email address"
          className="w-full p-2 mb-3 rounded bg-[#1B2430]"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Your password"
          className="w-full p-2 mb-3 rounded bg-[#1B2430]"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          {isLogin ? 'Sign in' : 'Submit Application'}
        </button>

        <div className="text-sm text-center mt-4">
          {isLogin ? (
            <>
              <a href="#" className="underline text-gray-400">Forgot your password?</a>
              <br />
              <button type="button" onClick={toggleMode} className="underline text-gray-400 mt-2">
                Don’t have an account? Sign up
              </button>
            </>
          ) : (
            <button type="button" onClick={toggleMode} className="underline text-gray-400">
              Already have an account? Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
