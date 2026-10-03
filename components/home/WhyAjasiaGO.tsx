'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CheckCircle, Award } from 'lucide-react';

export const WhyAjasiaGO: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
      title: 'Secure Payments',
      desc: 'Pay with UPI, Credit/Debit cards, Net Banking, or choose Cash on Delivery at your door.',
    },
    {
      icon: Truck,
      color: 'text-amber-600 bg-amber-50 border-amber-200/80',
      title: 'Fast Delivery',
      desc: 'Express dispatch with real-time tracking across 19,000+ PIN codes in India.',
    },
    {
      icon: RotateCcw,
      color: 'text-sky-600 bg-sky-50 border-sky-200/80',
      title: 'Easy Returns',
      desc: '7-day hassle-free doorstep returns with immediate online status tracking.',
    },
    {
      icon: Award,
      color: 'text-purple-600 bg-purple-50 border-purple-200/80',
      title: 'Trusted Products',
      desc: '100% genuine brand quality assurance with manufacturer warranties included.',
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            The AjasiaGO Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Shop With AjasiaGO?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Built from the ground up for seamless shopping, safety, and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs transition-all space-y-3"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
