'use client';

import React, { useEffect, useState } from 'react';
import styles from './Wallet.module.css';
import { useSession } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Banknote, CreditCard, Bitcoin, ArrowDown } from 'lucide-react';
import supabase from '../../lib/supabase';

const wallet = () => {
  const router = useRouter();
  const session = useSession();


  const [fiatBalance, setFiatBalance] = useState(0);
  const [cryptoBalance] = useState(0.00); // Static for now
  const [stockBalance] = useState(0.00); // Static for now
  const [transactions, setTransactions] = useState<any[]>([]);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const currentBalance = cryptoBalance + stockBalance + fiatBalance;

  useEffect(() => {
    if (!session?.user) return;

    const fetchDeposits = async () => {
      const { data, error } = await supabase
        .from('deposits')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to fetch transactions.');
      } else {
        setTransactions(data);
        const total = data.reduce((sum: number, item: any) => sum + parseFloat(item.amount), 0);
        setFiatBalance(total);
      }
    };

    fetchDeposits();
  }, [session]);

  const handleDeposit = async () => {
    if (!session?.user) {
      toast.error('Please log in to deposit.');
      return;
    }

    const { error } = await supabase.from('deposits').insert([
      {
        user_id: session.user.id,
        amount: amount,
        currency: currency,
        type: 'deposit',
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      toast.error('Deposit failed. Please try again.');
      console.error(error);
    } else {
      toast.success(`Deposited ${amount} ${currency} successfully.`);
      setAmount('');
      router.refresh();
    }
  };

  const handleWithdraw = async () => {
    if (!session?.user) {
      toast.error('Please log in to withdraw.');
      return;
    }

    const { error } = await supabase.from('deposits').insert([
      {
        user_id: session.user.id,
        amount: `-${amount}`,
        currency: currency,
        type: 'withdrawal',
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      toast.error('Withdrawal failed. Please try again.');
      console.error(error);
    } else {
      toast.success(`Withdrew ${amount} ${currency} successfully.`);
      setAmount('');
      router.refresh();
    }
  };

  const handleMethodClick = (label: string) => {
    toast.success(`${label} method selected!`);
  };

  const methods = [
    { label: 'Bank Transfer', icon: Banknote },
    { label: 'Credit/Debit Card', icon: CreditCard },
    { label: 'Crypto Wallet', icon: Bitcoin },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Wallet</h1>
        <p className={styles.subtitle}>Manage your deposits and withdrawals</p>
      </header>

      <section className={styles.walletOverview}>
        <div className={styles.balanceRow}>
          <div className={styles.balanceBox}>
            <span>Crypto Balance</span>
            <strong className={styles.green}>${cryptoBalance.toFixed(2)}</strong>
          </div>
          <div className={styles.balanceBox}>
            <span>Stock Balance</span>
            <strong className={styles.green}>${stockBalance.toFixed(2)}</strong>
          </div>
        </div>

        <div className={styles.balanceRow}>
          <div className={styles.balanceBox}>
            <span>Fiat Balance</span>
            <strong className={styles.green}>${fiatBalance.toFixed(2)}</strong>
          </div>
          <div className={styles.balanceBox}>
            <span>Current Balance</span>
            <strong className={styles.green}>${currentBalance.toFixed(2)}</strong>
          </div>
        </div>
      </section>

      <section className={styles.form}>
        <h2 className={styles.sectionTitle}>Deposit / Withdraw</h2>
        <input
          type="number"
          className={styles.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select
          className={styles.select}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleDeposit}>
            Deposit
          </button>
          <button className={styles.button} onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </section>

      <section className={styles.methodsSection}>
        {methods.map((method, idx) => (
          <div
            key={idx}
            className={styles.methodCard}
            onClick={() => handleMethodClick(method.label)}
          >
            <method.icon className={styles.methodIcon} />
            <span>{method.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.transactionsSection}>
        <h3 className={styles.sectionTitle}>Transaction History</h3>
        {transactions.length === 0 ? (
          <p className={styles.noTransactions}>No deposit history yet.</p>
        ) : (
          <ul className={styles.transactionList}>
            {transactions.map((tx, idx) => (
              <li key={idx} className={styles.transactionItem}>
                <div>
                  <p className={styles.transactionAmount}>${tx.amount}</p>
                  <p className={styles.transactionDate}>
                    {new Date(tx.created_at).toLocaleString()}
                  </p>
                </div>
                <ArrowDown className={styles.transactionIcon} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default wallet;
