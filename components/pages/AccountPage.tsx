'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { formatINR } from '@/components/common/PriceDisplay';
import { ProductImage } from '@/components/common/ProductImage';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Truck,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, orders, logout, setActiveView, addToast } = useShop();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'profile' | 'addresses' | 'payments' | 'settings'
  >('orders');

  const [newAddressModal, setNewAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    flatHouseNo: '',
    streetArea: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <User className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Sign in to view your account</h2>
          <p className="text-xs text-slate-500">
            Please sign in to track your current orders, review purchases, and manage addresses.
          </p>
          <button
            onClick={() => setActiveView('home')}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.flatHouseNo || !newAddr.streetArea || !newAddr.pinCode) {
      addToast('Incomplete Address', 'Please fill in required fields.', 'error');
      return;
    }
    user.savedAddresses.push({
      id: `addr-${Date.now()}`,
      country: 'India',
      ...newAddr,
    });
    setNewAddressModal(false);
    addToast('Address Saved', 'New delivery address added successfully.', 'success');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Confirmed':
      case 'Processing':
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Account Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 font-bold text-xl flex items-center justify-center shadow-xs">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {user.fullName}
                </h1>
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.email} · {user.phone}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 border border-slate-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Grid: Sidebar Navigation + Main Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs space-y-1 h-fit">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'orders'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Information</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'payments'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment Options</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'settings'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Preferences</span>
            </button>
          </div>

          {/* Main Active Panel */}
          <div className="md:col-span-3 space-y-6">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Recent Orders</h3>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
                    No orders placed yet.
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                        <div>
                          <span className="font-mono font-bold text-slate-900">
                            {ord.orderNumber}
                          </span>
                          <span className="text-slate-400 ml-2">Placed on {ord.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                              ord.orderStatus
                            )}`}
                          >
                            {ord.orderStatus}
                          </span>
                          <span className="font-bold text-slate-900 tabular-nums">
                            {formatINR(ord.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {ord.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                <ProductImage
                                  imageKey={item.product.imageKey}
                                  name={item.product.name}
                                  aspectRatio="square"
                                  className="w-full h-full text-[5px] p-1"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-900 line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <p className="text-[11px] text-slate-400">
                                  Qty: {item.quantity} · {formatINR(item.product.price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer & Tracking */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            Tracking: <strong className="font-mono text-slate-800">{ord.trackingNumber}</strong> ({ord.courierPartner})
                          </span>
                        </div>

                        <span className="text-[11px] text-slate-400">
                          Est. Delivery: {ord.estimatedDeliveryDate}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-500 block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      defaultValue={user.fullName}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Email ID</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Primary Phone</label>
                    <input
                      type="text"
                      defaultValue={user.phone}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Account Role</label>
                    <input
                      type="text"
                      defaultValue={user.role.toUpperCase()}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Saved Delivery Addresses</h3>
                  <button
                    type="button"
                    onClick={() => setNewAddressModal(true)}
                    className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600">
                        {addr.flatHouseNo}, {addr.streetArea}
                      </p>
                      <p className="text-slate-600">
                        {addr.city}, {addr.state} - {addr.pinCode}
                      </p>
                      <p className="text-slate-500 text-[11px]">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Saved Payment Methods</h3>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">UPI Autopay / Fast Checkout</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      Verified
                    </span>
                  </div>
                  <p className="text-slate-500 font-mono">aditya.sharma@okaxis</p>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Notification & Security Preferences</h3>
                <div className="space-y-3 text-xs text-slate-700">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                    <span>SMS Order Tracking & Delivery Updates</span>
                    <input type="checkbox" defaultChecked className="rounded text-slate-900" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                    <span>Email Invoices & Return Slips</span>
                    <input type="checkbox" defaultChecked className="rounded text-slate-900" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                    <span>Festive Flash Sale & Coupon Notifications</span>
                    <input type="checkbox" defaultChecked className="rounded text-slate-900" />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
