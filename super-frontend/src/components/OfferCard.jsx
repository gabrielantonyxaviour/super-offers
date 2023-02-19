import React from "react";
function goToOffer(offerId) {}
export default function OfferCard({
  offerId,
  title,
  description,
  claimersCount,
  balance,
  lastUpdated,
}) {
  function calculateDifference() {
    var today = new Date();
    var diffMs = today - lastUpdated * 1000;
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays > 0) return diffDays + " days ago";
    if (diffHrs > 0) return diffHrs + " hrs ago";
    if (diffMins > 0) return diffMins + " mins ago";
    return "now";
  }
  return (
    <div
      className=" pt-5 px-5 pb-1 my-4  rounded-xl text-[#A9A9A9] bg-gradient-to-br from-black to-[#181818] w-full  hover:from-[#4cbb17] hover:-translate-y-1 hover:scale-105 cursor-pointer hover:text-white hover:to-[#235f07] delay-50 transition ease-in-out duration-500"
      onClick={goToOffer(offerId)}
    >
      <div className="flex">
        <div className="w-[75%] mt-3 mr-2 ">
          <h1 className="ml-5 font-bold text-2xl">{title}</h1>
          <p className="ml-5 mt-2 font-semibold text-lg  ">{description}</p>
        </div>
        <div className="w-auto ml-2">
          <div className="py-5 px-3  border-2 border-[#616161b0] mb-3 bg-gradient-to-br from-black to-[#181818] rounded-2xl">
            <h2 className="font-semibold text-xl text-white">
              Claimers&nbsp;&nbsp;👀 &nbsp;
              <span className="text-green-400">{claimersCount}</span>
              &nbsp;/&nbsp;5
            </h2>
          </div>
          <div className="py-5 px-3  border-2 border-[#616161b0] mt-3 bg-gradient-to-br from-black to-[#181818] rounded-2xl">
            <h2 className="font-semibold text-xl text-white">
              Reward&nbsp;🪙
              <span className="text-green-400">{balance}</span> DAIx
            </h2>
          </div>
        </div>
      </div>
      <p className="mt-3 mb-1 mr-4 font-semibold text-xs text-right">
        Updated {calculateDifference()}
      </p>
    </div>
  );
}
