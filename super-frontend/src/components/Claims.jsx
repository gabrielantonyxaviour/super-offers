import React from "react";
import OfferCard from "./OfferCard";

import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { getAllClaimsOfUser } from "../utils/subgraphQueries";

export default function Claims() {
  const { address } = useAccount();
  const {
    loading,
    error,
    data: claims,
  } = useQuery(getAllClaimsOfUser(address));
  return (
    <div className="">
      <p className="mx-6 mt-10 mb-6 text-[#A9A9A9] font-bold text-3xl">
        Your Claims
      </p>
      {loading ? (
        <h1 className="text-3xl text-white font-semibold">Loading...</h1>
      ) : error ? (
        <h1 className="text-3xl text-white font-semibold">Error!</h1>
      ) : (
        claims.offers.map((val) => <OfferCard {...val} />)
      )}
    </div>
  );
}
