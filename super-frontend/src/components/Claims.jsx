import React from "react";
import OfferCard from "./OfferCard";
const data = [
  {
    title: "HODL Link Tokens",
  },
];
export default function Claims() {
  return (
    <div className="">
      <p className="mx-6 mt-10 mb-6 text-[#A9A9A9] font-bold text-3xl">
        Your Claims
      </p>
      <OfferCard
        title="HODL Link"
        description="Hold 5 Link Tokens to get 10 fDAIx streamed over a span of 10 days :)"
        claimersCount={1}
        balance={10}
        lastUpdated="1676797269"
        isz="true"
      />
    </div>
  );
}
