'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-12 text-white shadow-xl">
          <div
            className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Festive Season Mega Upgrade</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif">
              Big Deals. Better Prices.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
              Save up to 55% across trending tech, everyday apparel, smart organizers, and skincare. Use code <span className="text-amber-400 font-mono font-bold">GO20</span> for an extra flat 20% discount.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('deals');
                  setActiveView('shop');
                }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
