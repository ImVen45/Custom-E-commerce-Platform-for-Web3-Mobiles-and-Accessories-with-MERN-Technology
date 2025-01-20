export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'phone' | 'accessory';
  image: string;
  stock: number;
  discount?: number;
  specs?: {
    screen?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    camera?: string;
    battery?: string;
    security?: string;
    connectivity?: string;
    compatibility?: string;
    material?: string;
    includes?: string;
    warranty?: string;
    display?: string;
    fov?: string;
    tracking?: string;
    audio?: string;
    features?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  walletAddress?: string;
  cart: CartItem[];
}

export interface WalletInfo {
  address: string;
  balance: string;
  network: string;
}

export interface PaymentDetails {
  amount: number;
  currency: string;
  walletAddress: string;
  network: string;
}