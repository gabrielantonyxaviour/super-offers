import React from "react";
import HomeHero from "../components/HomeHero";
import SuperDAI from "../components/SuperDAI";
import LatestOffers from "../components/LatestOffers";
export default function Home() {
  return (
    <div className="text-white max-w-[1400px] mx-auto select-custom min-h-screen">
      <div className="flex justify-between mt-8 h-screen">
        <div className="w-[72%]">
          <HomeHero />
          <LatestOffers />
        </div>
        <div className="w-[24%]">
          <SuperDAI />
          {/* <InAndOutFlow /> */}
        </div>
      </div>
    </div>
  );
}
