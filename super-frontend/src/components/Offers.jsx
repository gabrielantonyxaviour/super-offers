import React from "react";
import OfferCard from "./OfferCard";
const data = [
  {
    title: "HODL Link Tokens",
  },
];
export default function Offers() {
  return (
    <div className="">
      <p className="mx-6 mt-10 mb-6 text-[#A9A9A9] font-bold text-3xl">
        Your Offers
      </p>
      <p className="my-12 text-white font-semibold text-xl text-center">
        No Current Offers 🙂
      </p>
      {/* <OfferCard
        title="HODL Link"
        description="Hold Link to receive constant Passive Income"
        claimersCount={0}
        balance={100}
        lastUpdated="1676797269"
      />
      <OfferCard
        title="HODL Link"
        description="Hold Link to receive constant Passive Income"
        claimersCount={0}
        balance={100}
        lastUpdated="1676794304"
      />
      <OfferCard
        title="HODL Link"
        description="Hold Link to receive constant Passive Income"
        claimersCount={0}
        balance={100}
        lastUpdated="1676794304"
      />
      <OfferCard
        title="HODL Link"
        description="Hold Link to receive constant Passive Income"
        claimersCount={0}
        balance={100}
        lastUpdated="1676794304"
      />
      <OfferCard
        title="HODL Link"
        description="Hold Link to receive constant Passive Income"
        claimersCount={0}
        balance={100}
        lastUpdated="1676794304"
      /> */}
    </div>
  );
}
