export type CategoryType = 
  | 'All' 
  | 'Audio' 
  | 'Wearables' 
  | 'Cameras' 
  | 'Gaming' 
  | 'Smart Home' 
  | 'Power & Accessories';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  badge: 'Best Seller' | 'New Arrival' | 'Top Rated' | 'Sale -20%' | 'Sale -30%' | 'Trending' | 'Popular' | 'Limited Stock';
  rating: number;
  reviewCount: number;
  img: string;
  gallery: string[];
  description: string;
  highlights: string[];
  specs: {
    [key: string]: string;
  };
  inStock: boolean;
  inventoryCount: number;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Currency {
  code: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'JPY';
  symbol: string;
  rate: number; // multiplier from USD
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: Currency;
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'volt_pay' | 'crypto';
  status: 'Order Placed' | 'Packing' | 'Shipped' | 'Delivered';
  createdAt: string;
  estimatedDelivery: string;
}
