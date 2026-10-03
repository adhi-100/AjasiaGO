'use client';

import React from 'react';
import { RatingStars } from '@/components/common/RatingStars';
import { CheckCircle2, Quote, ShieldCheck } from 'lucide-react';

export const CustomerReviewsCarousel: React.FC = () => {
  const testimonials = [
    {
      id: 't-1',
      name: 'Rohan Sharma',
      city: 'Bengaluru, Karnataka',
      product: 'AeroPulse Pro ANC Earbuds',
      rating: 5,
      date: 'Purchased 2 weeks ago',
      quote:
        'The ANC is genuinely on par with headphones thrice its price. Delivery to Indiranagar was handled in under 48 hours with spotless packaging.',
    },
    {
      id: 't-2',
      name: 'Meera Kapoor',
      city: 'Mumbai, Maharashtra',
      product: 'Elysian Vegan Leather Tote',
      rating: 5,
      date: 'Purchased 3 weeks ago',
      quote:
        'Holds my 14-inch MacBook and daily planner without buckling. The pebble vegan leather looks rich and does not pick up scratches.',
    },
    {
      id: 't-3',
      name: 'Tanvi Nair',
      city: 'Hyderabad, Telangana',
      product: 'Aura Ceramic Ambient LED Lamp',
      rating: 5,
      date: 'Purchased 1 month ago',
      quote:
        'The 3-stage touch dimmer gives the coziest warm glow for night reading. Truly elevated my home study desk aesthetics.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Real Shopper Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Loved By Shoppers Across India
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Over 25,000+ authentic 5-star reviews on electronics, fashion, and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <RatingStars rating={item.rating} size="sm" />
                  <Quote className="w-5 h-5 text-slate-200" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-slate-400">{item.city}</p>
                </div>

                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400">
            * Verified customer reviews collected post-delivery through AjasiaGO Order Verification.
          </p>
        </div>
      </div>
    </section>
  );
};
