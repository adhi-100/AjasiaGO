'use client';

import React from 'react';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showDiscountBadge?: boolean;
}

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  discountPercentage,
  size = 'md',
  className = '',
  showDiscountBadge = true,
}) => {
  const sizeClasses = {
    sm: {
      price: 'text-sm font-semibold',
      original: 'text-xs',
      badge: 'text-[10px] px-1 py-0.5',
    },
    md: {
      price: 'text-base font-bold',
      original: 'text-xs',
      badge: 'text-[11px] px-1.5 py-0.5',
    },
    lg: {
      price: 'text-xl font-bold',
      original: 'text-sm',
      badge: 'text-xs px-2 py-0.5',
    },
    xl: {
      price: 'text-2xl sm:text-3xl font-extrabold',
      original: 'text-base sm:text-lg',
      badge: 'text-xs sm:text-sm px-2 py-1',
    },
  };

  const currentSize = sizeClasses[size];
  const calculatedDiscount =
    discountPercentage ??
    (originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  return (
    <div className={`inline-flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`${currentSize.price} text-slate-900 tabular-nums tracking-tight`}>
        {formatINR(price)}
      </span>

      {originalPrice && originalPrice > price && (
        <span
          className={`${currentSize.original} text-slate-500 line-through tabular-nums`}
          aria-label={`Original price: ${formatINR(originalPrice)}`}
        >
          {formatINR(originalPrice)}
        </span>
      )}

      {showDiscountBadge && calculatedDiscount > 0 && (
        <span
          className={`${currentSize.badge} font-semibold text-emerald-700 bg-emerald-50 rounded border border-emerald-200/60 tabular-nums whitespace-nowrap`}
        >
          {calculatedDiscount}% OFF
        </span>
      )}
    </div>
  );
};
