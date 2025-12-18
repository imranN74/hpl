"use client";

import { useState } from "react";
import { loginAction } from "../actions/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      setLoading(true);

      const res = await loginAction(payload);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      if (res.accountType === "USER") {
        if (res?.user?.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/auctioneer";
        }
      }

      if (res.accountType === "OWNER") {
        window.location.href = "/owner";
      }
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#071A2E] via-[#0b2c4d] to-[#071A2E] px-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border-none rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="text-4xl">🏏</div>
          <CardTitle className="text-3xl font-extrabold text-[#0f766e] tracking-wide">
            Hurlung Premier League
          </CardTitle>
          <p className="text-sm text-muted-foreground">Official Login Portal</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              required
              className="focus-visible:ring-[#0f766e]"
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="focus-visible:ring-[#0f766e]"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f766e] hover:bg-[#115e59] text-white font-semibold text-base tracking-wide shadow-md"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>

            <div className="text-center text-xs text-gray-500 pt-2">
              © {new Date().getFullYear()} HPL • All rights reserved
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
