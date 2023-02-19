import React from "react";
import HomeHero from "../components/HomeHero";
import SuperDAI from "../components/SuperDAI";
import LatestOffers from "../components/LatestOffers";

export default function Home() {
  return (
    <div className="text-white max-w-[1400px] mx-auto select-custom min-h-screen">
      <div className="flex justify-between mt-8 ">
        <div className="w-[72%]">
          <HomeHero />
          {/* <hr className="h-px opacity-30 my-8 mx-2 bg-gray-200 border-0 dark:bg-[#848884]"></hr> */}
          <LatestOffers />
        </div>
        <div className="w-[24%]">
          <SuperDAI />
        </div>
      </div>
    </div>
  );
}
