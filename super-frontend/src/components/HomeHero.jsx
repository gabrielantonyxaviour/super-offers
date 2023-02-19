import React from "react";
import { useAccount, useEnsName } from "wagmi";
export default function HomeHero() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  return (
    <div className=" p-6 bg-gradient-to-br rounded-xl from-black to-[#181818]">
      <div className="">
        <h1 className="text-[#A9A9A9] font-semibold text-xl">Hey there, </h1>
        <h3 className="text-[#71797E] font-bold text-2xl">
          {ensName ? ensName : address}
        </h3>
        <h3 className="text-[#71797E] font-bold mt-11 text-xl">
          Complete fun quests and a earn{" "}
          <span className="text-[#4cbb17]">stable</span> passive income 🪙
        </h3>
        <h3 className="text-[#71797E] font-bold  text-xl">
          Easy money, eh? 😏
        </h3>
      </div>
    </div>
  );
}
