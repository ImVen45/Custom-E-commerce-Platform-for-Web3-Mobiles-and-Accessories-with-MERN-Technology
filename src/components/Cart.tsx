import React from 'react';
import { X, Trash2, CreditCard } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discount 
      ? item.product.price * (1 - item.product.discount)
      : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Your Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-400">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-4 bg-gray-800/50 p-4 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-purple-400 font-semibold">
                        ${item.product.discount 
                          ? (item.product.price * (1 - item.product.discount)).toFixed(2)
                          : item.product.price.toFixed(2)}
                      </span>
                      {item.product.discount && (
                        <span className="text-sm text-gray-400 line-through">
                          ${item.product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                          className="text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-800 p-4 space-y-4">
              <div className="flex justify-between text-white">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}