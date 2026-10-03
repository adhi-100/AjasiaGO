import { CartItem } from './cart';

export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'cod';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  flatHouseNo: string;
  streetArea: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: OrderStatus;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  courierPartner: string;
}
