import React, { useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { ethers } from "ethers";
import {
  GOERLI_DAI_ADDRESS,
  GOERLI_SUPER_DAI_ADDRESS,
  GOERLI_DAI_ABI,
  GOERLI_SUPER_DAI_ABI,
} from "../utils/constants";
import Dai from "../assets/sponsors/dai.png";
import DaiX from "../assets/sponsors/daix.png";
export default function SuperDAI() {
  const { address } = useAccount();
  const {
    data: daiBalance,
    isError: daiBalanceIsError,
    isLoading: daiBalanceIsLoading,
    isSuccess: daiBalanceIsSuccess,
  } = useContractRead({
    address: GOERLI_DAI_ADDRESS,
    abi: GOERLI_DAI_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: daixBalance,
    isError: daixBalanceIsError,
    isLoading: daixBalanceIsLoading,
    isSuccess: daixBalanceIsSuccess,
  } = useContractRead({
    address: GOERLI_SUPER_DAI_ADDRESS,
    abi: GOERLI_SUPER_DAI_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div className="w-full flex flex-col h-[250px] justify-center pb-2 bg-gradient-to-br rounded-xl from-black to-[#181818]">
      <h1 className="font-semibold text-lg text-[#A9A9A9] text-center my-6">
        Your balance
      </h1>
      <div className="flex justify-center mb-6">
        <img src={Dai} width={50} height={50} className="select-none"></img>
        <p className="text-[#71797E] text-3xl font-bold h-[30px] my-auto ml-6">
          {daiBalanceIsError
            ? "⚠️"
            : daiBalanceIsLoading
            ? "..."
            : daiBalanceIsSuccess
            ? parseFloat(
                ethers.utils.formatEther(daiBalance.toString())
              ).toFixed(2)
            : 0.0}
        </p>
        <p className="text-[#71797E] text-2xl font-bold h-[20px] my-auto ml-3">
          DAI
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <img
          src={DaiX}
          width={50}
          height={50}
          className="select-none rounded-full ml-4"
        ></img>
        <p className="text-[#71797E] text-3xl font-bold h-[30px] my-auto ml-6">
          {daixBalanceIsError
            ? "⚠️"
            : daixBalanceIsLoading
            ? "..."
            : daixBalanceIsSuccess
            ? parseFloat(
                ethers.utils.formatEther(daixBalance.toString())
              ).toFixed(2)
            : 0.0}
        </p>
        <p className="text-[#71797E] text-2xl font-bold h-[20px] my-auto ml-3">
          DAIx
        </p>
      </div>
    </div>
  );
}
