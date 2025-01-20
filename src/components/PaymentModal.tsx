import React, { useState } from 'react';
import { X, CreditCard, Loader } from 'lucide-react';
import type { PaymentDetails, CartItem } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  walletAddress: string;
  onPayment: (details: PaymentDetails) => Promise<void>;
}

export default function PaymentModal({ isOpen, onClose, items, walletAddress, onPayment }: PaymentModalProps) {
  const [processing, setProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discount 
      ? item.product.price * (1 - item.product.discount)
      : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      await onPayment({
        amount: subtotal,
        currency: 'SOL',
        walletAddress,
        network: 'solana'
      });
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-gray-900 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Complete Payment</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Connected Wallet</span>
                <span>Solana Network</span>
              </div>
              <div className="text-white font-mono break-all">
                {walletAddress}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Network Fee</span>
                <span>~$0.001</span>
              </div>
              <div className="flex justify-between text-white font-semibold pt-2 border-t border-gray-800">
                <span>Total</span>
                <span>${(subtotal + 0.001).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Pay Now
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-400">
              Payment will be processed via Solana Network
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}