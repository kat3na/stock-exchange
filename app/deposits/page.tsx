'use client';

import React, { useEffect, useState } from 'react';
import styles from './Deposits.module.css';
import { useSession } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

import { toast } from 'sonner';
import { Banknote, CreditCard, Bitcoin, ArrowDown } from 'lucide-react';

const deposit = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zlueetvjllugrwexfxqr.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdWVldHZqbGx1Z3J3ZXhmeHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjc4NDgsImV4cCI6MjA1OTgwMzg0OH0.stVZlZUBXfCQ2qj3QxwqcAbhELtzdhm5IU5m69u-CCQ'
  );
  const session = useSession();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

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
        setBalance(total);
      }
    };

    fetchDeposits();
  }, [session]);

  const methods = [
    { label: 'Bank Transfer', icon: Banknote },
    { label: 'Credit/Debit Card', icon: CreditCard },
    { label: 'Crypto Wallet', icon: Bitcoin },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Finances</h1>
        <p className={styles.subtitle}>Manage your deposits and withdrawals</p>
      </header>

      <section className={styles.balanceSection}>
        <div>
          <p className={styles.balanceLabel}>Current Balance</p>
          <h2 className={styles.balanceAmount}>${balance.toFixed(2)}</h2>
        </div>
        <button className={styles.withdrawButton}>Withdraw</button>
      </section>

      <section className={styles.methodsSection}>
        {methods.map((method, idx) => (
          <div key={idx} className={styles.methodCard}>
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

export default deposit;
