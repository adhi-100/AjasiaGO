'use client';

import React, { useState } from 'react';
import { ProductReview } from '@/types/product';
import { useShop } from '@/context/ShopContext';
import { RatingStars } from '@/components/common/RatingStars';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquarePlus,
  Filter,
  X,
  ShieldCheck,
} from 'lucide-react';

interface ProductReviewsSectionProps {
  productId: string;
  productName: string;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  productId,
  productName,
}) => {
  const {
    getProductReviews,
    getProductRatingStats,
    addReview,
    voteReviewHelpful,
    user,
  } = useShop();

  const reviews = getProductReviews(productId);
  const stats = getProductRatingStats(productId);

  // Review Form Modal / Drawer State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formRating, setFormRating] = useState<number>(5);
  const [formName, setFormName] = useState(user ? user.fullName : '');
  const [formCity, setFormCity] = useState(user?.savedAddresses?.[0]?.city || '');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formError, setFormError] = useState('');

  // Filtering reviews by star rating
  const [filterStar, setFilterStar] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'helpful'>('helpful');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Please enter a review headline or summary.');
      return;
    }
    if (!formComment.trim() || formComment.trim().length < 10) {
      setFormError('Please share at least 10 characters describing your experience.');
      return;
    }

    addReview({
      productId,
      userName: formName.trim() || 'AjasiaGO Shopper',
      userCity: formCity.trim() || 'Verified Buyer',
      rating: formRating,
      title: formTitle,
      comment: formComment,
    });

    // Reset and close
    setIsFormOpen(false);
    setFormTitle('');
    setFormComment('');
    setFormError('');
  };

  // Filtered and sorted reviews
  let displayedReviews = [...reviews];
  if (filterStar !== null) {
    displayedReviews = displayedReviews.filter((r) => Math.round(r.rating) === filterStar);
  }

  if (sortBy === 'helpful') {
    displayedReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
  } else {
    displayedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-8">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Customer Reviews & Ratings
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real feedback from verified AjasiaGO purchasers across India
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (user && !formName) {
              setFormName(user.fullName);
            }
            setIsFormOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs active:scale-95 shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4 text-amber-400" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Prominent Rating Overview Bar & Star Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60">
        {/* Big Average Score Display */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-slate-200/80">
          <span className="text-5xl sm:text-6xl font-black text-slate-950 tabular-nums tracking-tighter">
            {stats.averageRating.toFixed(1)}
          </span>

          <div className="my-2">
            <RatingStars rating={stats.averageRating} size="md" />
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Based on <span className="font-semibold text-slate-800">{stats.totalReviews} verified ratings</span>
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Genuine Buyer Feedback</span>
          </div>
        </div>

        {/* 5-Star Breakdown Progress Bars */}
        <div className="md:col-span-8 space-y-2.5 px-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const data = stats.breakdown[star] || { count: 0, percentage: 0 };
            const isSelected = filterStar === star;

            return (
              <button
                type="button"
                key={star}
                onClick={() => setFilterStar(isSelected ? null : star)}
                className={`w-full flex items-center gap-3 text-xs text-left group rounded-lg p-1 transition-colors ${
                  isSelected ? 'bg-amber-50/80 ring-1 ring-amber-300' : 'hover:bg-slate-100/60'
                }`}
              >
                <span className="w-12 font-medium text-slate-700 flex items-center gap-1 shrink-0">
                  <span>{star}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </span>

                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>

                <span className="w-12 text-right font-medium text-slate-500 tabular-nums shrink-0">
                  {data.percentage}%
                </span>

                <span className="w-12 text-right text-[11px] text-slate-400 tabular-nums shrink-0">
                  ({data.count})
                </span>
              </button>
            );
          })}

          {filterStar !== null && (
            <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
              <span>
                Filtering by <strong>{filterStar} stars</strong> ({displayedReviews.length} found)
              </span>
              <button
                type="button"
                onClick={() => setFilterStar(null)}
                className="text-amber-700 font-semibold hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Submission Modal / Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">Write a Review</h4>
                <p className="text-xs text-slate-500 truncate max-w-xs">{productName}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Overall Rating *
                </label>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-2">
                  <RatingStars
                    rating={formRating}
                    size="lg"
                    interactive={true}
                    onChange={(r) => setFormRating(r)}
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    Tap a star to rate from 1 to 5
                  </span>
                </div>
              </div>

              {/* Reviewer Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Headline / Summary *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="What's the most important thing to know?"
                  className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              {/* Detailed Review Comment */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Experience *
                </label>
                <textarea
                  rows={4}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="What did you like or dislike about this product? How was the build quality, delivery speed, or everyday fit?"
                  className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              {formError && (
                <p className="text-xs text-rose-600 font-medium">{formError}</p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List & Controls */}
      <div className="space-y-4">
        {/* Controls Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-semibold text-slate-900">{displayedReviews.length}</span> reviews
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'helpful')}
              className="bg-slate-100 text-slate-800 font-medium rounded-lg px-2.5 py-1 border border-slate-200 focus:outline-none"
            >
              <option value="helpful">Most Helpful</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Empty state for reviews */}
        {displayedReviews.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-3">
            <p className="text-sm">No reviews match the current filter.</p>
            <button
              onClick={() => setFilterStar(null)}
              className="text-xs font-semibold text-amber-700 underline"
            >
              View all reviews
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayedReviews.map((rev) => (
              <div key={rev.id} className="py-5 space-y-2.5">
                {/* Author and Rating Line */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                      {rev.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {rev.userName}
                        </span>
                        {rev.verifiedPurchase && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {rev.userCity && `${rev.userCity} · `}
                        {new Date(rev.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <RatingStars rating={rev.rating} size="xs" />
                </div>

                {/* Review Headline & Body */}
                <h4 className="text-sm font-semibold text-slate-900 pt-1">
                  {rev.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>

                {/* Helpful Button */}
                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => voteReviewHelpful(rev.id)}
                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors p-1 -ml-1 rounded"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400">Report</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
