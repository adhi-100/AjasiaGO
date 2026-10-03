'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductReview, Category } from '@/types/product';
import { CartItem, Coupon } from '@/types/cart';
import { Order, ShippingAddress, PaymentMethodType, OrderStatus } from '@/types/order';
import { UserProfile } from '@/types/user';
import { INITIAL_PRODUCTS } from '@/data/products';
import { INITIAL_REVIEWS } from '@/data/reviews';
import { INITIAL_CATEGORIES } from '@/data/categories';
import { INITIAL_COUPONS } from '@/data/coupons';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'error';
}

export interface RatingStats {
  averageRating: number;
  totalReviews: number;
  breakdown: { [star: number]: { count: number; percentage: number } };
}

interface ShopContextType {
  // Navigation & View State
  activeView: string;
  setActiveView: (view: string) => void;
  selectedProductSlug: string | null;
  navigateToProduct: (slug: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  confirmedOrder: Order | null;

  // Products
  products: Product[];
  categories: Category[];
  getProductBySlug: (slug: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Reviews System
  reviews: ProductReview[];
  getProductReviews: (productId: string) => ProductReview[];
  getProductRatingStats: (productId: string) => RatingStats;
  addReview: (reviewData: {
    productId: string;
    userName: string;
    userCity?: string;
    rating: number;
    title: string;
    comment: string;
  }) => void;
  voteReviewHelpful: (reviewId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTotal: number;
  cartItemCount: number;

  // Coupons
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (product: Product) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customer: { fullName: string; email: string; phone: string };
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethodType;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Auth
  user: UserProfile | null;
  login: (email: string, role?: 'customer' | 'admin') => void;
  register: (fullName: string, email: string, phone: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr-101',
  fullName: 'Aditya Sharma',
  email: 'aditya.sharma@example.in',
  phone: '+91 98765 43210',
  role: 'customer',
  createdAt: '2026-01-15',
  savedAddresses: [
    {
      id: 'addr-1',
      fullName: 'Aditya Sharma',
      phone: '+91 98765 43210',
      flatHouseNo: 'Flat 402, Sunshine Heights',
      streetArea: '12th Main Road, Indiranagar',
      landmark: 'Near Metro Station',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      country: 'India',
      isDefault: true,
    },
  ],
};

let toastCounter = 0;
const generateToastId = () => {
  toastCounter += 1;
  return `toast-${toastCounter}`;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Navigation State
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // 2. Products & Categories
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ajasiago_products');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  // 3. Reviews State (Saved locally)
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ajasiago_reviews');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_REVIEWS;
  });

  // 4. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ajasiago_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 5. Coupons
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  // 6. Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ajasiago_wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return [];
  });

