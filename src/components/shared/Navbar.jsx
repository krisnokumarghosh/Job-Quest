"use client";

import Link from "next/link";
import { useState } from "react";
import { BriefcaseFill } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(session);

  const handleSignOut = async () => {
     await authClient.signOut();
     redirect("/")
  }

  return (
    <nav className="w-full  pt-6 mb-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="leading-tight flex items-center gap-2">
              <div className="border p-2 rounded-xl bg-white">
                <BriefcaseFill fontSize="" className="text-violet-500" />
              </div>
              <div>
                <span className={` text-white text-[25px]  tracking-wide`}>
                  Job
                </span>
                <span className={` text-violet-500 text-[25px] font-semibold `}>
                  Quest
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links + Actions */}
          <div className="hidden md:flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-white bg-white/5 backdrop-blur-sm  rounded-xl transition-colors duration-150">
            <Link
              href="/jobs"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-150"
            >
              Browse Jobs
            </Link>
            <Link
              href="/company"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-150"
            >
              Company
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-150"
            >
              Pricing
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-2" />

            {isPending ? (
              <span>Loading...</span>
            ) : user ? (
              <div className="flex items-center">
                <p>Hi, {user?.name}!</p>
              <Button onClick={handleSignOut} className="px-3 py-2.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors rounded-lg bg-transparent">
                Log Out
              </Button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-3 py-2.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors rounded-lg"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/get-started"
              className="ml-1 px-5 py-2 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-150"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0f0f13]">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link
              href="/jobs"
              className="px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              href="/company"
              className="px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Company
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Pricing
            </Link>

            <div className=" bg-white/10 my-1" />

            {isPending ? (
              <span>Loadinf...</span>
            ) : user ? (
              <Button onClick={handleSignOut} className="px-3 py-2.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors rounded-lg bg-transparent">
                Log Out
              </Button>
            ) : (
              <Link
                href="/signin"
                className="px-3 py-2.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors rounded-lg"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/get-started"
              className="mt-1 px-3 py-2.5 text-sm font-semibold text-center text-gray-900 bg-white hover:bg-gray-100 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
