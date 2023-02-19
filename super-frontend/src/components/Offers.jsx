import React from "react";
import OfferCard from "./OfferCard";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { getAllOffersOfUser } from "../utils/subgraphQueries";

export default function Offers() {
  const { address } = useAccount();
  const {
    loading,
    error,
    data: offers,
  } = useQuery(getAllOffersOfUser(address));
  return (
    <div className="">
      <p className="mx-6 mt-10 mb-6 text-[#A9A9A9] font-bold text-3xl">
        Your Offers
      </p>
      {loading ? (
        <h1 className="text-3xl text-white font-semibold">Loading...</h1>
      ) : error ? (
        <h1 className="text-3xl text-white font-semibold">Error!</h1>
      ) : (
        offers.offers.map((val) => <OfferCard {...val} />)
      )}
    </div>
  );
}
