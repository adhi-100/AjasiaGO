'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Product } from '@/types/product';
import { formatINR } from '@/components/common/PriceDisplay';
import { ProductImage } from '@/components/common/ProductImage';
import { OrderStatus } from '@/types/order';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  X,
  Check,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    categories,
    coupons,
    setActiveView,
    addToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'coupons' | 'analytics'
  >('overview');

  // Product Add / Edit Modal State
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields for Add / Edit
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodCategory, setProdCategory] = useState('Electronics');
  const [prodPrice, setProdPrice] = useState(1999);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(3999);
  const [prodStock, setProdStock] = useState(25);
  const [prodDesc, setProdDesc] = useState('');

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 128450;
  const totalOrdersCount = orders.length + 42;
  const totalCustomersCount = 186;
  const lowStockProducts = products.filter((p) => p.stock < 25);

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdBrand('AjasiaGO Essentials');
    setProdCategory('Electronics');
    setProdPrice(999);
    setProdOriginalPrice(1999);
    setProdStock(50);
    setProdDesc('High-durability precision build with 1-year brand replacement warranty.');
    setIsEditingModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdBrand(p.brand);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice);
    setProdStock(p.stock);
    setProdDesc(p.description);
    setIsEditingModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      addToast('Error', 'Product name is required.', 'error');
      return;
    }

    const discountPercentage = Math.round(
      ((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100
    );

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        brand: prodBrand,
        category: prodCategory,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        discountPercentage,
        stock: Number(prodStock),
        inStock: Number(prodStock) > 0,
        description: prodDesc,
      });
    } else {
      addProduct({
        name: prodName,
        slug: prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        brand: prodBrand,
        category: prodCategory,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        discountPercentage,
        rating: 4.8,
        reviewCount: 1,
        imageKey: 'earbuds_black',
        stock: Number(prodStock),
        inStock: Number(prodStock) > 0,
        description: prodDesc,
        specifications: [
          { name: 'Quality Inspection', value: 'Passed 10-Point AjasiaGO Benchmark' },
          { name: 'Warranty', value: '1 Year Brand Replacement' },
        ],
        tags: [prodCategory, 'New'],
      });
    }

    setIsEditingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Admin Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded">
                Admin Console
              </span>
              <span className="text-xs text-slate-400">Store Version 1.0 (India Hub)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              AjasiaGO Merchant Operations
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live catalog control, stock replenishment, and multi-state fulfillment
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('home')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Customer View
            </button>
            <button
              onClick={openNewProductModal}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingCart },
            { id: 'coupons', label: `Promotions & Coupons (${coupons.length})`, icon: Tag },
            { id: 'analytics', label: 'Regional Analytics', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-xs text-slate-400 font-medium">Gross Merchandise Value</span>
                <div className="text-2xl font-extrabold text-slate-950 font-mono">
                  {formatINR(totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% this month</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-xs text-slate-400 font-medium">Total Orders</span>
                <div className="text-2xl font-extrabold text-slate-950 font-mono">
                  {totalOrdersCount}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>99.2% on-time delivery</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-xs text-slate-400 font-medium">Live Products</span>
                <div className="text-2xl font-extrabold text-slate-950 font-mono">
                  {products.length}
                </div>
                <div className="text-[11px] text-slate-500">Across {categories.length} departments</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-xs text-slate-400 font-medium">Low Stock Alerts</span>
                <div className="text-2xl font-extrabold text-amber-600 font-mono">
                  {lowStockProducts.length}
                </div>
                <div className="text-[11px] text-amber-700 font-semibold">
                  Requires warehouse reorder
                </div>
              </div>
            </div>

            {/* Low Stock Watchlist */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900">Inventory Attention Needed</h3>
                </div>
                <span className="text-xs text-slate-400">Stock &lt; 25 units</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {lowStockProducts.slice(0, 5).map((p) => (
                  <div key={p.id} className="py-2.5 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900 truncate max-w-sm">{p.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-rose-600 font-mono font-bold">Only {p.stock} left</span>
                      <button
                        onClick={() => openEditModal(p)}
                        className="text-amber-700 font-semibold hover:underline"
                      >
                        Quick Restock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS TABLE & CRUD */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-5 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Product Catalog ({products.length} Items)
              </h3>
              <button
                type="button"
                onClick={openNewProductModal}
                className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add New Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">Product</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Price (₹)</th>
                    <th className="pb-3 font-semibold">Stock</th>
                    <th className="pb-3 font-semibold">Rating</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-3">
                        <div className="font-semibold text-slate-900 max-w-xs truncate">{p.name}</div>
                        <span className="text-[10px] text-slate-400">{p.brand}</span>
                      </td>
                      <td className="py-3 text-slate-600">{p.category}</td>
                      <td className="py-3 font-mono font-bold text-slate-900">
                        {formatINR(p.price)}
                      </td>
                      <td className="py-3 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.stock < 20
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 font-mono text-slate-700">{p.rating.toFixed(1)} ★</td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-900">Customer Orders ({orders.length})</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">City</th>
                    <th className="pb-3 font-semibold">Total</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                      <td className="py-3 text-slate-700">
                        <div className="font-semibold">{ord.customer.fullName}</div>
                        <div className="text-[10px] text-slate-400">{ord.customer.phone}</div>
                      </td>
                      <td className="py-3 text-slate-600">{ord.shippingAddress.city}</td>
                      <td className="py-3 font-mono font-bold text-slate-900">
                        {formatINR(ord.total)}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-900">Active Promo Coupons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {c.code}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-slate-600">{c.description}</p>
                  <p className="text-[11px] text-slate-400">Min Cart: {formatINR(c.minimumOrder)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900">Pan-India Geographic Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                <span className="font-bold text-slate-900 block">South Zone (42%)</span>
                <p className="text-slate-500">Bengaluru, Hyderabad, Chennai, Kochi</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                <span className="font-bold text-slate-900 block">North Zone (34%)</span>
                <p className="text-slate-500">Delhi NCR, Jaipur, Chandigarh, Lucknow</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                <span className="font-bold text-slate-900 block">West & East (24%)</span>
                <p className="text-slate-500">Mumbai, Pune, Ahmedabad, Kolkata</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit / Add Product Modal */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h4>
              <button
                type="button"
                onClick={() => setIsEditingModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Product Name *</label>
                <input
                  type="text"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
