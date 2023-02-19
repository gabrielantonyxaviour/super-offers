import React from "react";
import OfferCard from "./OfferCard";

const data = [
  {
    offerId: "0",
    title: "Mint 3 RIOT NFTs",
    description: "You must own any 3 NFTs from RIOT collection ",
    claimersCount: 1,
    balance: 20,
    lastUpdated: "1676797269",
  },
  {
    offerId: "1",
    title: "HODL 10 DAI Tokens and 15 USDC Tokens",
    description: "Bring these tokens into your account for Passive Income",
    claimersCount: 3,
    balance: 100,
    lastUpdated: "1676797269",
  },
  {
    offerId: "2",
    title: "Own RIOT NFT #0",
    description: "Hold the most equisite and rare NFT for 250 DAIx!!",
    claimersCount: 0,
    balance: 250,
    lastUpdated: "1676797269",
  },
  {
    offerId: "3",
    title: "HODL Link",
    description:
      "Hold 5 Link Tokens to get 10 fDAIx streamed over a span of 10 days :)",
    claimersCount: 0,
    balance: 10,
    lastUpdated: "1676797269",
    isz: true,
  },
];
export default function LatestOffers() {
  return (
    <div className="">
      <p className="mx-6 mt-10 mb-6 text-[#A9A9A9] font-bold text-3xl">
        Latest Offers
      </p>
      {data.map((val) => (
        <OfferCard {...val} />
      ))}
    </div>
  );
}
