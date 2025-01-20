import React from 'react';
import { ShoppingCart, Menu, Search, Wallet } from 'lucide-react';
import type { WalletInfo } from '../types';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  onWalletClick: () => void;
  walletInfo: WalletInfo | null;
}

export default function Navbar({ cartItemCount, onCartClick, onWalletClick, walletInfo }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Wallet className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">CryptoMobile</span>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search crypto phones..."
                className="w-96 px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 bg-white/10 backdrop-blur-md border border-white/20"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {walletInfo ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md">
                <span className="text-sm">{walletInfo.balance} SOL</span>
                <span className="text-xs opacity-75">
                  {walletInfo.address.slice(0, 4)}...{walletInfo.address.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={onWalletClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md"
              >
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet</span>
              </button>
            )}
            
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-white/10"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button className="md:hidden p-2 rounded-full hover:bg-white/10">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}