'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useShop } from '@/context/ShopContext';
import { ProductImage } from '@/components/common/ProductImage';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { RatingStars } from '@/components/common/RatingStars';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { navigateToProduct, addToCart, toggleWishlist, isInWishlist, getProductRatingStats } = useShop();
  const [isAdding, setIsAdding] = useState(false);

  // Dynamic review rating calculation (updates live if reviews are added)
  const stats = getProductRatingStats(product.id);
  const currentRating = stats.totalReviews > 0 ? stats.averageRating : product.rating;
  const currentCount = stats.totalReviews > 0 ? stats.totalReviews : product.reviewCount;
  const inWish = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]?.name);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigateToProduct(product.slug);
    }
  };

  return (
    <div
      onClick={() => navigateToProduct(product.slug)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer h-full"
    >
      {/* Visual Asset Container */}
      <div className="relative w-full overflow-hidden bg-slate-50">
        <ProductImage
          imageKey={product.imageKey}
          name={product.name}
          category={product.category}
          aspectRatio="square"
          className="transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Wishlist Button (Floating Top Right) */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm z-20 ${
            inWish
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
              : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Button (Slide in on hover desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            type="button"
            onClick={handleQuickView}
            className="w-full py-2 px-3 bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold rounded-xl shadow-lg border border-slate-200/80 flex items-center justify-center gap-1.5 backdrop-blur-sm transition-transform active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Flash deal indicator if active */}
        {product.isFlashDeal && (
          <div className="absolute bottom-3 left-3 z-10 sm:group-hover:opacity-0 transition-opacity">
            <span className="text-[10px] font-bold text-amber-950 bg-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              ⚡ Flash Deal
            </span>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-600 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <span className="text-[11px] text-slate-400">{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating & Review Count (Prominent Display!) */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="inline-flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
              <span className="text-xs font-bold text-amber-800 tabular-nums">
                {currentRating.toFixed(1)}
              </span>
              <span className="text-amber-500 text-xs">★</span>
            </div>
            <span className="text-xs text-slate-500 font-normal">
              ({currentCount} reviews)
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
            size="md"
          />

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
              isAdding
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95 shadow-xs'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
