import React from "react";
import Claims from "../components/Claims";
import Offers from "../components/Offers";
import SuperDAI from "../components/SuperDAI";

export default function YourOffers() {
  return (
    <div className="text-white max-w-[1400px] mx-auto select-custom min-h-screen">
      <div className="flex justify-between mt-8 ">
        <div className="w-[72%]">
          <Offers />
          <Claims />
        </div>
        <div className="w-[24%]">
          <SuperDAI />
        </div>
      </div>
    </div>
  );
}
