'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { useCart } from './hooks/useCart';

interface FoodItem {
  id: number;
  title: string;
  description: string;
  price: number;
  videoUrl: string;
  restaurant: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    title: "Margherita Pizza",
    description: "Classic Italian pizza with fresh basil",
    price: 14.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033637/pizza_o341y8.mp4?_s=public-apps",
    restaurant: "Pizza Italia"
  },
  {
    id: 3,
    title: "Dim Sum Platter",
    description: "Assorted steamed dumplings and buns",
    price: 18.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033636/dimsum_udmdtt.mp4?_s=public-apps",
    restaurant: "Golden Dragon"
  },
  {
    id: 4,
    title: "Spicy Chicken",
    description: "Tender chicken with signature spicy sauce",
    price: 12.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033637/chicken_lobgqz.mp4?_s=public-apps",
    restaurant: "Spice House"
  },
  {
    id: 5,
    title: "Ramen Bowl",
    description: "Rich broth with fresh noodles and toppings",
    price: 13.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033635/ramen_zaj42y.mp4?_s=public-apps",
    restaurant: "Noodle House"
  },
  {
    id: 6,
    title: "Street Tacos",
    description: "Authentic Mexican street-style tacos",
    price: 9.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033634/tacos_vh7ldh.mp4?_s=public-apps",
    restaurant: "Taco Corner"
  },
  {
    id: 7,
    title: "Biryani Special",
    description: "Aromatic rice dish with spices and meat",
    price: 15.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033634/biryani_ntuoba.mp4?_s=public-apps",
    restaurant: "Spice Paradise"
  },
  {
    id: 8,
    title: "Chocolate Cake",
    description: "Rich and moist chocolate layer cake",
    price: 7.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033636/cake_p74ws4.mp4?_s=public-apps",
    restaurant: "Sweet Factory"
  },
  {
    id: 9,
    title: "Carbonara Pasta",
    description: "Classic Roman pasta with egg and pecorino",
    price: 16.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033635/latte_yrdolb.mp4?_s=public-apps",
    restaurant: "Roma Cucina"
  },
  {
    id: 10,
    title: "Fresh Sushi Roll",
    description: "Chef's special sushi rolls with fresh fish",
    price: 19.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033638/sushi_r2itkj.mp4?_s=public-apps",
    restaurant: "Sushi Master"
  },
  {
    id: 11,
    title: "Premium Sushi Platter",
    description: "Assortment of fresh nigiri and sashimi",
    price: 24.99,
    videoUrl: "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033638/sushi_r2itkj.mp4?_s=public-apps",
    restaurant: "Sushi Delight"
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { cart, addToCart } = useCart();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % foodItems.length);
  };

  const handleAddToCart = () => {
    addToCart(foodItems[currentIndex]);
    handleNext();
  };

  const handleDismiss = () => {
    handleNext();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, [currentIndex]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={foodItems[currentIndex].videoUrl}
          loop
          muted
          playsInline
        />
        
        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">{foodItems[currentIndex].title}</h1>
            <p className="text-lg opacity-90">{foodItems[currentIndex].restaurant}</p>
            <p className="text-lg opacity-80">{foodItems[currentIndex].description}</p>
            <p className="text-2xl font-bold mt-2">${foodItems[currentIndex].price}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDismiss}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="px-8 py-4 bg-red-500 rounded-full text-white font-bold text-lg shadow-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </motion.button>
          </div>
        </div>

        {/* Cart Badge */}
        {cart.length > 0 && (
          <Link href="/cart">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 font-bold cursor-pointer"
            >
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </motion.div>
          </Link>
        )}
      </div>
    </main>
  );
}
