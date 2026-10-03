'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number; // 0 to 5
  totalReviews?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showCount?: boolean;
  interactive?: boolean;
  onChange?: (newRating: number) => void;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  totalReviews,
  size = 'sm',
  showCount = false,
  interactive = false,
  onChange,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const currentVal = hoverRating !== null ? hoverRating : rating;

  const starLabels: { [key: number]: string } = {
    1: '1 Star - Disappointing',
    2: '2 Stars - Needs Improvement',
    3: '3 Stars - Average',
    4: '4 Stars - Very Good',
    5: '5 Stars - Outstanding / Loved it!',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5" role={interactive ? 'radiogroup' : 'img'} aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = currentVal >= starIndex;
          const isHalf = !isFilled && currentVal >= starIndex - 0.5;

          return (
            <button
              type="button"
              key={starIndex}
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starIndex)}
              onMouseEnter={() => interactive && setHoverRating(starIndex)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={`${
                interactive
                  ? 'cursor-pointer hover:scale-110 transition-transform p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded'
                  : 'cursor-default'
              }`}
              aria-label={interactive ? `${starIndex} Stars` : undefined}
            >
              <Star
                className={`${starSizes[size]} transition-colors ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-300/60 text-amber-400'
                    : 'fill-slate-100 text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {interactive && hoverRating !== null && (
        <span className="text-xs font-medium text-amber-700 ml-1.5 animate-fadeIn">
          {starLabels[hoverRating]}
        </span>
      )}

      {!interactive && showCount && (
        <span className="text-xs font-semibold text-slate-700 ml-1 tabular-nums">
          {rating.toFixed(1)}
          {totalReviews !== undefined && (
            <span className="text-slate-500 font-normal ml-1">
              ({totalReviews})
            </span>
          )}
        </span>
      )}
    </div>
  );
};
