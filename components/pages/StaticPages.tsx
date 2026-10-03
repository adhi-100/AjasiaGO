'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  HelpCircle,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface StaticPageProps {
  pageType: 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'shipping' | 'returns';
}

export const StaticPages: React.FC<StaticPageProps> = ({ pageType }) => {
  const { setActiveView, addToast } = useShop();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Message Sent', 'Thank you! Our support team will reply within 2 hours.', 'success');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const faqs = [
    {
      q: 'How long does delivery take across India?',
      a: 'Orders are dispatched within 24 hours from our nearest regional fulfillment centers. Metro deliveries arrive in 1 to 2 business days; all other Indian PIN codes arrive in 3 to 5 business days.',
    },
    {
      q: 'Is Cash on Delivery (COD) available?',
      a: 'Yes! Cash on Delivery is available across 19,000+ PIN codes in India. You can pay via cash or scan a dynamic UPI QR code on the delivery partner’s device.',
    },
    {
      q: 'What is AjasiaGO’s return policy?',
      a: 'We offer a 7-day hassle-free doorstep return policy for defective, incorrect, or unsatisfied purchases. Return pickups are arranged at zero cost.',
    },
    {
      q: 'How do I submit product reviews and ratings?',
      a: 'On every product detail page, scroll to the "Customer Reviews & Ratings" section and click "Write a Review". You can provide a 1-5 star score and detailed feedback which will be verified and published immediately.',
    },
    {
      q: 'Are all products sold on AjasiaGO genuine and under warranty?',
      a: '100% of products are directly sourced and inspected under our 10-point authenticity framework, accompanied by brand replacement warranties.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* ABOUT PAGE */}
        {pageType === 'about' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 animate-fadeIn">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Our Story & Mission
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-serif">
              About AjasiaGO
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded with the vision <em>&ldquo;Everything You Want. One GO&rdquo;</em>, AjasiaGO is India’s premier modern shopping platform built for fast, dependable, and enjoyable online retail.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                <span className="text-xl font-bold text-slate-900 font-mono">19,000+</span>
                <p className="text-slate-500 font-medium">PIN Codes Served Across India</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                <span className="text-xl font-bold text-slate-900 font-mono">100%</span>
                <p className="text-slate-500 font-medium">Genuine Brand Guarantee</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
                <span className="text-xl font-bold text-slate-900 font-mono">24/7</span>
                <p className="text-slate-500 font-medium">Customer Support Escalation</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-3 leading-relaxed">
              <h3 className="font-bold text-slate-900 text-sm">Our Core Pillars</h3>
              <p>
                <strong>Uncompromised Quality:</strong> Every electronics item, fashion piece, and home decor accessory undergoes stringent QA before dispatch.
              </p>
              <p>
                <strong>Transparent Pricing:</strong> Realistic Indian Rupee (₹) pricing with no hidden charges at checkout, plus free shipping on all orders over ₹499.
              </p>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {pageType === 'contact' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Help & Inquiries
              </span>
              <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
                Contact AjasiaGO Support
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Our support team is available 7 days a week from 8:00 AM to 10:00 PM IST
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Email Us</span>
                  <span className="text-slate-600">support@ajasiago.in</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Toll-Free Helpline</span>
                  <span className="text-slate-600">1800-419-AGO (246)</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">HQ Fulfillment Hub</span>
                  <span className="text-slate-600">Indiranagar, Bengaluru, KA</span>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <form onSubmit={handleContactSubmit} className="space-y-4 pt-4 border-t border-slate-100 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Send a Direct Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">How can we help you?</label>
                <textarea
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  required
                  placeholder="Order query, return status, or product questions..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        )}

        {/* FAQ PAGE */}
        {pageType === 'faq' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Common Questions
              </span>
              <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
                Frequently Asked Questions
              </h1>
            </div>

            <div className="divide-y divide-slate-100">
              {faqs.map((faq, i) => (
                <div key={i} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaq === i ? 'rotate-180 text-slate-900' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SHIPPING POLICY */}
        {pageType === 'shipping' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 text-xs text-slate-600 leading-relaxed animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Shipping & Delivery Policy
            </h1>
            <p>
              AjasiaGO is committed to delivering your orders accurately, in good condition, and always on time. We partner with premier Indian logistics carriers including BlueDart, Delhivery, Shadowfax, and Express Post.
            </p>
            <h3 className="text-sm font-bold text-slate-900 pt-2">Shipping Charges</h3>
            <p>
              Free delivery is automatically applied to all orders with cart totals equal to or exceeding <strong>₹499</strong>. Orders under ₹499 carry a flat nominal fee of ₹49.
            </p>
            <h3 className="text-sm font-bold text-slate-900 pt-2">Tracking Your Consignment</h3>
            <p>
              Once your parcel is handed over to the courier partner, an automated SMS and email containing your live tracking identifier (e.g. AGX982741IN) will be sent.
            </p>
          </div>
        )}

        {/* RETURN & REFUND POLICY */}
        {pageType === 'returns' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 text-xs text-slate-600 leading-relaxed animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Return & Refund Policy
            </h1>
            <p>
              We want you to be completely delighted with your purchase on AjasiaGO. If any item is not as expected, you can request a return within <strong>7 days</strong> of delivery.
            </p>
            <h3 className="text-sm font-bold text-slate-900 pt-2">Eligibility Guidelines</h3>
            <p>
              Items must be in original condition with intact brand tags, user manuals, and warranty documentation. Beauty and personal hygiene kits must remain unopened.
            </p>
            <h3 className="text-sm font-bold text-slate-900 pt-2">Refund Turnaround</h3>
            <p>
              Upon pickup and quick reverse inspection, refunds to UPI / bank cards are credited in 24 to 48 business hours. COD refunds are transferred directly to your bank account via NEFT/UPI.
            </p>
          </div>
        )}

        {/* PRIVACY POLICY */}
        {pageType === 'privacy' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 text-xs text-slate-600 leading-relaxed animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Privacy Policy
            </h1>
            <p>
              AjasiaGO respects your privacy and is committed to protecting your personal information under the Digital Personal Data Protection (DPDP) Act of India. We only collect the necessary information needed to process your orders, ship your packages, and communicate delivery updates.
            </p>
            <p>
              We never sell, rent, or trade your personal data to external advertisers. Payment credentials are handled through PCI-DSS Level 1 certified gateways and are never stored on our servers.
            </p>
          </div>
        )}

        {/* TERMS & CONDITIONS */}
        {pageType === 'terms' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 text-xs text-slate-600 leading-relaxed animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Terms & Conditions
            </h1>
            <p>
              By accessing or using the AjasiaGO online shopping platform, you agree to comply with our general commercial terms, coupon guidelines, and user verification policies under Indian e-commerce consumer guidelines.
            </p>
            <p>
              All listed product pricing is in Indian Rupees (INR ₹) inclusive of applicable GST. We reserve the right to correct typographical pricing discrepancies or cancel fraudulent demo cart sessions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
