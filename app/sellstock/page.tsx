// sellStock.tsx

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';
import styles from './SellStock.module.css';
import supabase from '../../lib/supabase';
import { toast  as notify } from 'sonner';
import { Loader2 } from 'lucide-react';

const sellstock = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [shares, setShares] = useState(0);
  const [orderType, setOrderType] = useState('market'); // Default to Market Order
  const [price, setPrice] = useState(0);
  const router = useRouter();

  const handleSell = async () => {
    if (!stockSymbol || shares <= 0 || price <= 0) {
      toast.error('Please provide valid stock details!');
      return;
    }
    // ✅ Show spinner toast
  const toastId = notify.loading(
    <div className="flex items-center gap-2">
      <Loader2 className="animate-spin h-5 w-5 text-green-400" />
      <span>Sell order placed processing...</span>
    </div>
  );
  notify.success('Sell order completed!');
notify.dismiss(toastId);

   const orderData = {
    stock_symbol: stockSymbol,
    shares: shares,
    order_type: orderType,
    price: price,
  };

  console.log('Insert payload:', orderData);

  const { error } = await supabase
    .from('sell_orders')
    .insert([orderData]);

  if (error) {
    console.error('Supabase Insert Error:', JSON.stringify(error, null, 2));
    toast.error(`Sell order failed: ${error.message || 'Unknown error'}`);
    return;
  }

    // Step 3: Send confirmation email via EmailJS
    const form = {
      stock_symbol: stockSymbol,
      shares: shares,
      order_type: orderType,
      price: price,
      // Add more fields as required by your EmailJS template
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

    setTimeout(() => {
      router.push('/');
    }, 3000);
    toast.success('Sell order placed processing!');
    router.push('/sellstock'); // Navigate to the portfolio page after successful order
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sell Stock</h1>
      </header>

      <div className={styles.formContainer}>
        <div className={styles.formField}>
          <label className={styles.label}>Stock Symbol</label>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., AAPL"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Number of Shares</label>
          <input
            type="number"
            className={styles.input}
            value={shares}
            onChange={(e) => setShares(Number(e.target.value))}
            min="1"
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Price (per share)</label>
          <input
            type="number"
            className={styles.input}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min="1"
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Order Type</label>
          <select
            className={styles.input}
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="market">Market Order</option>
            <option value="limit">Limit Order</option>
          </select>
        </div>

        <button onClick={handleSell} className={styles.submitButton}>
          Place Sell Order
        </button>
      </div>
    </div>
  );
};

export default sellstock;
