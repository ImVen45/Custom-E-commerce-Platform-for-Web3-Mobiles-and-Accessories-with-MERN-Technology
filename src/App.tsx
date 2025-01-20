import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ChatWidget from './components/ChatWidget';
import Cart from './components/Cart';
import WalletConnect from './components/WalletConnect';
import PaymentModal from './components/PaymentModal';
import type { Product, CartItem, WalletInfo, PaymentDetails } from './types';
import { Filter } from 'lucide-react';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  
  const products: Product[] = [
    {
      id: '1',
      name: 'Solana Saga',
      description: 'The ultimate Web3 mobile experience with Solana Mobile Stack and dApp support.',
      price: 599,
      category: 'phone',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd',
      stock: 15,
      discount: 0.1, // 10% off
      specs: {
        screen: '6.67" OLED 120Hz',
        processor: 'Snapdragon 8+ Gen 1',
        ram: '12GB',
        storage: '512GB',
        camera: '50MP Main',
        battery: '4100 mAh'
      }
    },
    {
      id: '2',
      name: 'Jambo Africa Phone',
      description: 'Built for Web3 in Africa with integrated crypto wallet and DeFi features.',
      price: 399,
      category: 'phone',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
      stock: 20,
      discount: 0.15, // 15% off
      specs: {
        screen: '6.5" FHD+ 90Hz',
        processor: 'MediaTek Dimensity 900',
        ram: '8GB',
        storage: '256GB',
        camera: '48MP Main',
        battery: '5000 mAh'
      }
    },
    {
      id: '3',
      name: 'CryptoSafe Hardware Wallet Case',
      description: 'Secure hardware wallet integrated into a premium phone case with NFC.',
      price: 99,
      category: 'accessory',
      image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05',
      stock: 50,
      discount: 0.2, // 20% off
      specs: {
        security: 'Military-grade encryption',
        connectivity: 'NFC, Bluetooth 5.0',
        compatibility: 'Universal fit',
        material: 'Premium TPU + Polycarbonate'
      }
    },
    {
      id: '4',
      name: 'Web3 Starter Kit',
      description: 'Essential accessories bundle: hardware wallet, NFC tags, and security card.',
      price: 149,
      category: 'accessory',
      image: 'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6',
      stock: 30,
      specs: {
        includes: 'Hardware wallet, 5 NFC tags',
        security: 'PIN protection',
        compatibility: 'All major chains',
        warranty: '2 years'
      }
    },
    {
      id: '5',
      name: 'ETH Phone Pro',
      description: 'Premium smartphone with built-in Ethereum node and Layer 2 optimization.',
      price: 899,
      category: 'phone',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
      stock: 10,
      discount: 0.12, // 12% off
      specs: {
        screen: '6.8" AMOLED 144Hz',
        processor: 'Snapdragon 8 Gen 2',
        ram: '16GB',
        storage: '1TB',
        camera: '108MP Main',
        battery: '5000 mAh'
      }
    },
    {
      id: '6',
      name: 'DeFi Tablet Ultra',
      description: 'Large-screen device optimized for DeFi trading and portfolio management.',
      price: 799,
      category: 'phone',
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764',
      stock: 25,
      discount: 0.15, // 15% off
      specs: {
        screen: '11" Mini-LED 120Hz',
        processor: 'M2 Pro',
        ram: '12GB',
        storage: '512GB',
        camera: '12MP Ultra-wide',
        battery: '8000 mAh'
      }
    },
    {
      id: '7',
      name: 'Crypto Mining Phone',
      description: 'Smartphone with dedicated mining chip for mobile crypto mining.',
      price: 699,
      category: 'phone',
      image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f',
      stock: 30,
      specs: {
        screen: '6.6" OLED 90Hz',
        processor: 'Mining Chip + Dimensity 9000',
        ram: '12GB',
        storage: '256GB',
        camera: '64MP Main',
        battery: '6000 mAh'
      }
    },
    {
      id: '8',
      name: 'NFT Display Case',
      description: 'Smart phone case with E-ink display for showing off your NFTs.',
      price: 129,
      category: 'accessory',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
      stock: 100,
      discount: 0.25, // 25% off
      specs: {
        display: '2.7" E-ink',
        battery: '2 weeks',
        connectivity: 'Bluetooth 5.2',
        compatibility: 'Most smartphones'
      }
    },
    {
      id: '9',
      name: 'Metaverse Ready Bundle',
      description: 'AR/VR accessories bundle for mobile metaverse experiences.',
      price: 299,
      category: 'accessory',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac',
      stock: 40,
      discount: 0.2, // 20% off
      specs: {
        includes: 'AR glasses, controllers',
        fov: '120 degrees',
        tracking: '6DOF',
        compatibility: 'Universal'
      }
    },
    {
      id: '10',
      name: 'Secure Crypto Earbuds',
      description: 'Wireless earbuds with built-in hardware wallet and voice commands.',
      price: 199,
      category: 'accessory',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
      stock: 75,
      specs: {
        audio: 'Hi-Res certified',
        battery: '30 hours total',
        security: 'Voice biometrics',
        features: 'Wallet integration'
      }
    }
  ];

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleWalletConnect = (wallet: WalletInfo) => {
    setWalletInfo(wallet);
  };

  const handleCheckout = () => {
    if (!walletInfo) {
      setIsWalletModalOpen(true);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handlePayment = async (details: PaymentDetails) => {
    // Here you would integrate with your payment processor
    // For demo purposes, we'll simulate a payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCart([]);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onWalletClick={() => setIsWalletModalOpen(true)}
        walletInfo={walletInfo}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Featured Crypto Devices</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg shadow hover:bg-purple-700">
            <Filter className="h-5 w-5" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
      
      <ChatWidget />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <WalletConnect
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />

      {walletInfo && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          items={cart}
          walletAddress={walletInfo.address}
          onPayment={handlePayment}
        />
      )}
    </div>
  );
}

export default App;