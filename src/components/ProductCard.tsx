import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount)
    : product.price;

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-900 border border-purple-500/20">
          <Heart className="h-5 w-5 text-purple-400 hover:text-purple-300" />
        </button>
        {product.discount && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {product.discount * 100}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="mt-1 text-gray-400 text-sm line-clamp-2">{product.description}</p>
        
        {product.specs && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-400">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex items-center gap-1">
                <span className="capitalize">{key}:</span>
                <span className="text-purple-400">{value}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Price</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-400">
                ${discountedPrice.toLocaleString()}
              </span>
              {product.discount && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}