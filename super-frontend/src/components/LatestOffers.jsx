import React from "react";
import OfferCard from "./OfferCard";
import { getLatestOffers } from "../utils/subgraphQueries";
import { useQuery } from "@apollo/client";
export default function LatestOffers() {
  const { loading, error, data: latestOffers } = useQuery(getLatestOffers());
  return (
    <div className="">
      <p className="mx-6 mt-10 mb-6 text-[#A9A9A9] font-bold text-3xl">
        Latest Offers
      </p>
      {loading ? (
        <h1 className="text-3xl text-white font-semibold">Loading...</h1>
      ) : error ? (
        <h1 className="text-3xl text-white font-semibold">Error!</h1>
      ) : (
        latestOffers.offers.map((val) => <OfferCard {...val} />)
      )}
    </div>
  );
}
