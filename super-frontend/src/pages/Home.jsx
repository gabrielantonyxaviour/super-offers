import React from "react";
import HomeHero from "../components/HomeHero";
import SuperDAI from "../components/SuperDAI";
export default function Home() {
  return (
    <div className="text-white max-w-[1400px] mx-auto select-custom min-h-screen">
      <div className="flex justify-between">
        <div className="w-[72%]  bg-gradient-to-br rounded-xl from-black to-[#181818]">
          <HomeHero />
        </div>
        <SuperDAI />
      </div>
    </div>
  );
}
