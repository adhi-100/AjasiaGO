'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ProductImage } from '@/components/common/ProductImage';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { RatingStars } from '@/components/common/RatingStars';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, moveWishlistToCart, setActiveView, navigateToProduct } = useShop();

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={() => setActiveView('shop')}
              className="text-xs font-semibold text-slate-900 hover:text-amber-600 transition-colors flex items-center gap-1"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-4 max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500">
                Explore our collections and tap the heart icon on any product to save it here.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('shop')}
              className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div
                  className="cursor-pointer relative"
                  onClick={() => navigateToProduct(product.slug)}
                >
                  <ProductImage
                    imageKey={product.imageKey}
                    name={product.name}
                    category={product.category}
                    aspectRatio="square"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-white shadow-xs"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div onClick={() => navigateToProduct(product.slug)} className="cursor-pointer">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">
                      {product.brand}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2 mt-0.5 hover:text-amber-600">
                      {product.name}
                    </h4>

                    <div className="mt-1 flex items-center gap-1.5">
                      <RatingStars rating={product.rating} size="xs" />
                      <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
                    </div>

                    <div className="mt-2">
                      <PriceDisplay
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discountPercentage={product.discountPercentage}
                        size="sm"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => moveWishlistToCart(product)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
