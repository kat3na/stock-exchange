'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, BarChart, PieChart, Wallet, Users, Bell, Settings, LogOut, Book, AppWindow, TrendingUp, User, Banknote, AlignJustify } from 'lucide-react';
import {cn}  from '../../app/components/lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRef, useEffect } from 'react';


const menuItems = [
  { icon: Home, label: 'Home', link: '/' },
  { icon: BarChart, label: 'Markets', link: '/markets' },
  { icon: Wallet, label: 'Wallet', link: '/wallet' },
  { icon: PieChart, label: 'Portfolio', link: '/portfolio' },
  { icon: Users, label: 'Community', link: '/community' },
  { icon: Bell, label: 'Alerts', link: '/alerts' },
  { icon: Settings, label: 'Settings', link: '/settings' },
  { icon:  Book, label: 'Education', link: '/education' },
  { icon: AppWindow, label: 'Apps', link: '/apps' },
  { icon: TrendingUp, label: 'Trending', link: '/trending' },
  { icon: User, label: 'Profile', link: '/profile' },
  { icon: LogOut, label: 'Logout', link: '/logout' },
];

const mockStocks = [
  { symbol: 'AAPL', price: 195.81 },
  { symbol: 'TSLA', price: 339.34 },
  { symbol: 'AMZN', price: 200.99 },
  { symbol: 'GOOG', price: 168.47 },
  { symbol: 'MSFT', price: 454.86 },
  { symbol: 'NVDA', price: 131.29 },
  { symbol: 'META', price: 627.06 },
  { symbol: 'NFLX', price: 1185.39 },
  { symbol: 'AMD', price: 110.31 },
  { symbol: 'INTC', price: 20.05 },
];

export default function HomePage() {
  const [rightOpen, setRightOpen] = useState(false);
  const router = useRouter();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [stocks, setStocks] = useState(mockStocks);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function setActive(label: string) {
    setActiveLabel(label);
  }
  const isActive = (label: string) => activeLabel === label;

  // Open sidebar & start auto-close timer
  function toggleSidebar() {
    if (rightOpen) {
      clearTimeout(timeoutRef.current!);
      setRightOpen(false);
    } else {
      setRightOpen(true);
      timeoutRef.current = setTimeout(() => {
        setRightOpen(false);
      }, 5000);
    }
  }

  // Cancel auto-close on hover
  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  // Restart auto-close timer on mouse leave
  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setRightOpen(false);
    }, 5000);
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen bg-black text-white overflow-hidden">
      {/* Pi Coin Logo */}
      <div className="mb-6 absolute top-4 left-4 z-50">
        <img
          src="https://i.pinimg.com/736x/b6/8c/ac/b68cac33495d33b6a085f1258507ddca.jpg"
          alt="Pi Coin Logo"
          className="w-10 h-10"
        />
      </div>
      {/* Left Sidebar - only first 3 icons */}
      <div className="w-15 bg-[#0a0a0a] border-r border-gray-800 flex flex-col items-center py-4 space-y-4">
        {menuItems.slice(0, 3).map(({ icon: Icon, label, link }) => (
          <Link key={label} href={link} title={label}>
            <Button variant="ghost" size="icon" onClick={() => setActive(label)}>
              <div className={isActive(label) ? 'text-white-400' : 'text-white hover:text-green-400'}>
                <Icon />
              </div>
            </Button>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex space-x-6 whitespace-nowrap px-4 py-2"
          >
            {stocks.map((stock, i) => (
              <div key={i} className="text-sm font-semibold text-green-400">
                {stock.symbol}: ${stock.price.toFixed(2)}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-center h-full">
          <h2 className="absolute bottom-160 left-3 text-2xl font-bold text-white">Pi Wallet</h2>
          <p className="absolute bottom-150 left-3 text-1xl font-bold text-white">Username: pi_user_123</p>
  <p className="absolute bottom-140 left-3 text-2xl font-extrabold text-green-400">
  Balance: 0.00 π
</p>

        </div>
      </div>

      {/* Right Sidebar Toggle */}
      <div className="absolute top-4 right-4">
        <Button variant="ghost" className="text-white" onClick={toggleSidebar}>
          <AlignJustify />
        </Button>
      </div>

      {/* Right Sidebar */}
      {rightOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-40 h-full bg-[#0a0a0a] border-l border-gray-800 p-4 fixed right-0 top-0 z-50"
        >
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            {menuItems.map(({ icon: Icon, label, link }) => (
              <li key={label}>
                <Link
                  href={link}
                  className="flex items-center space-x-2 text-white transform transition-all duration-300 ease-in-out hover:scale-100 hover:bg-gray-700 rounded-lg p-2"
                  onClick={() => setActive(label)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