  // 7. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ajasiago_orders');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    // Demo initial order
    return [
      {
        id: 'ord-1001',
        orderNumber: 'AGO-IND-78241',
        date: '2026-09-24',
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            quantity: 1,
            selectedColor: 'Matte Graphite',
          },
        ],
        subtotal: 2499,
        discount: 250,
        couponCode: 'AJASIA10',
        shippingFee: 0,
        total: 2249,
        customer: {
          fullName: 'Aditya Sharma',
          email: 'aditya.sharma@example.in',
          phone: '+91 98765 43210',
        },
        shippingAddress: {
          fullName: 'Aditya Sharma',
          phone: '+91 98765 43210',
          flatHouseNo: 'Flat 402, Sunshine Heights',
          streetArea: '12th Main Road, Indiranagar',
          landmark: 'Near Metro Station',
          city: 'Bengaluru',
          state: 'Karnataka',
          pinCode: '560038',
          country: 'India',
        },
        paymentMethod: 'upi',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        estimatedDeliveryDate: '2026-09-27',
        trackingNumber: 'DEL-IND-994821',
        courierPartner: 'BlueDart Express',
      },
    ];
  });

  // 8. User Auth State
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ajasiago_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return DEMO_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // 9. Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist items
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ajasiago_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ajasiago_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ajasiago_cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ajasiago_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ajasiago_orders', JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('ajasiago_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ajasiago_user');
      }
    }
  }, [user]);

  // Toast Helper
  const addToast = (
    title: string,
    message?: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    const id = generateToastId();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation helpers
  const navigateToProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setActiveView('product-detail');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getProductBySlug = (slug: string): Product | undefined => {
    return products.find((p) => p.slug === slug);
  };

  // Product Rating & Reviews calculation
  const getProductReviews = (productId: string): ProductReview[] => {
    return reviews.filter((r) => r.productId === productId);
  };

  const getProductRatingStats = (productId: string): RatingStats => {
    const prodReviews = reviews.filter((r) => r.productId === productId);
    const product = products.find((p) => p.id === productId);

    if (prodReviews.length === 0) {
      const baseRating = product ? product.rating : 4.5;
      const baseCount = product ? product.reviewCount : 0;
      return {
        averageRating: baseRating,
        totalReviews: baseCount,
        breakdown: {
          5: { count: Math.round(baseCount * 0.7), percentage: 70 },
          4: { count: Math.round(baseCount * 0.2), percentage: 20 },
          3: { count: Math.round(baseCount * 0.06), percentage: 6 },
          2: { count: Math.round(baseCount * 0.03), percentage: 3 },
          1: { count: Math.round(baseCount * 0.01), percentage: 1 },
        },
      };
    }

    const totalStars = prodReviews.reduce((sum, r) => sum + r.rating, 0);
    const avg = totalStars / prodReviews.length;

    const breakdown: { [star: number]: { count: number; percentage: number } } = {
      5: { count: 0, percentage: 0 },
      4: { count: 0, percentage: 0 },
      3: { count: 0, percentage: 0 },
      2: { count: 0, percentage: 0 },
      1: { count: 0, percentage: 0 },
    };

    prodReviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating)));
      if (breakdown[star]) {
        breakdown[star].count += 1;
      }
    });

    const totalCount = prodReviews.length;
    for (let s = 1; s <= 5; s++) {
      breakdown[s].percentage = Math.round((breakdown[s].count / totalCount) * 100);
    }

    return {
      averageRating: Number(avg.toFixed(1)),
      totalReviews: totalCount,
      breakdown,
    };
  };

  const addReview = (reviewData: {
    productId: string;
    userName: string;
    userCity?: string;
    rating: number;
    title: string;
    comment: string;
  }) => {
    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      productId: reviewData.productId,
      userName: reviewData.userName.trim() || 'AjasiaGO Customer',
      userCity: reviewData.userCity?.trim() || 'Verified Buyer',
      rating: Math.min(5, Math.max(1, reviewData.rating)),
      title: reviewData.title.trim(),
      comment: reviewData.comment.trim(),
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Dynamically update the product's overall rating and reviewCount in the catalog
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === reviewData.productId) {
          const prodReviews = updatedReviews.filter((r) => r.productId === prod.id);
          const totalStars = prodReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvg = Number((totalStars / prodReviews.length).toFixed(1));
          return {
            ...prod,
            rating: newAvg,
            reviewCount: prodReviews.length,
          };
        }
        return prod;
      })
    );

    addToast(
      'Review Submitted!',
      'Thank you! Your verified rating and feedback are now live on AjasiaGO.',
      'success'
    );
  };

  const voteReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === reviewId ? { ...rev, helpfulCount: rev.helpfulCount + 1 } : rev
      )
    );
    addToast('Feedback Recorded', 'Marked as helpful.', 'info');
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    size?: string,
    color?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
      }
    });

    addToast(
      'Added to Cart',
      `${product.name.slice(0, 32)}... has been added to your shopping bag.`,
      'success'
    );
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
    addToast('Removed from Cart', 'Item removed from your shopping bag.', 'info');
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let cartDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'percentage') {
      const discountAmount = Math.round((cartSubtotal * activeCoupon.discountValue) / 100);
      cartDiscount = activeCoupon.maxDiscount
        ? Math.min(discountAmount, activeCoupon.maxDiscount)
        : discountAmount;
    } else {
      cartDiscount = activeCoupon.discountValue;
    }
  }

  // Free shipping above ₹499
  const cartShippingFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 49;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee);

  // Coupon handling
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code === trimmed);

    if (!coupon) {
      addToast('Invalid Coupon', `Code "${trimmed}" is not valid or expired.`, 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (cartSubtotal < coupon.minimumOrder) {
      const msg = `Minimum order amount of ₹${coupon.minimumOrder} required for ${coupon.code}.`;
      addToast('Coupon Condition Not Met', msg, 'error');
      return { success: false, message: msg };
    }

    setActiveCoupon(coupon);
    addToast('Coupon Applied!', `${coupon.code} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    addToast('Coupon Removed', 'Coupon code has been removed.', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast('Removed from Wishlist', `${product.name} removed.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast('Added to Wishlist', `${product.name} saved to your wishlist.`, 'success');
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveWishlistToCart = (product: Product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  // Order creation
  const createOrder = (orderData: {
    customer: { fullName: string; email: string; phone: string };
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethodType;
  }): Order => {
    const orderNum = `AGO-IND-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      couponCode: activeCoupon?.code,
      shippingFee: cartShippingFee,
      total: cartTotal,
      customer: orderData.customer,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      trackingNumber: `AGX${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      courierPartner: 'AjasiaGO Express Logistics',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setConfirmedOrder(newOrder);
    clearCart();
    setActiveView('order-confirmation');
    addToast('Order Placed Successfully!', `Order #${orderNum} confirmed.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
    addToast('Order Updated', `Order status changed to ${status}.`, 'info');
  };

  // Admin Product Catalog Management
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast('Product Created', `${newProduct.name} added to catalog.`, 'success');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    addToast('Product Updated', `${updatedProduct.name} updated successfully.`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product Removed', 'Product removed from catalog.', 'info');
  };

  // User Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const loggedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: role === 'admin' ? 'AjasiaGO Store Manager' : email.split('@')[0],
      email,
      phone: '+91 98765 43210',
      role,
      createdAt: '2026-02-01',
      savedAddresses: DEMO_USER.savedAddresses,
    };
    setUser(loggedUser);
    setIsAuthModalOpen(false);
    addToast(
      'Welcome Back!',
      `Logged in as ${loggedUser.fullName} (${role.toUpperCase()})`,
      'success'
    );
  };

  const register = (fullName: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
      savedAddresses: [],
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    addToast(
      'Account Created!',
      `Welcome to AjasiaGO, ${fullName}! Enjoy ₹200 off your first cart.`,
      'success'
    );
  };

  const logout = () => {
    setUser(null);
    addToast('Signed Out', 'You have been logged out safely.', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductSlug,
        navigateToProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        confirmedOrder,

        products,
        categories,
        getProductBySlug,
        addProduct,
        updateProduct,
        deleteProduct,

        reviews,
        getProductReviews,
        getProductRatingStats,
        addReview,
        voteReviewHelpful,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartDiscount,
        cartShippingFee,
        cartTotal,
        cartItemCount,

        coupons,
        activeCoupon,
        applyCoupon,
        removeCoupon,

        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,

        orders,
        createOrder,
        updateOrderStatus,

        user,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
