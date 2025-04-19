"use client";

import { useState, useRef, useEffect } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./hooks/useCart";
import MobileWrapper from "./components/MobileWrapper";

interface FoodItem {
  id: number;
  title: string;
  description: string;
  price: number;
  videoUrl: string;
  restaurant: string;
  distance?: string;
  deliveryTime?: string;
  tags?: string[];
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
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033637/pizza_o341y8.mp4?_s=public-apps",
    restaurant: "Pizza Italia",
    distance: "2.3 miles",
    deliveryTime: "20-30 min",
    tags: ["hot right now", "ordered before"],
  },
  {
    id: 3,
    title: "Dim Sum Platter",
    description: "Assorted steamed dumplings and buns",
    price: 18.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033636/dimsum_udmdtt.mp4?_s=public-apps",
    restaurant: "Golden Dragon",
    distance: "1.8 miles",
    deliveryTime: "30-40 min",
    tags: ["ordered before"],
  },
  {
    id: 4,
    title: "Spicy Chicken",
    description: "Tender chicken with signature spicy sauce",
    price: 12.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033637/chicken_lobgqz.mp4?_s=public-apps",
    restaurant: "Spice House",
    distance: "0.9 miles",
    deliveryTime: "15-25 min",
    tags: ["hot right now"],
  },
  {
    id: 5,
    title: "Ramen Bowl",
    description: "Rich broth with fresh noodles and toppings",
    price: 13.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033635/ramen_zaj42y.mp4?_s=public-apps",
    restaurant: "Noodle House",
    distance: "1.2 miles",
    deliveryTime: "20-30 min",
    tags: ["hot right now"],
  },
  {
    id: 6,
    title: "Street Tacos",
    description: "Authentic Mexican street-style tacos",
    price: 9.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033634/tacos_vh7ldh.mp4?_s=public-apps",
    restaurant: "Taco Corner",
    distance: "2.1 miles",
    deliveryTime: "25-35 min",
    tags: ["ordered before"],
  },
  {
    id: 7,
    title: "Biryani Special",
    description: "Aromatic rice dish with spices and meat",
    price: 15.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033634/biryani_ntuoba.mp4?_s=public-apps",
    restaurant: "Spice Paradise",
    distance: "1.7 miles",
    deliveryTime: "25-35 min",
    tags: ["hot right now"],
  },
  {
    id: 8,
    title: "Chocolate Cake",
    description: "Rich and moist chocolate layer cake",
    price: 7.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033636/cake_p74ws4.mp4?_s=public-apps",
    restaurant: "Sweet Factory",
    distance: "1.5 miles",
    deliveryTime: "20-30 min",
    tags: ["ordered before"],
  },
  {
    id: 9,
    title: "Carbonara Pasta",
    description: "Classic Roman pasta with egg and pecorino",
    price: 16.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033635/latte_yrdolb.mp4?_s=public-apps",
    restaurant: "Roma Cucina",
    distance: "1.9 miles",
    deliveryTime: "25-35 min",
    tags: ["hot right now"],
  },
  {
    id: 10,
    title: "Fresh Sushi Roll",
    description: "Chef's special sushi rolls with fresh fish",
    price: 19.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033638/sushi_r2itkj.mp4?_s=public-apps",
    restaurant: "Sushi Master",
    distance: "2.0 miles",
    deliveryTime: "30-40 min",
    tags: ["hot right now", "ordered before"],
  },
  {
    id: 11,
    title: "Premium Sushi Platter",
    description: "Assortment of fresh nigiri and sashimi",
    price: 24.99,
    videoUrl:
      "https://res.cloudinary.com/dct5khv4h/video/upload/v1745033638/sushi_r2itkj.mp4?_s=public-apps",
    restaurant: "Sushi Delight",
    distance: "1.5 miles",
    deliveryTime: "25-35 min",
    tags: ["ordered before"],
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(
    (currentIndex + 1) % foodItems.length
  );
  const [showDetails, setShowDetails] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const currentCardRef = useRef<HTMLDivElement>(null);
  const { cart, addToCart } = useCart();
  const controls = useAnimation();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % foodItems.length);
  };

  useEffect(() => {
    // Update nextIndex whenever currentIndex changes
    setNextIndex((currentIndex + 1) % foodItems.length);
  }, [currentIndex]);

  const handleAddToCart = () => {
    addToCart(foodItems[currentIndex]);
    handleNext();
  };

  const handleDismiss = () => {
    handleNext();
  };

  const handleLike = () => {
    // Add like functionality here if needed
    handleNext();
  };

  const handleDrag = (info: PanInfo) => {
    const MAX_DISTANCE = 200;
    const xAbs = Math.abs(info.offset.x);
    const yAbs = Math.abs(info.offset.y);

    // Calculate opacity based on drag distance
    let opacity = 1;

    if (info.offset.x > 0 || info.offset.x < 0) {
      opacity = Math.max(1 - xAbs / MAX_DISTANCE, 0.3);
    } else if (info.offset.y < 0) {
      // Only for upward swipe
      opacity = Math.max(1 - yAbs / MAX_DISTANCE, 0.3);
    }

    controls.set({ opacity });

    // Directly manipulate next card visibility for smoother transitions
    const nextCardContainer = document.querySelector(
      ".next-card-container"
    ) as HTMLElement;
    if (nextCardContainer) {
      const visibility = 0.3 + (1 - opacity) * 0.7; // Inverse relationship with current card opacity
      nextCardContainer.style.opacity = visibility.toString();
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;
    const velocity = 0.5;

    // Get the next card container to manipulate
    const nextCardContainer = document.querySelector(
      ".next-card-container"
    ) as HTMLElement;

    // Swipe right (like)
    if (info.offset.x > threshold && info.velocity.x > velocity) {
      controls.start({ x: "100%", opacity: 1 }).then(() => {
        handleLike();
        controls.set({ x: 0, opacity: 1 });
        if (nextCardContainer) nextCardContainer.style.opacity = "0.75";
      });
    }
    // Swipe left (dismiss)
    else if (info.offset.x < -threshold && info.velocity.x < -velocity) {
      controls.start({ x: "-100%", opacity: 1 }).then(() => {
        handleDismiss();
        controls.set({ x: 0, opacity: 1 });
        if (nextCardContainer) nextCardContainer.style.opacity = "0.75";
      });
    }
    // Swipe up (add to cart)
    else if (info.offset.y < -threshold && info.velocity.y < -velocity) {
      controls.start({ y: "-100%", opacity: 1 }).then(() => {
        handleAddToCart();
        controls.set({ y: 0, opacity: 1 });
        if (nextCardContainer) nextCardContainer.style.opacity = "0.75";
      });
    }
    // Reset position if not swiped far enough
    else {
      controls.start({ x: 0, y: 0, opacity: 1 });
      if (nextCardContainer) nextCardContainer.style.opacity = "0.75";
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }

    if (nextVideoRef.current) {
      nextVideoRef.current.play().catch((error) => {
        console.log("Next video autoplay prevented:", error);
      });
    }
  }, [currentIndex, nextIndex]);

  return (
    <MobileWrapper>
      <div className="relative h-full w-full">
        {/* Next food item (positioned behind current) */}
        <div
          className="absolute inset-0 z-0 next-card-container"
          style={{ opacity: 0.75 }}
        >
          <video
            ref={nextVideoRef}
            className="h-full w-full object-cover"
            src={foodItems[nextIndex].videoUrl}
            loop
            muted
            playsInline
          />
          {/* Overlay gradient for next item */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

          {/* Next item content (hidden by default, revealed during swipe) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-24">
              <div className="flex justify-between items-center mb-1">
                <h1 className="text-3xl font-bold">
                  {foodItems[nextIndex].title}
                </h1>
                <span className="text-xl font-bold">
                  {(() => {
                    const price = foodItems[nextIndex].price;
                    if (price < 10) return "$";
                    if (price < 15) return "$$";
                    if (price < 20) return "$$$";
                    return "$$$$";
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg opacity-90">
                  {foodItems[nextIndex].restaurant}
                </p>
              </div>
              <p className="text-lg opacity-80">
                {foodItems[nextIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Current food item with swipe animation */}
        <motion.div
          ref={currentCardRef}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.9}
          onDrag={(event, info) => handleDrag(info)}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="relative h-full w-full z-10"
        >
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
            <div className="mb-24">
              <div className="flex justify-between items-center mb-1">
                <h1 className="text-3xl font-bold">
                  {foodItems[currentIndex].title}
                </h1>
                <span className="text-xl font-bold">
                  {(() => {
                    const price = foodItems[currentIndex].price;
                    if (price < 10) return "$";
                    if (price < 15) return "$$";
                    if (price < 20) return "$$$";
                    return "$$$$";
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg opacity-90">
                  {foodItems[currentIndex].restaurant}
                </p>
                <button
                  onClick={() => setShowDetails(true)}
                  className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-lg opacity-80">
                {foodItems[currentIndex].description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Profile Icon - Now moved outside motion.div with higher z-index */}
        <div className="absolute top-4 left-4 cursor-pointer z-20">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </motion.div>
        </div>

        {/* Action Buttons - Now moved outside motion.div with higher z-index */}
        <div className="absolute bottom-6 left-0 right-0 px-6 z-20">
          <div className="flex justify-between items-center">
            {/* Dismiss/Cross Button (Left) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Add to Cart Button (Middle) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="w-16 h-16 flex items-center justify-center bg-red-500 rounded-full text-white shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </motion.button>

            {/* Love/Like Button (Right) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Cart Badge - Now moved outside motion.div with higher z-index */}
        <Link href="/cart">
          <div className="absolute top-4 right-4 cursor-pointer z-20">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </motion.div>
              {cart.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Food Item Details Modal */}
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-xl w-11/12 max-w-md overflow-hidden"
            >
              {/* Food Image */}
              <div className="relative h-64 w-full">
                <video
                  className="h-full w-full object-cover"
                  src={foodItems[currentIndex].videoUrl}
                  loop
                  muted
                  autoPlay
                  playsInline
                />

                {/* Close Button */}
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Food Details */}
              <div className="p-6 bg-gray-900 text-white">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">
                    {foodItems[currentIndex].title}
                  </h2>
                  <p className="text-xl font-bold">
                    ${foodItems[currentIndex].price.toFixed(2)}
                  </p>
                </div>

                <p className="text-lg mb-4">
                  {foodItems[currentIndex].restaurant}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  {foodItems[currentIndex].tags?.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${
                          tag === "hot right now"
                            ? "bg-amber-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 mb-6">
                  {foodItems[currentIndex].description}
                </p>

                <div className="flex justify-between text-gray-400">
                  <p>{foodItems[currentIndex].distance}</p>
                  <p>{foodItems[currentIndex].deliveryTime}</p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(foodItems[currentIndex]);
                    setShowDetails(false);
                  }}
                  className="w-full mt-6 bg-red-500 py-3 rounded-lg text-white font-bold"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </MobileWrapper>
  );
}
