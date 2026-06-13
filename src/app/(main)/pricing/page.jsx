"use client";
import React, { useState } from "react";

const seekerPlans = [
  {
    name: "Free",
    id: 'seeker_free',
    price: "$0",
    period: "forever",
    icon: "★",
    iconColor: "text-violet-400",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
  },
  {
    name: "Pro",
    id: 'seeker_pro',
    price: "$19",
    period: "month",
    icon: "↗",
    iconColor: "text-violet-400",
    highlighted: true,
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
  },
  {
    name: "Premium",
    id: 'seeker_premium',
    price: "$39",
    period: "month",
    icon: "⚡",
    iconColor: "text-violet-400",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id: 'recruiter_free',
    price: "$0",
    period: "forever",
    icon: "★",
    iconColor: "text-violet-400",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Great for first year of hiring",
    ],
  },
  {
    name: "Growth",
    id: 'recruiter_growth',
    price: "$49",
    period: "month",
    icon: "↗",
    iconColor: "text-violet-400",
    highlighted: true,
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Enterprise",
    id: 'recruiter_enterprise',
    price: "$149",
    period: "month",
    icon: "⚡",
    iconColor: "text-violet-400",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
  },
];

const faqs = [
  {
    q: "Can I cancel my plan anytime?",
    a: "Yes, you can cancel at any time. Your plan stays active until the end of the billing cycle — no hidden fees, no questions asked.",
  },
  {
    q: "What is the refund policy?",
    a: "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact support within 7 days of your payment and we'll issue a full refund.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as PayPal. All payments are securely processed via Stripe.",
  },
  {
    q: "Can I switch between plans?",
    a: "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Upgrades are prorated immediately; downgrades take effect at the next billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Paid plans don't have a free trial, but our Free plan gives you a solid taste of the platform with no credit card required.",
  },
];

const PlanCard = ({ plan }) => (
  <div
    className={`relative flex flex-col h-97.25 rounded-2xl p-6 border transition-all duration-200
      ${
        plan.highlighted
          ? "bg-white text-gray-900 border-white shadow-2xl scale-105"
          : "bg-white/5 text-white border-white/10 hover:border-white/20"
      }`}
  >
    {plan.highlighted && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
        Most Popular
      </span>
    )}

    {/* Header */}
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-base
          ${plan.highlighted ? "bg-gray-100" : "bg-white/10"}`}
        >
          <span className={plan.iconColor}>{plan.icon}</span>
        </div>
        <span
          className={`font-semibold text-lg ${plan.highlighted ? "text-gray-900" : "text-white"}`}
        >
          {plan.name}
        </span>
      </div>
      <div className="text-right">
        <span
          className={`text-3xl font-bold ${plan.highlighted ? "text-gray-900" : "text-white"}`}
        >
          {plan.price}
        </span>
        <span
          className={`text-sm ml-1 ${plan.highlighted ? "text-gray-400" : "text-white/40"}`}
        >
          /{plan.period}
        </span>
      </div>
    </div>

    {/* Divider */}
    <div
      className={`h-px mb-5 ${plan.highlighted ? "bg-gray-100" : "bg-white/10"}`}
    />

    {/* Features */}
    <ul className="flex flex-col gap-3 flex-1 mb-6">
      {plan.features.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <span
            className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold
            ${plan.highlighted ? "border-gray-300 text-gray-500" : "border-white/20 text-white/40"}`}
          >
            +
          </span>
          <span
            className={plan.highlighted ? "text-gray-600" : "text-white/70"}
          >
            {f}
          </span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <form action="/api/checkout_sessions" method="POST">
    <input type="hidden" name="plan_id" value={plan.id} />
      <section>
        <button
          className={`w-full flex items-center justify-between px-5 py-3 rounded-xl font-medium text-sm transition-all
        ${
          plan.highlighted
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
        }`}
          type="submit"
          role="link"
        >
          Choose This Plan
          <span>→</span>
        </button>
      </section>
    </form>
  </div>
);

const FaqItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/10 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition">
        <span className="text-white font-medium text-sm">{faq.q}</span>
        <span
          className={`text-white/40 text-lg transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </div>
      {open && (
        <div className="px-5 pb-4 text-white/50 text-sm leading-relaxed border-t border-white/10 pt-3">
          {faq.a}
        </div>
      )}
    </div>
  );
};

const PricingPage = () => {
  const [tab, setTab] = useState("seeker");
  const plans = tab === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Pricing
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">
            Simple, Transparent Pricing
          </h1>
          <p className="text-white/50 text-base">
            Pick a plan that works for you. No surprises.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex gap-1">
            {["seeker", "recruiter"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    tab === t
                      ? "bg-violet-600 text-white shadow"
                      : "text-white/50 hover:text-white"
                  }`}
              >
                {t === "seeker" ? "For Job Seekers" : "For Recruiters"}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center mb-20">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-white/40 text-sm text-center mb-8">
            Everything you need to know about plans & billing.
          </p>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
