'use client';

import React from 'react';
import { ShopProvider, useShop } from '@/context/ShopContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToastContainer } from '@/components/common/ToastContainer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/modals/AuthModal';

import { HomePage } from '@/components/pages/HomePage';
import { ShopPage } from '@/components/pages/ShopPage';
import { ProductDetailPage } from '@/components/pages/ProductDetailPage';
import { CheckoutPage } from '@/components/pages/CheckoutPage';
import { OrderConfirmationPage } from '@/components/pages/OrderConfirmationPage';
import { WishlistPage } from '@/components/pages/WishlistPage';
import { AccountPage } from '@/components/pages/AccountPage';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { StaticPages } from '@/components/pages/StaticPages';

const MainAppContent: React.FC = () => {
  const { activeView, selectedProductSlug, getProductBySlug, products } = useShop();

  const renderActiveView = () => {
    switch (activeView) {
      case 'product-detail': {
        const prod =
          (selectedProductSlug && getProductBySlug(selectedProductSlug)) || products[0];
        return <ProductDetailPage product={prod} />;
      }
      case 'shop':
        return <ShopPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'about':
      case 'contact':
      case 'faq':
      case 'privacy':
      case 'terms':
      case 'shipping':
      case 'returns':
        return <StaticPages pageType={activeView} />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <Header />
      <main className="flex-1">{renderActiveView()}</main>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function Page() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
