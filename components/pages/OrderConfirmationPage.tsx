'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ProductImage } from '@/components/common/ProductImage';
import { formatINR } from '@/components/common/PriceDisplay';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { confirmedOrder, orders, setActiveView } = useShop();
  const order = confirmedOrder || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 text-center">
        <p className="text-slate-600 text-sm">No recent order found.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Success Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Confirmed & Preparing for Dispatch
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Order Placed Successfully!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Thank you for shopping with AjasiaGO! We’ve sent your order confirmation and invoice to{' '}
              <strong className="text-slate-800">{order.customer.email}</strong>.
            </p>
          </div>

          {/* Key Order Meta Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-left text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Order Number</span>
              <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Order Date</span>
              <span className="font-semibold text-slate-900">{order.date}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Total Paid</span>
              <span className="font-extrabold text-slate-900 tabular-nums">
                {formatINR(order.total)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Payment Mode</span>
              <span className="font-semibold text-slate-900 uppercase">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Tracking & Delivery Timeline Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Shipment Status</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Tracking: <strong className="text-slate-800">{order.trackingNumber}</strong>
            </span>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span className="text-amber-950 font-medium">
                Estimated Delivery by:{' '}
                <strong>
                  {new Date(order.estimatedDeliveryDate).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </strong>
              </span>
            </div>
            <span className="text-[11px] text-amber-800 font-semibold">
              Partner: {order.courierPartner}
            </span>
          </div>

          {/* Delivery Address Details */}
          <div className="pt-2 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Delivering to:</span>
            </div>
            <p className="text-slate-800 font-semibold">{order.shippingAddress.fullName}</p>
            <p>
              {order.shippingAddress.flatHouseNo}, {order.shippingAddress.streetArea}
            </p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
              {order.shippingAddress.pinCode}, India
            </p>
            <p className="text-slate-500">Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-500" />
            <span>Items in this Order ({order.items.length})</span>
          </h3>

          <div className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <ProductImage
                      imageKey={item.product.imageKey}
                      name={item.product.name}
                      aspectRatio="square"
                      className="w-full h-full text-[6px] p-1"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.product.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} · {formatINR(item.product.price)} each
                    </p>
                  </div>
                </div>

                <span className="font-bold text-slate-900 tabular-nums">
                  {formatINR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums font-semibold text-slate-800">
                {formatINR(order.subtotal)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount Applied</span>
                <span className="tabular-nums font-semibold">-{formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shippingFee === 0 ? 'FREE' : formatINR(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
              <span>Final Total</span>
              <span className="tabular-nums text-base">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Buttons: Track Order & Continue Shopping */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveView('account')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs"
          >
            Track in My Orders
          </button>

          <button
            type="button"
            onClick={() => setActiveView('shop')}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
