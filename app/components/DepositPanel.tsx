'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';
import { createClient as supabaseCreateClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, CheckCircle, DollarSign } from 'lucide-react';
export const createClient = () => {
  return supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zlueetvjllugrwexfxqr.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdWVldHZqbGx1Z3J3ZXhmeHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjc4NDgsImV4cCI6MjA1OTgwMzg0OH0.stVZlZUBXfCQ2qj3QxwqcAbhELtzdhm5IU5m69u-CCQ'
  );
};

type DepositRow = {
  amount: string;
};

const deposits = () => {
  const [amount, setAmount] = useState(100);
  const [cardNumber, setCardNumber] = useState('');
  const [wallet, setWallet] = useState('');
  const [walletLinked, setWalletLinked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  const supabase = createClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchBalance = async () => {
      const user = session?.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('deposits')
        .select('amount')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching deposits:', error);
        return;
      }

      const total = data?.reduce((acc: number, row: DepositRow) => acc + parseFloat(row.amount), 0) ?? 0;
      setBalance(total);
    };

    fetchBalance();
  }, [session]);

  const handleDeposit = async () => {
    const user = session?.user;
    if (!user) return toast.error('You must be logged in.');

    if (cardNumber.length < 12) {
      return toast.error('Enter a valid card number.');
    }

    if (isNaN(amount) || amount <= 0) {
      return toast.error('Enter a valid deposit amount.');
    }

    const { error } = await supabase.from('deposits').insert([
      {
        user_id: user.id,
        amount,
        wallet_address: wallet,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error('Deposit failed.');
      return;
    }

    toast.success('Deposit successful!');
    setSuccess(true);
    setBalance((prev) => (prev ?? 0) + amount);

    setTimeout(() => {
      setSuccess(false);
      router.push('/buy');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Deposit Funds</h2>
        {balance !== null && (
          <div className="flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm">
            <DollarSign size={16} /> Balance: ${balance.toFixed(2)}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Select Amount</span>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[50, 100, 250].map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={`py-2 rounded-lg font-semibold ${
                  amount === amt ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Card Number</span>
          <div className="relative mt-2">
            <input
              type="text"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:outline-none"
            />
            <CreditCard className="absolute top-2.5 right-3 text-gray-400" size={20} />
          </div>
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Wallet Address (optional)</span>
          <input
            type="text"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="0x..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:outline-none mt-2"
          />
        </label>

        <button
          onClick={() => {
            setWalletLinked(true);
            setTimeout(() => setWalletLinked(false), 2000);
          }}
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <Wallet size={18} /> Link Wallet
        </button>

        <button
          onClick={handleDeposit}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          Deposit ${amount}
        </button>
      </div>

      {walletLinked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 bg-green-100 text-green-800 p-3 rounded-lg text-center"
        >
          Wallet linked successfully!
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
        >
          <CheckCircle size={20} /> Deposit successful!
        </motion.div>
      )}
    </motion.div>
  );
};

export default deposits;
