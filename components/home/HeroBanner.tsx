'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ArrowRight, Flame, ShieldCheck, Zap, Truck, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24">
      {/* Decorative architectural grid background & radial lighting */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill-free quiet kicker tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India’s Modern Multi-Category Marketplace</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-normal">Authentic Verified Quality</span>
            </div>

            {/* Slogan with balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-serif max-w-2xl mx-auto lg:mx-0">
              Everything You Want.{' '}
              <span className="text-amber-400 font-sans tracking-tight">One GO.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover curated electronics, timeless fashion, home essentials, and wellness. Delivered directly to your doorstep across India with express reliability.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveView('shop');
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-400/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('deals');
                  setActiveView('shop');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Explore Flash Deals</span>
              </button>
            </div>

            {/* 3 Quick Value Bullets */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Free Shipping over ₹499</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>7-Day Return Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Hero Product Spotlight Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-mono tracking-wider font-semibold">
                  FEATURED SPOTLIGHT
                </span>
                <span className="text-slate-400 text-[11px]">Limited Festive Drop</span>
              </div>

              {/* Product Visual Container */}
              <div className="p-6 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-400/30 flex items-center justify-center shadow-inner">
                  <Sparkles className="w-12 h-12 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    AeroPulse Pro ANC Studio Buds
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    42dB Hybrid Noise Cancelling · 36h Battery
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xl font-extrabold text-white tabular-nums">₹2,499</span>
                  <span className="text-xs text-slate-500 line-through tabular-nums">₹4,999</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                    50% OFF
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('electronics');
                  setActiveView('shop');
                }}
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>View Electronics Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
