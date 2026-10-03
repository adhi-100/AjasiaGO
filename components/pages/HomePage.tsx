'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FlashDeals } from '@/components/home/FlashDeals';
import { WhyAjasiaGO } from '@/components/home/WhyAjasiaGO';
import { PromoBanner } from '@/components/home/PromoBanner';
import { CustomerReviewsCarousel } from '@/components/home/CustomerReviewsCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setActiveView, setSelectedCategory } = useShop();

  const trendingProducts = products.filter((p) => p.trending || p.featured).slice(0, 8);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);

  return (
    <div className="space-y-2">
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Top Categories Grid */}
      <CategoryGrid />

      {/* 3. Flash Deals with Countdown */}
      <FlashDeals />

      {/* 4. Trending Products */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Most Wanted This Week</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Trending Across India
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Top rated essentials with hundreds of verified reviews
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                setActiveView('shop');
              }}
              className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
              <span>Explore All Trending</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Promotional Mid Banner */}
      <PromoBanner />

      {/* 6. Featured Bestsellers */}
      <section className="py-12 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Curated Excellence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                All-Time Bestsellers
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                setActiveView('shop');
              }}
              className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Shop With AjasiaGO */}
      <WhyAjasiaGO />

      {/* 8. Customer Reviews & Testimonials */}
      <CustomerReviewsCarousel />
    </div>
  );
};
