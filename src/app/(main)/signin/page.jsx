"use client";

import { FaGoogle } from "react-icons/fa";

import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    console.log(data);

    if (data) {
      alert("login successfull");
      redirect("/");
    } else if (error) {
      alert(error.message);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* ── Card ── */}
      <div
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          background: "rgba(16, 16, 26, 0.80)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(120,90,255,0.08)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
          style={{
            width: "60%",
            background:
              "linear-gradient(90deg, transparent, rgba(130,100,255,0.7), transparent)",
          }}
        />

        <div className="px-8 pt-8 pb-8">
          {/* Heading */}
          <div className="mb-6">
            <h1
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Welcome Back
            </h1>
            <p className="text-sm text-white/40">
              Enter Your Credentials To Login
            </p>
          </div>

          {/* Social buttons */}
          <div className=" mb-5">
            <Button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white/70 hover:text-white transition-all w-full bg-[#ffffff0a] boder border-[#ffffff17]">
              <FaGoogle size={14} />
              <span>Google</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            <span className="text-xs text-white/25">
              or register with email
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>

          {/* Form */}
          <Form onSubmit={handleSignUp} className="flex w-96 flex-col gap-6">
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Input
                placeholder="john@example.com"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  caretColor: "#7c5cfc",
                }}
                className="focus:ring-[#7c5cfc99]"
              />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Input
                placeholder="Enter your password"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  caretColor: "#7c5cfc",
                }}
                className="focus:ring-[#7c5cfc99]"
              />

              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all mt-5 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #7c5cfc 0%, #4f3ab7 100%)",
                boxShadow: "0 4px 24px rgba(124,92,252,0.35)",
              }}
            >
              Log In
            </Button>
          </Form>

          {/* Login link */}
          <p className="text-center text-xs text-white/35 mt-5">
            Already have an account?{" "}
            <Link
              href="/register"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px"
          style={{
            width: "40%",
            background:
              "linear-gradient(90deg, transparent, rgba(130,100,255,0.4), transparent)",
          }}
        />
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </main>
  );
}
