import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1ThQfNKdAJ1IEdVgRts5cQQ3",
  seeker_premium: "price_1ThQrLKdAJ1IEdVgMXBTHUzm",
  recruiter_growth: "price_1ThQtpKdAJ1IEdVgEOP75CUF",
  recruiter_enterprise: "price_1ThQv4KdAJ1IEdVgzyGClJDB",
};
