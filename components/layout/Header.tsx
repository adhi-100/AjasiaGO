'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Flame,
  LayoutDashboard,
  LogOut,
  ArrowRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    selectedCategory,
    setSelectedCategory,
    categories,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('shop');
      setMobileSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    setActiveView('shop');
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Slim Top Trust & Promotion Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-white font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Festive Mega Drops: Extra 20% off with code</span>
              <span className="font-mono text-amber-300 font-bold bg-amber-950/60 px-1 rounded border border-amber-800/40">
                GO20
              </span>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              Free Express Delivery on orders above ₹499
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button
              onClick={() => setActiveView('faq')}
              className="hover:text-white transition-colors"
            >
              Help & Support
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setActiveView('shipping')}
              className="hover:text-white transition-colors"
            >
              Track Order
            </button>
            <span className="text-slate-700">·</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Pan-India COD
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
            {/* Zone 1: Mobile Hamburger & Brand Wordmark */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 -ml-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveView('home');
                }}
                className="flex items-center gap-1 group text-left"
              >
                <div className="flex items-baseline tracking-tight">
                  <span className="text-2xl sm:text-2xl font-black text-slate-950 font-serif">
                    Ajasia
                  </span>
                  <span className="text-2xl sm:text-2xl font-black text-amber-500 font-sans tracking-tighter">
                    GO
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-0.5 mb-1 animate-pulse" />
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveView('home');
                }}
                className={`transition-colors py-1 hover:text-slate-950 ${
                  activeView === 'home' ? 'text-slate-950 font-semibold border-b-2 border-slate-950' : ''
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveView('shop');
                }}
                className={`transition-colors py-1 hover:text-slate-950 ${
                  activeView === 'shop' && !selectedCategory
                    ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                    : ''
                }`}
              >
                All Products
              </button>

              {/* Categories dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  onMouseEnter={() => setCategoriesDropdownOpen(true)}
                  className={`flex items-center gap-1 transition-colors py-1 hover:text-slate-950 ${
                    selectedCategory ? 'text-slate-950 font-semibold' : ''
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {categoriesDropdownOpen && (
                  <div
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn"
                  >
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Shop By Department
                    </div>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          selectedCategory === cat.slug
                            ? 'text-amber-600 font-semibold bg-amber-50/50'
                            : 'text-slate-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-slate-400 tabular-nums">
                          {cat.itemCount} items
                        </span>
                      </button>
                    ))}
                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(null);
                          setActiveView('shop');
                          setCategoriesDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-amber-600 font-medium flex items-center justify-between hover:bg-amber-50/50"
                      >
                        <span>View All Categories</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleCategoryClick('electronics')}
                className={`transition-colors py-1 hover:text-slate-950 ${
                  selectedCategory === 'electronics'
                    ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                    : ''
                }`}
              >
                Electronics
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('fashion')}
                className={`transition-colors py-1 hover:text-slate-950 ${
                  selectedCategory === 'fashion'
                    ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                    : ''
                }`}
              >
                Fashion
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('home-living')}
                className={`transition-colors py-1 hover:text-slate-950 ${
                  selectedCategory === 'home-living'
                    ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                    : ''
                }`}
              >
                Home & Living
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('deals')}
                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-semibold py-1"
              >
                <Flame className="w-4 h-4 fill-amber-500" />
                <span>Flash Deals</span>
              </button>
            </nav>

            {/* Zone 2: Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-2">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-500 text-sm rounded-full pl-10 pr-10 py-2 border border-transparent focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs p-1"
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>

            {/* Zone 3: Actions (Search Mobile, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search Toggle */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => setActiveView('wishlist')}
                className="relative p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label={`Wishlist with ${wishlist.length} items`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center gap-1.5 p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Account menu"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden xl:inline text-xs font-medium max-w-[80px] truncate">
                    {user ? user.fullName.split(' ')[0] : 'Sign In'}
                  </span>
                  <ChevronDown className="hidden sm:inline w-3.5 h-3.5 text-slate-400" />
                </button>

                {accountDropdownOpen && (
                  <div
                    onMouseLeave={() => setAccountDropdownOpen(false)}
                    className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2.5 border-b border-slate-100">
                          <p className="text-xs text-slate-500">Signed in as</p>
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {user.fullName}
                          </p>
                          <span className="text-[10px] font-mono text-emerald-700 uppercase bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                            {user.role === 'admin' ? 'Admin Access' : 'Verified Shopper'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveView('account');
                            setAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>My Profile & Orders</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveView('wishlist');
                            setAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Heart className="w-4 h-4 text-slate-400" />
                          <span>Wishlist ({wishlist.length})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveView('admin');
                            setAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-amber-700 font-medium hover:bg-amber-50/50 flex items-center gap-2 border-t border-slate-100"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-600" />
                          <span>Admin Control Center</span>
                        </button>

                        <div className="border-t border-slate-100 my-1" />

                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-xs text-slate-600 mb-2">
                            Access orders, saved addresses and personalized recommendations.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthModalMode('login');
                              setIsAuthModalOpen(true);
                              setAccountDropdownOpen(false);
                            }}
                            className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            Sign In / Register
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveView('admin');
                            setAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                          <span>Store Admin Demo</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Shopping Bag Button (Cart) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-xs"
                aria-label={`Shopping bag with ${cartItemCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                <span className="w-5 h-5 bg-amber-400 text-slate-950 text-xs font-extrabold rounded-full flex items-center justify-center tabular-nums">
                  {cartItemCount}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Dropdown */}
          {mobileSearchOpen && (
            <div className="md:hidden py-2.5 border-t border-slate-100 animate-slideDown">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="w-full bg-slate-100 text-slate-900 text-sm rounded-full pl-10 pr-10 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  autoFocus
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs p-1"
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs">
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-baseline tracking-tight">
                  <span className="text-xl font-bold font-serif">Ajasia</span>
                  <span className="text-xl font-bold text-amber-400 font-sans">GO</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(null);
                      setActiveView('home');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 text-slate-900"
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(null);
                      setActiveView('shop');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 text-slate-900"
                  >
                    All Products
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleCategoryClick('deals');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 hover:bg-amber-50 flex items-center gap-1.5"
                  >
                    <Flame className="w-4 h-4 fill-amber-500" />
                    <span>Flash Deals</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-slate-400">{cat.itemCount}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    My AjasiaGO
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('account');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Account & Orders</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('wishlist');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-slate-400" />
                    <span>Wishlist ({wishlist.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-amber-700 font-medium hover:bg-amber-50 rounded-lg flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-600" />
                    <span>Admin Dashboard</span>
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50">
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                  >
                    Sign Out ({user.fullName})
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('login');
                      setIsAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors text-center"
                  >
                    Sign In / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
