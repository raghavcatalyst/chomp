'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { useEffect } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    console.log('Cart items:', cart);
  }, [cart]);

  const total = cart.reduce((sum: number, item) => sum + (item.price * item.quantity), 0);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Menu
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">Start adding some delicious items!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      src={item.videoUrl}
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-700">{item.restaurant}</p>
                    <p className="text-gray-800 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}

            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
              </div>
              <button className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 