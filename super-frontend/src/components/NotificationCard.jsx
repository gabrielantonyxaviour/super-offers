import React from "react";
function goToOffer(offerId) {}
export default function NotificationCard({
  offerId,
  title,
  icon,
  heading,
  description,
}) {
  return (
    <div
      className=" pt-3 px-5 pb-1 my-4  rounded-xl text-[#A9A9A9] bg-gradient-to-br from-black to-[#181818]   hover:from-[#4cbb17] hover:-translate-y-1 hover:scale-105 cursor-pointer hover:text-white hover:to-[#235f07] delay-50 transition ease-in-out duration-500"
      onClick={goToOffer(offerId)}
    >
      <div className="flex justify-start my-6">
        <img src={icon} height={10}></img>
        <div className="w-[75%]  mr-2 ">
          <h1 className="ml-5 font-bold text-2xl my-2">{title}</h1>
          <h1 className="ml-5 font-bold text-2xl">{heading}</h1>
          <p className="ml-5 mt-2 font-semibold text-lg  ">{description}</p>
        </div>
        <div className="w-auto ml-2 flex flex-col justify-center">
          <div className="py-5 px-3  border-2 border-[#616161b0] mb-3 bg-gradient-to-br from-black to-[#181818] rounded-2xl">
            <h2 className="font-semibold text-xl text-white text-center">
              OfferId&nbsp;➡️ &nbsp;
              <span className="text-green-400">{offerId}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
