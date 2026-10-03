'use client';

import React, { useState, useMemo } from 'react';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import {
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Search,
  Sparkles,
  Check,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setActiveView,
  } = useShop();

  // Filter States
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(7000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [minDiscount, setMinDiscount] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, [products]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchBrand && !matchCategory && !matchTags) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory) {
        if (selectedCategory === 'deals') {
          if (!product.isFlashDeal && product.discountPercentage < 48) return false;
        } else {
          const cat = categories.find((c) => c.slug === selectedCategory);
          if (cat && product.category.toLowerCase() !== cat.name.toLowerCase()) {
            return false;
          }
        }
      }

      // 3. Price
      if (product.price > priceRange) return false;

      // 4. Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // 5. Rating
      if (minRating !== null && product.rating < minRating) return false;

      // 6. Discount
      if (minDiscount !== null && product.discountPercentage < minDiscount) return false;

      // 7. Stock
      if (inStockOnly && !product.inStock) return false;

      return true;
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    categories,
    priceRange,
    selectedBrands,
    minRating,
    minDiscount,
    inStockOnly,
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'discount':
        return list.sort((a, b) => b.discountPercentage - a.discountPercentage);
      case 'newest':
        return list.reverse();
      case 'popularity':
      default:
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [filteredProducts, sortBy]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setPriceRange(7000);
    setSelectedBrands([]);
    setMinRating(null);
    setMinDiscount(null);
    setInStockOnly(false);
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedBrands.length > 0 ||
    minRating !== null ||
    minDiscount !== null ||
    inStockOnly ||
    priceRange < 7000 ||
    searchQuery !== '';

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header & Search Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {searchQuery ? (
                <span>Showing results for &ldquo;{searchQuery}&rdquo;</span>
              ) : selectedCategory ? (
                <span className="capitalize">
                  {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}{' '}
                  Collection
                </span>
              ) : (
                'All Catalog Products'
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing <span className="font-semibold text-slate-900 tabular-nums">{sortedProducts.length}</span> items
            </p>
          </div>

          {/* Controls Bar: Mobile filter button & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-xs"
              >
                <option value="popularity">Popularity / Bestselling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="discount">Biggest Discount %</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
            <span className="text-slate-400 text-[11px]">Applied Filters:</span>

            {selectedCategory && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200/80">
                <span>Cat: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory(null)}>
                  <X className="w-3 h-3 hover:text-amber-950" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full">
                <span>Search: {searchQuery}</span>
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            {selectedBrands.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full border border-slate-200"
              >
                <span>{b}</span>
                <button onClick={() => handleBrandToggle(b)}>
                  <X className="w-3 h-3 hover:text-rose-600" />
                </button>
              </span>
            ))}

            {minRating && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                <span>{minRating}★ & above</span>
                <button onClick={() => setMinRating(null)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-600 hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6 shadow-xs sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <Filter className="w-4 h-4 text-amber-600" />
                  <span>Filter Products</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Department Categories */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Departments
                </span>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === null
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>All Departments</span>
                    <span className="text-[10px] tabular-nums opacity-70">
                      {products.length}
                    </span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] tabular-nums opacity-70">
                        {cat.itemCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>Max Price:</span>
                  <span className="font-mono text-amber-700">₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={7000}
                  step={100}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>₹500</span>
                  <span>₹7,000+</span>
                </div>
              </div>

              {/* Brand Checkboxes */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Brand
                </span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {allBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded text-slate-900 focus:ring-0"
                      />
                      <span className="truncate">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Rating Filter */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Customer Rating
                </span>
                <div className="space-y-1 text-xs">
                  {[4, 3].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setMinRating(minRating === star ? null : star)}
                      className={`w-full text-left px-2 py-1 rounded-lg transition-colors flex items-center justify-between ${
                        minRating === star
                          ? 'bg-amber-100 text-amber-900 font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{star} Stars & above</span>
                      <span className="text-amber-500">{'★'.repeat(star)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Discount
                </span>
                <div className="space-y-1 text-xs">
                  {[50, 40].map((disc) => (
                    <button
                      key={disc}
                      type="button"
                      onClick={() => setMinDiscount(minDiscount === disc ? null : disc)}
                      className={`w-full text-left px-2 py-1 rounded-lg transition-colors flex items-center justify-between ${
                        minDiscount === disc
                          ? 'bg-emerald-100 text-emerald-900 font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{disc}% or more</span>
                      <span className="text-emerald-700 font-mono font-bold">⚡</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-3 border-t border-slate-100">
                <label className="flex items-center justify-between text-xs font-semibold text-slate-800 cursor-pointer">
                  <span>Exclude Out of Stock</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-slate-900"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    No matching products found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your filters, clearing search terms, or exploring our popular categories.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end">
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-5 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900">Filters</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Departments
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs ${
                    selectedCategory === null ? 'bg-slate-900 text-white' : 'text-slate-600'
                  }`}
                >
                  All Departments
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs ${
                      selectedCategory === c.slug ? 'bg-slate-900 text-white' : 'text-slate-600'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex justify-between text-xs font-semibold">
                <span>Max Price</span>
                <span className="font-mono text-amber-700">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min={500}
                max={7000}
                step={100}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-slate-900"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl"
              >
                Apply Filters ({sortedProducts.length})
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2 text-rose-600 text-xs font-semibold"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
