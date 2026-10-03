'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Clock, Truck } from 'lucide-react';

export const PinDeliveryChecker: React.FC = () => {
  const [pinCode, setPinCode] = useState('');
  const [result, setResult] = useState<{
    status: 'success' | 'error';
    city?: string;
    deliveryTime?: string;
    codAvailable?: boolean;
    message?: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkPin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinCode.trim();

    if (!cleanPin || cleanPin.length !== 6 || !/^\d{6}$/.test(cleanPin)) {
      setResult({
        status: 'error',
        message: 'Please enter a valid 6-digit Indian Postal PIN code.',
      });
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      const prefix = cleanPin.substring(0, 2);

      let city = 'Metro Region';
      if (['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].includes(prefix)) {
        city = 'Delhi NCR & North Zone';
      } else if (['40', '41', '42', '43', '44', '45', '46', '47'].includes(prefix)) {
        city = 'Mumbai, Pune & Western Hub';
      } else if (['56', '57', '58', '59', '60', '61', '62', '63', '64'].includes(prefix)) {
        city = 'Bengaluru, Chennai & South Hub';
      } else if (['50', '51', '52', '53', '54', '55'].includes(prefix)) {
        city = 'Hyderabad, Telangana & AP';
      } else if (['70', '71', '72', '73', '74'].includes(prefix)) {
        city = 'Kolkata & Eastern Hub';
      }

      setResult({
        status: 'success',
        city,
        deliveryTime: '2 to 3 Business Days (Express)',
        codAvailable: true,
      });
    }, 400);
  };

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
        <MapPin className="w-4 h-4 text-amber-600" />
        <span>Check Delivery Availability</span>
      </div>

      <form onSubmit={checkPin} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            value={pinCode}
            onChange={(e) => {
              setPinCode(e.target.value.replace(/\D/g, ''));
              if (result) setResult(null);
            }}
            placeholder="Enter 6-digit PIN code (e.g. 560038)"
            className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <button
          type="submit"
          disabled={isChecking || pinCode.length !== 6}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
        >
          {isChecking ? 'Checking...' : 'Check'}
        </button>
      </form>

      {result && result.status === 'success' && (
        <div className="pt-2 text-xs text-slate-700 space-y-1.5 border-t border-slate-200/60 animate-fadeIn">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Delivery available to {result.city} ({pinCode})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Truck className="w-3.5 h-3.5 text-slate-400" />
            <span>Estimated delivery in <strong>{result.deliveryTime}</strong></span>
          </div>
          <div className="text-[11px] text-slate-500">
            ✓ Cash on Delivery (COD) eligible · Free shipping on orders above ₹499
          </div>
        </div>
      )}

      {result && result.status === 'error' && (
        <div className="pt-1 flex items-center gap-1.5 text-xs text-rose-600 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
};
