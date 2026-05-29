"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NumberTicker({ value }) {
  const digits = String(value).split("");

  return (
    <span className="inline-flex overflow-hidden h-[1em] items-center">
      {digits.map((digit, index) => {
        // যদি কমা বা অন্য কোনো ক্যারেক্টার হয়, তবে অ্যানিমেশন ছাড়া দেখাবে
        if (isNaN(Number(digit))) {
          return <span key={index}>{digit}</span>;
        }

        return <DigitTicker key={index} digit={Number(digit)} />;
      })}
    </span>
  );
}

// প্রতিটা সিঙ্গেল ডিজিটের জন্য আলাদা স্ক্রোলিং কম্পোনেন্ট
function DigitTicker({ digit }) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <span className="relative w-[0.6em] h-full inline-block">
      <motion.span
        initial={{ y: 0 }}
        animate={{ y: `-${digit * 10}%` }}
        transition={{
          duration: 2.5, // মনের মতো সময় বাড়িয়ে দিতে পারেন
          ease: [0.16, 1, 0.3, 1], // Custom Cubic-Bezier (খুবই স্মুথ ইজিং)
        }}
        className="absolute flex flex-col left-0 top-0"
      >
        {numbers.map((num) => (
          <span key={num} className="h-full">
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}