"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  return (
    <div className="min-h-[200vh] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-white text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Next.js 15
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-blue-200 text-center max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          + Motion Library
        </motion.p>

        {/* Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {["Gestures", "Layout", "Scroll"].map((feature, index) => (
            <motion.div
              key={feature}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature}
              </h3>
              <p className="text-blue-200">
                Amazing {feature.toLowerCase()} animations
              </p>
            </motion.div>
          ))}
        </div>

        {/* Toggle Button Demo */}
        <motion.button
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold"
          onClick={() => setIsVisible(!isVisible)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Toggle Box
        </motion.button>

        {/* Layout Animation Demo */}
        {isVisible && (
          <motion.div
            className="w-32 h-32 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg"
            layoutId="box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>

      {/* Scroll Section */}
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-40 h-40 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-8"
            style={{ scale }}
          />
          <h2 className="text-4xl font-bold text-white mb-4">
            Scroll-Linked Animation
          </h2>
          <p className="text-xl text-blue-200 max-w-md">
            This circle scales as you scroll. Motion makes complex animations
            simple.
          </p>
        </motion.div>
      </div>

      {/* Stagger Animation Demo */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          whileInView="visible"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
