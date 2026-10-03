export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  userCity?: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  brand: string;
  price: number; // In INR ₹
  originalPrice: number;
  discountPercentage: number;
  rating: number; // Average rating (e.g. 4.6)
  reviewCount: number; // Total number of reviews
  imageKey: string; // Identifier for our high-fidelity SVG/styled product renderer
  thumbnailUrl?: string;
  stock: number;
  inStock: boolean;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  specifications: ProductSpecification[];
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  bestseller?: boolean;
  isFlashDeal?: boolean;
  dealEndsInHours?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  iconName: string;
  accentBg: string;
}
