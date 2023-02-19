import { useParams } from "react-router-dom";
import {
  GOERLI_SUPER_OFFERS_ABI,
  GOERLI_SUPER_OFFERS_ADDRESS,
} from "../utils/constants";
import {
  useContractRead,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";
import { useEffect } from "react";

export default function Offer() {
  let { id } = useParams();

  let data = {
    offerId: "3",
    title: "HODL 5 Link Tokens",
    description: "Hold Link to receive constant Passive Income",
    claimersCount: 0,
    balance: 10,
    lastUpdated: "1676797269",
  };

  const { address } = useAccount();
  const { data: signer } = useSigner();

  function calculateDifference() {
    return "1 mins ago";
    var today = new Date();
    var diffMs = today - data.lastUpdated * 1000;
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays > 0) return diffDays + " days ago";
    if (diffHrs > 0) return diffHrs + " hrs ago";
    if (diffMins > 0) return diffMins + " mins ago";
    return "now";
  }

  const { config: claimOfferConfig } = usePrepareContractWrite({
    address: GOERLI_SUPER_OFFERS_ADDRESS,
    abi: GOERLI_SUPER_OFFERS_ABI,
    functionName: "claimOffer",
    args: ["3"],
    onSuccess(data) {
      console.log(data);
    },
  });
  const { write: claimOffer, isSuccess: claimOfferSuccess } =
    useContractWrite(claimOfferConfig);
  useEffect(() => {
    if (claimOfferSuccess == true) {
      data.claimersCount = 1;
    }
  }, [claimOfferSuccess]);
  return (
    <div className="max-w-[1400px]  mx-auto select-custom mt-20 h-screen">
      <h1 className="text-3xl text-white font-semibold text-center">
        {data.title}
      </h1>
      <div className="py-5 px-3 my-10 border-2 border-[#616161b0] mb-3 bg-gradient-to-br from-black to-[#181818] rounded-2xl">
        <h2 className="font-semibold text-xl text-white text-center">
          OfferId&nbsp;➡️ &nbsp;
          <span className="text-green-400">{data.offerId}</span>
        </h2>
      </div>
      <p className="mt-3 mb-1 mr-4 font-semibold text-sm text-[#a9a9a9] text-center">
        Updated {calculateDifference()}
      </p>
      <h1 className="text-2xl ml-5 mt-9 text-[#a9a9a9] font-semibold  text-center">
        TODO
      </h1>
      <h1 className="text-lg ml-5 mt-3 mb-10 text-[#71797E] font-bold text-center ">
        {data.description}
      </h1>
      <div className="py-5 px-3 w-[25%] mx-auto border-2 border-[#616161b0] mb-3 bg-gradient-to-br from-black to-[#181818] rounded-2xl">
        <h2 className="font-semibold text-xl text-white text-center">
          Claimers&nbsp;&nbsp;👀 &nbsp;
          <span className="text-green-400">{data.claimersCount}</span>
          &nbsp;/&nbsp;5
        </h2>
      </div>
      <div className="py-5 px-3 w-[25%] mx-auto  border-2 border-[#616161b0] mt-3 bg-gradient-to-br from-black to-[#181818] rounded-2xl">
        <h2 className="font-semibold text-xl text-white text-center">
          Reward&nbsp;🪙
          <span className="text-green-400">{data.balance}</span> DAIx
        </h2>
      </div>
      <div className="flex justify-center">
        <button
          className="mt-16 mx-auto text-white bg-[#4cbb17] hover:text-black hover:font-bold hover:bg-white  rounded-lg text-lg font-semibold w-auto px-9 py-3 text-center disabled:bg-[#A9A9A9] disabled:hover:text-white disabled:hover:font-semibold"
          onClick={claimOffer}
        >
          Claim Offer
        </button>
      </div>
    </div>
  );
}
