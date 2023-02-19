import { Link } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ETHLogo from "../assets/ethlogo.png";
export default function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const NavElement = ({ to, label, isSmall = false }) => {
    return (
      <li className=" px-5 text-lg font-semibold text-[#A9A9A9] hover:text-white">
        <Link
          className="select-none"
          to={to}
          onClick={() => {
            if (isSmall) setNav(!nav);
          }}
        >
          {label}
        </Link>
      </li>
    );
  };
  return (
    <div className="p-4 my-4 py-6 flex justify-between items-center max-w-[1400px] bg-gradient-to-r from-black to-[#181818] mx-auto rounded-lg">
      <div className="flex ">
        <img src={ETHLogo} width={35} height={35} className="select-none"></img>
        <h1 className=" pl-3 text-lg  md:text-2xl font-bold text-[#4CBB17] select-none hover:text-white cursor-pointer ease-in-out duration-500">
          <Link
            className="select-none   text-sm sm:text-base lg:text-xl "
            to="/"
          >
            Super Offers
          </Link>
        </h1>
      </div>

      <ul className="hidden lg:flex select-none ">
        <NavElement to="/" label="Home" />
        <NavElement to="/create" label="Create" />
        <NavElement to="/youroffers" label="Your offers" />
        <NavElement to="/notifications" label="Notifications" />
      </ul>
      <ConnectButton />
      <div className="block lg:hidden">
        {nav ? (
          <AiOutlineClose
            className="text-white"
            size={20}
            onClick={handleNav}
          />
        ) : (
          <AiOutlineMenu className="text-white" size={20} onClick={handleNav} />
        )}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%] top-0 w-[60%] h-full ease-in-out duration-500"
        }
      >
        <h1 className="w-full text-2xl font-bold text-[#4CBB17] m-4 hover:text-white cursor-default ease-in-out duration-500">
          <Link
            className="select-none   text-sm sm:text-base lg:text-xl "
            to="/"
          >
            Super Offers
          </Link>
        </h1>

        <ul className="p-5 uppercase text-xs sm:text-base">
          <NavElement to="/" label="Home" isSmall={true} />
          <NavElement to="/create" label="Create" isSmall={true} />
          <NavElement to="/youroffers" label="Your offers" isSmall={true} />
          <NavElement
            to="/notifications"
            label="Notifications"
            isSmall={true}
          />
        </ul>
      </div>
    </div>
  );
}
