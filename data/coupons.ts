import { Coupon } from '@/types/cart';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'AJASIA10',
    discountType: 'percentage',
    discountValue: 10,
    minimumOrder: 499,
    description: '10% instant discount on orders above ₹499 (Max ₹500)',
    maxDiscount: 500,
  },
  {
    code: 'WELCOME15',
    discountType: 'percentage',
    discountValue: 15,
    minimumOrder: 999,
    description: '15% off your first AjasiaGO shopping order (Max ₹750)',
    maxDiscount: 750,
  },
  {
    code: 'GO20',
    discountType: 'percentage',
    discountValue: 20,
    minimumOrder: 1999,
    description: 'Flat 20% off on premium carts over ₹1,999 (Max ₹1,200)',
    maxDiscount: 1200,
  },
  {
    code: 'FLAT200',
    discountType: 'fixed',
    discountValue: 200,
    minimumOrder: 1299,
    description: 'Flat ₹200 off on eligible orders above ₹1,299',
  },
];
