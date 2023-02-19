import React, { useState, useEffect } from "react";
import * as PushAPI from "@pushprotocol/restapi";
import { useAccount, useSigner } from "wagmi";
import Push from "../assets/sponsors/push.png";
import NotificationCard from "../components/NotificationCard";

export default function Notifications() {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [notifTurnedOn, setNotifTurnedOn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchNotifs = async () => {
    const notifications = await PushAPI.user.getFeeds({
      user: "eip155:5:" + address, // user address in CAIP
      env: "staging",
      spam: true,
    });
    notifications.forEach((val) => {
      if (val.app === "Super Offers") {
        let position = val.message.search("Offer Id:");
        position = position + 10;
        let _notifications = [];
        let _content = val.message.split("\n");
        _notifications.push({
          offerId: val.message.substring(position),
          title: val.title,
          icon: val.icon,
          heading: _content[0],
          description: _content[1],
        });
        setNotifications(_notifications);
      }
    });
    console.log("Notifications: \n\n", notifications);
  };
  const optIn = async () => {
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:5:0x0429A2Da7884CA14E53142988D5845952fE4DF6a", // channel address in CAIP
      userAddress: "eip155:5:" + address, // user address in CAIP
      onSuccess: () => {
        console.log("opt in success");
        setNotifTurnedOn(true);
        fetchNotifs();
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  };
  const fetchSubs = async () => {
    const subscriptions = await PushAPI.user.getSubscriptions({
      user: "eip155:5:" + address,
      env: "staging",
    });
    console.log(subscriptions);
    subscriptions.forEach((val) => {
      if (
        val.channel.toLocaleLowerCase() ===
        "0x0429A2Da7884CA14E53142988D5845952fE4DF6a".toLocaleLowerCase()
      ) {
        setNotifTurnedOn(true);

        fetchNotifs();
      }
    });
  };

  return (
    <div className="max-w-[1400px]  mx-auto select-custom mt-12">
      <div className="flex justify-between mx-3 mb-12">
        <h1 className="text-3xl text-white font-semibold text-center">
          Notifications
        </h1>
        <div className="flex">
          <h1 className="text-md my-auto text-[#a9a9a9] font-semibold text-center">
            Powered by &nbsp;
          </h1>
          <img src={Push} width={35} height={35}></img>
          <h1 className="text-md my-auto text-[#a9a9a9] font-semibold text-center">
            Push Protocol
          </h1>
        </div>
      </div>

      {notifTurnedOn ? (
        notifications === [] ? (
          <h1 className="text-[#a9a9a9] text-2xl font-semibold my-[200px] text-center h-screen">
            No notifications 😶‍🌫️
          </h1>
        ) : (
          notifications.map((val, index) => {
            return <NotificationCard key={index} {...val} />;
          })
        )
      ) : (
        <div className="mt-[200px] h-screen w-full">
          <h1 className="text-[#a9a9a9]  text-xl font-semibold  text-center ">
            Subscribe to SuperOffers to get notifications
          </h1>
          <div className="flex justify-center">
            <button
              onClick={() => {
                optIn();
              }}
              className="mx-auto text-white bg-[#4cbb17] hover:text-black hover:font-bold hover:bg-white my-10 rounded-lg text-lg font-semibold w-auto px-9 py-3 text-center disabled:bg-[#A9A9A9] disabled:hover:text-white disabled:hover:font-semibold"
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
