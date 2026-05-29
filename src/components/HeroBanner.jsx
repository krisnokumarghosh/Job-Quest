"use client";

import { useState } from "react";
// import { Search } from "lucide-react";
import { FaBriefcase, FaMapMarkerAlt, FaStar, FaUser } from "react-icons/fa";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import AnimatedNumber from "./Animations/AnimatedNumber";
import NumberTicker from "./Animations/NumberTicker";

const stats = [
  { icon: <FaBriefcase />, value: "50K", label: "Active Jobs" },
  { icon: <TbBuildingSkyscraper />, value: "12K", label: "Companies" },
  { icon: <FaUser />, value: "2M", label: "Job Seekers" },
  { icon: <FaStar />, value: "97%", label: "Satisfaction Rate" },
];

const trendingTags = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function HeroBanner() {
  const [jobQuery, setJobQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: "700px", height: "700px" }}
      >
        {/* Outer ambient glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(99,70,255,0.35) 0%, rgba(60,40,180,0.18) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Globe sphere */}
        <div
          className="absolute"
          style={{
            bottom: "-70px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 38% 32%, rgba(130,100,255,0.5) 0%, rgba(60,40,180,0.6) 30%, rgba(20,15,70,0.95) 70%, #0a0a0f 100%)",
            boxShadow:
              "0 0 80px 20px rgba(99,70,255,0.25), inset 0 0 60px rgba(150,120,255,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Globe grid lines - latitude */}
          {[15, 30, 45, 60, 75].map((pct) => (
            <div
              key={pct}
              className="absolute w-full"
              style={{
                top: `${pct}%`,
                height: "1px",
                background: "rgba(150,120,255,0.12)",
              }}
            />
          ))}
          {/* Globe grid lines - longitude (curved illusion) */}
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((pct) => (
            <div
              key={pct}
              className="absolute h-full"
              style={{
                left: `${pct}%`,
                width: "1px",
                background: "rgba(150,120,255,0.08)",
              }}
            />
          ))}
          {/* Continent blobs */}
          <svg
            viewBox="0 0 520 520"
            className="absolute inset-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="180"
              cy="180"
              rx="70"
              ry="50"
              fill="rgba(180,160,255,0.4)"
            />
            <ellipse
              cx="290"
              cy="200"
              rx="55"
              ry="40"
              fill="rgba(180,160,255,0.35)"
            />
            <ellipse
              cx="340"
              cy="280"
              rx="40"
              ry="60"
              fill="rgba(180,160,255,0.3)"
            />
            <ellipse
              cx="160"
              cy="300"
              rx="50"
              ry="35"
              fill="rgba(180,160,255,0.25)"
            />
            <ellipse
              cx="240"
              cy="350"
              rx="30"
              ry="20"
              fill="rgba(180,160,255,0.2)"
            />
          </svg>
          {/* Highlight shimmer */}
          <div
            className="absolute"
            style={{
              top: "8%",
              left: "20%",
              width: "35%",
              height: "30%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(220,210,255,0.18) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        </div>
        {/* Bottom horizon glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background:
              "linear-gradient(to top, rgba(80,50,200,0.3), transparent)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-10">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-6">
          <span className="text-base">🏅</span>
          <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
           <NumberTicker value="50000"/> + New Jobs This Month
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center leading-tight mb-4"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            letterSpacing: "-0.02em",
          }}
        >
          Find Your Dream Job Today
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base text-white/50 text-center max-w-md mb-8 leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row w-full max-w-2xl bg-[#16161f] border border-white/10 rounded-xl overflow-hidden shadow-xl mb-4">
          <div className="flex items-center flex-1 px-4 py-3 gap-2 border-b sm:border-b-0 sm:border-r border-white/10">
            <IoSearchSharp size={16} className="text-white/30 shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full"
            />
          </div>
          <div className="flex items-center flex-1 px-4 py-3 gap-2">
            <FaMapMarkerAlt size={16} className="text-white/30 shrink-0" />
            <input
              type="text"
              placeholder="Location or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full"
            />
          </div>
          <button className="m-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition-colors rounded-lg flex items-center justify-center shrink-0">
            <IoSearchSharp size={16} className="text-white" />
          </button>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-0 justify-center">
          <span className="text-xs text-white/40">Trending Position</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stats overlay text on globe */}
      <div className="relative z-10  sm:mt-24 text-center px-4">
        <p className="text-white/70 text-base mt-20 sm:text-lg leading-relaxed">
          Assisting over{" "}
          <span className="text-white font-bold"><AnimatedNumber value={15000}/> job seekers</span>
          <br />
          find their dream positions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 w-full max-w-3xl px-4 mt-15 pb-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span size={16} className="text-white/60">
                {Icon}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-white/40 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Twinkle animation */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
