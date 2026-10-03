'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useShop } from '@/context/ShopContext';
import { ProductImage } from '@/components/common/ProductImage';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { RatingStars } from '@/components/common/RatingStars';
import { PinDeliveryChecker } from '@/components/product/PinDeliveryChecker';
import { ProductReviewsSection } from '@/components/product/ProductReviewsSection';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  RotateCcw,
  Truck,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveView,
    setSelectedCategory,
    products,
    addToast,
    getProductRatingStats,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors ? product.colors[0]?.name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'returns'>('specs');

  const inWish = isInWishlist(product.id);
  const stats = getProductRatingStats(product.id);
  const currentRating = stats.totalReviews > 0 ? stats.averageRating : product.rating;
  const currentCount = stats.totalReviews > 0 ? stats.totalReviews : product.reviewCount;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setActiveView('checkout');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to clipboard.', 'info');
    }
  };

  // Related products from same category or trending
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
          <button
            onClick={() => setActiveView('home')}
            className="hover:text-slate-900 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => {
              setSelectedCategory(product.category.toLowerCase().replace(/\s+/g, '-'));
              setActiveView('shop');
            }}
            className="hover:text-slate-900 transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Purchase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          {/* Left: Gallery & Visual Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/70">
              <ProductImage
                imageKey={product.imageKey}
                name={product.name}
                category={product.category}
                aspectRatio="square"
                className="w-full text-xs p-6 sm:p-8"
              />

              {/* Wishlist Button floating */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm z-20 ${
                  inWish
                    ? 'bg-rose-50 text-rose-500'
                    : 'bg-white/90 text-slate-600 hover:text-rose-500'
                }`}
                aria-label={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Guarantees Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-slate-800">Pan-India Express</span>
                <span className="text-[10px] text-slate-400">2-3 Day Delivery</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">100% Genuine</span>
                <span className="text-[10px] text-slate-400">Brand Guaranteed</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-sky-600" />
                <span className="font-semibold text-slate-800">7 Days Return</span>
                <span className="text-[10px] text-slate-400">Hassle-Free Pick</span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Brand, Category & Stock */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {product.brand}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">{product.category}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>In Stock ({product.stock} units available)</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Prominent Rating & Reviews Header */}
              <div className="flex items-center gap-3 py-1">
                <div className="inline-flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/70">
                  <span className="text-sm font-bold text-amber-900 tabular-nums">
                    {currentRating.toFixed(1)}
                  </span>
                  <RatingStars rating={currentRating} size="xs" />
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {currentCount} verified customer ratings & reviews
                </span>
              </div>

              {/* Price Display */}
              <div className="pt-2 pb-1 border-y border-slate-100">
                <PriceDisplay
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discountPercentage={product.discountPercentage}
                  size="xl"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Inclusive of all taxes · Free delivery on this order
                </p>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Select Size</span>
                    <span className="text-amber-700 font-medium cursor-pointer hover:underline">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                          selectedSize === size
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="block text-xs font-semibold text-slate-800">
                    Select Color:{' '}
                    <span className="font-normal text-slate-500">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        type="button"
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor === c.name
                            ? 'ring-2 ring-slate-900 ring-offset-2 border-white'
                            : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={`Select ${c.name} color`}
                      >
                        {selectedColor === c.name && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="space-y-2 pt-2">
                <span className="block text-xs font-semibold text-slate-800">Quantity</span>
                <div className="inline-flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 hover:bg-slate-200 text-slate-700 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xs font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3.5 py-2 hover:bg-slate-200 text-slate-700 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* PIN Code Delivery Checker */}
              <div className="pt-2">
                <PinDeliveryChecker />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-900 font-bold text-xs sm:text-sm rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Buy Now</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Product</span>
                </button>

                <span className="text-[11px] text-slate-400">
                  Item Code: <span className="font-mono">{product.id}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Policy Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-6 border-b border-slate-200 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors ${
                activeTab === 'specs'
                  ? 'text-slate-950 border-b-2 border-slate-950'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Product Specifications
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 transition-colors ${
                activeTab === 'shipping'
                  ? 'text-slate-950 border-b-2 border-slate-950'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Shipping & Delivery
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`pb-3 transition-colors ${
                activeTab === 'returns'
                  ? 'text-slate-950 border-b-2 border-slate-950'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              7-Day Returns & Warranty
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {product.specifications.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="font-medium text-slate-500">{spec.name}</span>
                  <span className="font-bold text-slate-900 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-w-2xl">
              <p>
                <strong>Express Pan-India Logistics:</strong> All orders are dispatched within 24 hours of confirmation from our nearest regional fulfillment centers across Mumbai, Bengaluru, Delhi NCR, and Kolkata.
              </p>
              <p>
                <strong>Standard Delivery Timelines:</strong> Metro cities: 1-2 business days. Rest of India: 3-5 business days. Free shipping is automatically applied to all carts over ₹499.
              </p>
              <p>
                <strong>Tracking & Notifications:</strong> You will receive real-time SMS & email tracking updates with courier live dispatch links.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-w-2xl">
              <p>
                <strong>7-Day No-Questions-Asked Return Window:</strong> If the product is defective, damaged in transit, or differs from the catalog, you can initiate a doorstep pickup return within 7 calendar days of receipt.
              </p>
              <p>
                <strong>Instant Refund Processing:</strong> Once the returned item passes reverse inspection, refunds to UPI / bank accounts are processed within 24-48 business hours.
              </p>
              <p>
                <strong>Manufacturer Warranty:</strong> 1 Year Brand Warranty included against technical defects.
              </p>
            </div>
          )}
        </div>

        {/* Customer Reviews & Ratings Submission Section */}
        <ProductReviewsSection productId={product.id} productName={product.name} />

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  You Might Also Like
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customers who viewed this item also explored
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(product.category.toLowerCase().replace(/\s+/g, '-'));
                  setActiveView('shop');
                }}
                className="text-xs font-semibold text-slate-900 hover:text-amber-600 transition-colors"
              >
                View More in {product.category} →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
