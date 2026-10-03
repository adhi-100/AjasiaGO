'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Flame, Clock, ArrowRight } from 'lucide-react';

export const FlashDeals: React.FC = () => {
  const { products, setSelectedCategory, setActiveView } = useShop();

  // Dynamic countdown timer (e.g. 08h : 42m : 19s)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.isFlashDeal || p.discountPercentage >= 48).slice(0, 4);

  return (
    <section className="py-12 bg-amber-50/40 border-y border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Countdown Clock */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold">
              <Flame className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Flash Deals
                </h2>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Limited Time
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Steep price drops up to 57% off on top-rated essentials
              </p>
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mr-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Ends in:</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-slate-900">
              <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-lg shadow-xs min-w-[36px] text-center">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-slate-400">:</span>
              <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-lg shadow-xs min-w-[36px] text-center">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-slate-400">:</span>
              <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-lg shadow-xs min-w-[36px] text-center">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('deals');
                setActiveView('shop');
              }}
              className="ml-3 hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-700 transition-colors"
            >
              <span>Shop All Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
