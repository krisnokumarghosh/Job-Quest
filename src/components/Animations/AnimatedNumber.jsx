"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

export default function AnimatedNumber({ value }) {
  const count = useMotionValue(0);
  
  // ১. স্ক্রোল ডিটেক্ট করার জন্য একটি Ref তৈরি করুন
  const ref = useRef(null);
  
  // ২. useInView হুক ব্যবহার করুন। once: true দিলে অ্যানিমেশনটি স্ক্রোলে শুধু একবারই হবে
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const rounded = useTransform(count, (latest) => {
    return Math.floor(latest).toLocaleString();
  });

  useEffect(() => {
    // ৩. যদি কম্পোনেন্টটি স্ক্রিনে আসে (isInView === true), তবেই অ্যানিমেশন স্টার্ট হবে
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2, // ২ সেকেন্ড ধরে ধীরেসুস্থে অ্যানিমেট হবে
        ease: "easeOut",
      });

      return () => controls.stop();
    }
  }, [value, count, isInView]); // ডিপেনডেন্সি লিস্টে isInView যুক্ত করা হয়েছে

  // ৪. মেইন রিফটি (ref={ref}) এই motion.span-এ বসিয়ে দিন
  return <motion.span ref={ref}>{rounded}</motion.span>;
}