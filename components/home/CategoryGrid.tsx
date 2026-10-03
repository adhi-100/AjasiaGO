'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import {
  Headphones,
  Shirt,
  Home,
  Sparkles,
  Watch,
  Cpu,
  Activity,
  Flame,
  ArrowRight,
} from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { categories, setSelectedCategory, setActiveView } = useShop();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-blue-600" />;
      case 'Shirt':
        return <Shirt className="w-6 h-6 text-amber-600" />;
      case 'Home':
        return <Home className="w-6 h-6 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'Watch':
        return <Watch className="w-6 h-6 text-stone-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-cyan-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-orange-600" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-rose-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-slate-600" />;
    }
  };

  const handleSelect = (slug: string) => {
    setSelectedCategory(slug);
    setActiveView('shop');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Department Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Shop By Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore handpicked collections across multiple departments
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
            <span>Browse All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.slug)}
              className="group cursor-pointer p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 bg-white flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.accentBg} flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  {getCategoryIcon(cat.iconName)}
                </div>

                <span className="text-xs text-slate-500 font-medium tabular-nums">
                  {cat.itemCount} items
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-900 transition-colors">
                <span className="font-semibold">Explore</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
