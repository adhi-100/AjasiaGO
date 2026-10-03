'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { ProductImage } from '@/components/common/ProductImage';
import { formatINR } from '@/components/common/PriceDisplay';
import { PaymentMethodType, ShippingAddress } from '@/types/order';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  Lock,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    activeCoupon,
    createOrder,
    setActiveView,
    user,
  } = useShop();

  // Wizard Step: 1 = Customer Info, 2 = Address, 3 = Payment, 4 = Review
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form States
  const [customerInfo, setCustomerInfo] = useState({
    fullName: user ? user.fullName : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
  });

  const defaultSaved = user?.savedAddresses?.[0];
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: defaultSaved?.fullName || user?.fullName || '',
    phone: defaultSaved?.phone || user?.phone || '',
    flatHouseNo: defaultSaved?.flatHouseNo || '',
    streetArea: defaultSaved?.streetArea || '',
    landmark: defaultSaved?.landmark || '',
    city: defaultSaved?.city || 'Bengaluru',
    state: defaultSaved?.state || 'Karnataka',
    pinCode: defaultSaved?.pinCode || '560038',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'other'>('gpay');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Truck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your bag is empty</h2>
          <p className="text-xs text-slate-500">
            Please add items to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => setActiveView('shop')}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  const validateStep1 = () => {
    if (!customerInfo.fullName.trim() || !customerInfo.email.trim() || !customerInfo.phone.trim()) {
      setFormError('Please fill in your name, email, and mobile number.');
      return false;
    }
    setFormError('');
    return true;
  };

  const validateStep2 = () => {
    if (
      !shippingAddress.flatHouseNo.trim() ||
      !shippingAddress.streetArea.trim() ||
      !shippingAddress.city.trim() ||
      !shippingAddress.pinCode.trim() ||
      shippingAddress.pinCode.length !== 6
    ) {
      setFormError('Please complete all delivery address fields including valid 6-digit PIN code.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      createOrder({
        customer: customerInfo,
        shippingAddress,
        paymentMethod,
      });
    }, 1200);
  };

  const steps = [
    { num: 1, label: 'Contact Info' },
    { num: 2, label: 'Delivery Address' },
    { num: 3, label: 'Payment' },
    { num: 4, label: 'Order Review' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Checkout Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveView('shop')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* Multi-Step Wizard Indicator */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-4 gap-2">
            {steps.map((s) => (
              <div
                key={s.num}
                className={`flex flex-col sm:flex-row items-center sm:items-center gap-2 text-xs font-semibold ${
                  currentStep === s.num
                    ? 'text-slate-950 font-bold'
                    : currentStep > s.num
                    ? 'text-emerald-700'
                    : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 font-mono ${
                    currentStep === s.num
                      ? 'bg-slate-900 text-white'
                      : currentStep > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {currentStep > s.num ? '✓' : s.num}
                </div>
                <span className="hidden sm:inline truncate">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid: Form Steps + Order Summary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Wizard Form Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            {/* Step 1: Customer Contact Info */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Step 1: Customer Details</h3>
                  <p className="text-xs text-slate-500">
                    We will send order confirmation & tracking details here
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                      }
                      placeholder="e.g. Aditya Sharma"
                      className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, email: e.target.value })
                      }
                      placeholder="e.g. aditya@example.in"
                      className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (for delivery SMS & OTP) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-xs font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={customerInfo.phone.replace('+91', '').trim()}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: `+91 ${e.target.value.replace(/\D/g, '')}`,
                          })
                        }
                        placeholder="9876543210"
                        className="w-full text-xs rounded-r-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Delivery Address (India format) */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Step 2: Delivery Address</h3>
                  <p className="text-xs text-slate-500">
                    Indian residential or workplace delivery location
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Recipient Name *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.fullName}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                        }
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={shippingAddress.pinCode}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            pinCode: e.target.value.replace(/\D/g, ''),
                          })
                        }
                        placeholder="e.g. 560038"
                        className="w-full text-xs font-mono rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Flat / House No. / Building Name *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.flatHouseNo}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, flatHouseNo: e.target.value })
                      }
                      placeholder="e.g. Flat 402, Sunshine Heights"
                      className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street / Area / Locality *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.streetArea}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, streetArea: e.target.value })
                      }
                      placeholder="e.g. 12th Main Road, Indiranagar"
                      className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City / District *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, city: e.target.value })
                        }
                        placeholder="e.g. Bengaluru"
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, state: e.target.value })
                        }
                        placeholder="e.g. Karnataka"
                        className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.landmark}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, landmark: e.target.value })
                      }
                      placeholder="e.g. Near Metro Station / Behind Supermarket"
                      className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Selection */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Step 3: Select Payment Option</h3>
                  <p className="text-xs text-slate-500">
                    Seamless simulation ready for Razorpay or Stripe integration
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* UPI Option */}
                  <label
                    className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="text-slate-900"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            UPI (Instant 0% Fee)
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Google Pay, PhonePe, Paytm, BHIM, CRED
                          </span>
                        </div>
                      </div>
                      <QrCode className="w-5 h-5 text-slate-500" />
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2">
                        <div className="flex gap-2 text-xs">
                          {(['gpay', 'phonepe', 'paytm'] as const).map((app) => (
                            <button
                              type="button"
                              key={app}
                              onClick={() => setSelectedUpiApp(app)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase ${
                                selectedUpiApp === app
                                  ? 'bg-slate-900 text-white border-slate-900'
                                  : 'bg-white text-slate-700 border-slate-200'
                              }`}
                            >
                              {app}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Or enter your UPI ID (e.g. mobile@upi)"
                          className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white"
                        />
                      </div>
                    )}
                  </label>

                  {/* Card Option */}
                  <label
                    className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="text-slate-900"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Credit / Debit Cards
                          </span>
                          <span className="text-[11px] text-slate-500">
                            RuPay, Visa, MasterCard, Maestro
                          </span>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-slate-500" />
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2">
                        <input
                          type="text"
                          maxLength={19}
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: e.target.value })
                          }
                          placeholder="Card Number (Demo: 4242 •••• •••• 4242)"
                          className="w-full text-xs font-mono rounded-lg border border-slate-200 px-3 py-2 bg-white"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="text-xs font-mono rounded-lg border border-slate-200 px-3 py-2 bg-white"
                          />
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="CVV"
                            className="text-xs font-mono rounded-lg border border-slate-200 px-3 py-2 bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Net Banking */}
                  <label
                    className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'netbanking'}
                          onChange={() => setPaymentMethod('netbanking')}
                          className="text-slate-900"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Net Banking
                          </span>
                          <span className="text-[11px] text-slate-500">
                            HDFC, ICICI, SBI, Axis, Kotak, 50+ Banks
                          </span>
                        </div>
                      </div>
                      <Building className="w-5 h-5 text-slate-500" />
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-slate-900"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Pay via Cash or QR scan at doorstep on delivery
                          </span>
                        </div>
                      </div>
                      <Banknote className="w-5 h-5 text-emerald-600" />
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Final Order Review */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Step 4: Final Order Review</h3>
                  <p className="text-xs text-slate-500">
                    Verify delivery address and payment choice before confirming
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700 block">Deliver to:</span>
                    <p className="text-slate-900 font-bold mt-0.5">{shippingAddress.fullName}</p>
                    <p className="text-slate-600 mt-0.5">
                      {shippingAddress.flatHouseNo}, {shippingAddress.streetArea}
                    </p>
                    <p className="text-slate-600">
                      {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
                    </p>
                    <p className="text-slate-500 mt-0.5">Phone: {customerInfo.phone}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-700">Payment Option:</span>
                    <p className="text-slate-900 font-bold capitalize mt-0.5">
                      {paymentMethod === 'cod'
                        ? 'Cash on Delivery (Doorstep)'
                        : paymentMethod.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {formError && (
              <p className="text-xs text-rose-600 font-semibold">{formError}</p>
            )}

            {/* Navigation Buttons between Steps */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? 'Confirming Order...' : `Place Order · ${formatINR(cartTotal)}`}
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Order Items Summary & Pricing */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Items List Preview */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex items-center gap-3 text-xs"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <ProductImage
                      imageKey={item.product.imageKey}
                      name={item.product.name}
                      aspectRatio="square"
                      className="w-full h-full text-[6px] p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {formatINR(cartSubtotal)}
                </span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount {activeCoupon && `(${activeCoupon.code})`}</span>
                  <span className="font-semibold tabular-nums">-{formatINR(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="tabular-nums">
                  {cartShippingFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    formatINR(cartShippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                <span>Total Amount</span>
                <span className="tabular-nums text-base">{formatINR(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1 text-slate-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>AjasiaGO Buyer Guarantee</span>
              </div>
              <p>7-day return guarantee · Pan-India verified courier dispatch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
