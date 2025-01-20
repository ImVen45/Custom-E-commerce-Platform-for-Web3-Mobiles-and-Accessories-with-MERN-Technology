import React, { useState } from 'react';
import { Wallet, X } from 'lucide-react';
import type { WalletInfo } from '../types';

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: WalletInfo) => void;
}

export default function WalletConnect({ isOpen, onClose, onConnect }: WalletConnectProps) {
  const [connecting, setConnecting] = useState(false);

  const handlePhantomConnect = async () => {
    try {
      setConnecting(true);
      // @ts-ignore - Phantom wallet types
      const provider = window.phantom?.solana;
      
      if (provider?.isPhantom) {
        const response = await provider.connect();
        const address = response.publicKey.toString();
        
        // Get account info
        const balance = await provider.connection.getBalance(response.publicKey);
        
        onConnect({
          address,
          balance: (balance / 1000000000).toFixed(2),
          network: 'solana'
        });
        
        onClose();
      } else {
        window.open('https://phantom.app/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-gray-900 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Connect Wallet</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <button
              onClick={handlePhantomConnect}
              disabled={connecting}
              className="w-full flex items-center justify-between p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <Wallet className="h-6 w-6" />
                <span className="font-semibold">Phantom Wallet</span>
              </div>
              <span className="text-sm opacity-75">Solana</span>
            </button>

            <div className="text-center text-sm text-gray-400">
              <p>New to Solana?</p>
              <a
                href="https://phantom.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Get Phantom Wallet →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}