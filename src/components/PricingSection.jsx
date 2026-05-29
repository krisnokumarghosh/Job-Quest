"use client";

import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="#F7C2FF"
          stroke="#F7C2FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    monthlyPrice: 0,
    yearlyPrice: 0,
    subtitle: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <polyline
          points="22 7 13.5 15.5 8.5 10.5 2 17"
          stroke="#F7C2FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="16 7 22 7 22 13"
          stroke="#F7C2FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    monthlyPrice: 17,
    yearlyPrice: 12,
    subtitle: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          fill="#F7C2FF"
          stroke="#F7C2FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    monthlyPrice: 99,
    yearlyPrice: 74,
    subtitle: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Tag */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-sm bg-violet-500 inline-block" />
          <span className="text-violet-400 text-[11px] font-medium tracking-widest uppercase">
            Pricing
          </span>
          <span className="w-1.5 h-1.5 rounded-sm bg-violet-500 inline-block" />
        </div>

        {/* Heading */}
        <h2 className="text-white text-4xl md:text-5xl font-bold text-center leading-tight mb-10">
          Pay for the leverage,
          <br />
          not the listings
        </h2>

        {/* Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center bg-[#1a1a24] border border-[#2a2a38] rounded-full p-1 gap-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const price =
              billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            return (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
                  plan.highlight
                    ? "bg-[#151516] border-[#1e1e28]"
                    : " border-[#1e1e28]"
                }`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl border text-[#F7C2FF] flex items-center justify-center">
                      {plan.icon}
                    </div>
                    <span className="text-white font-semibold text-base">
                      {plan.name}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-3xl font-bold">
                      ${price}
                    </span>
                    <span className="text-gray-500 text-xs">/month</span>
                  </div>
                </div>

                {/* Features */}
                <p className="text-gray-400 text-sm mb-4">{plan.subtitle}</p>
                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-gray-300 text-sm"
                    >
                      <span className="w-5 h-5 rounded-full border border-[#3a3a52] flex items-center justify-center shrink-0">
                        <svg
                          viewBox="0 0 10 10"
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                        >
                          <path
                            d="M5 1v8M1 5h8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <button
                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      plan.highlight
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-[#1e1e2a] text-gray-300 border border-[#2a2a3a] hover:border-[#4a4a6a] hover:text-white"
                    }`}
                  >
                    Choose This Plan
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
