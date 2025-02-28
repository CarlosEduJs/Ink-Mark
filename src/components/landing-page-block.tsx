"use client";

import Features from "./features";
import Hero from "./hero";
import Technologies from "./technologies";

export default function LandingPageBlock() {
  return (
    <div className="flex flex-col gap-20 min-h-screen">
      <Hero />
      <Features />
      <Technologies />
    </div>
  );
}
