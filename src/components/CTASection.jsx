"use client";

export default function CTASection() {
  return (
    <section className="relative  overflow-hidden py-50 px-6 flex items-center justify-center min-h-105">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-200 h-150 rounded-full bg-[radial-gradient(circle,#5b2fbe_0%,#3a1a8a_25%,#1a0a40_50%,transparent_70%)] opacity-80" />
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 70% at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at center, black 30%, transparent 80%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-white text-2xl md:text-5xl font-bold leading-tight mb-5">
          Your next role is
          <br />
          already looking for you
        </h2>
        <p className="text-gray-400 text-sm mb-10">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button className="bg-white text-black text-sm font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition-colors duration-200">
            Create a free account
          </button>
          <button className="text-white text-sm font-semibold px-7 py-3 rounded-full border border-white/20 hover:border-white/40 transition-colors duration-200">
            View pricing
          </button>
        </div>
      </div>
    </section>
  );
}
