'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      addToast(
        'Subscribed to AjasiaGO Insider!',
        'You will receive exclusive festive flash deal alerts & coupon codes.',
        'success'
      );
      setNewsletterEmail('');
    } else {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* 4 Trust Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Express Pan-India</h4>
              <p className="text-xs text-slate-400 mt-0.5">Free doorstep delivery on ₹499+</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Genuine Items</h4>
              <p className="text-xs text-slate-400 mt-0.5">Directly sourced brand verified</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instant refunds to source</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Secure Payments</h4>
              <p className="text-xs text-slate-400 mt-0.5">UPI, Cards, EMI & COD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline tracking-tight">
              <span className="text-2xl font-black text-white font-serif">Ajasia</span>
              <span className="text-2xl font-black text-amber-400 font-sans tracking-tighter">
                GO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-0.5 mb-1" />
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Everything You Want. One GO. India’s modern multi-category shopping platform designed for reliability, fast delivery, and authentic customer satisfaction.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white mb-2">
                Get the latest deals from AjasiaGO
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Department categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('electronics');
                    setActiveView('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Electronics & Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('fashion');
                    setActiveView('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Fashion & Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('home-living');
                    setActiveView('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home & Living
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('beauty');
                    setActiveView('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Beauty & Skincare
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('accessories');
                    setActiveView('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Accessories & Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('deals');
                    setActiveView('shop');
                  }}
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  Flash Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveView('account')}
                  className="hover:text-white transition-colors"
                >
                  My Account & Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('shipping')}
                  className="hover:text-white transition-colors"
                >
                  Track Your Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('returns')}
                  className="hover:text-white transition-colors"
                >
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActiveView('about')}
                  className="hover:text-white transition-colors"
                >
                  About AjasiaGO
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('shipping')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('admin')}
                  className="text-amber-400/80 hover:text-amber-300 transition-colors"
                >
                  Merchant & Admin Hub
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Badges & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-left">
          © 2026 AjasiaGO. All rights reserved. Designed for India.
        </p>

        {/* Payment Methods Badges */}
        <div className="flex items-center gap-2 flex-wrap justify-center text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            UPI (GPay / PhonePe / Paytm)
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            RuPay
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Visa / Mastercard
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Net Banking
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
            COD Available
          </span>
        </div>
      </div>
    </footer>
  );
};
