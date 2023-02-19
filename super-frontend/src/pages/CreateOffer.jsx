import { useState } from "react";
import { BigNumber, utils } from "ethers";
import {
  useContractRead,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";
import {
  GOERLI_SUPER_OFFERS_ADDRESS,
  GOERLI_SUPER_OFFERS_ABI,
  GOERLI_SUPER_DAI_ADDRESS,
  GOERLI_SUPER_DAI_ABI,
} from "../utils/constants";
import * as PushAPI from "@pushprotocol/restapi";

export default function CreateOffer() {
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("0");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [contract1, setContract1] = useState("");
  const [contract2, setContract2] = useState("");
  const [function1, setFunction1] = useState("");
  const [function2, setFunction2] = useState("");
  const [expected1, setExpected1] = useState("");
  const [expected2, setExpected2] = useState("");
  const [outType1, setOutType1] = useState("");
  const [outType2, setOutType2] = useState("");
  const [args, setArgs] = useState([]);
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
  const { config: approveDaixConfig } = usePrepareContractWrite({
    address: GOERLI_SUPER_DAI_ADDRESS,
    abi: GOERLI_SUPER_DAI_ABI,
    functionName: "approve",
    args: [
      GOERLI_SUPER_OFFERS_ADDRESS,
      utils.parseEther(amount.toString()).toString(),
    ],
  });
  const { write: callApproveDaix, isSuccess: approveDaixIsSuccess } =
    useContractWrite(approveDaixConfig);

  const { config: createOfferConfig } = usePrepareContractWrite({
    address: GOERLI_SUPER_OFFERS_ADDRESS,
    abi: GOERLI_SUPER_OFFERS_ABI,
    functionName: "createOffer",
    args,
    onError(err) {
      console.log(err.message);
    },
  });
  const { write: callCreateOffer, isSuccess: createOfferIsSuccess } =
    useContractWrite(createOfferConfig);

  const fetchNotifs = async () => {
    const notifications = await PushAPI.user.getFeeds({
      user: "eip155:5:" + address, // user address in CAIP
      env: "staging",
      spam: true,
    });

    console.log("Notifications: \n\n", notifications);
  };
  

  return (
    <div className="max-w-[1400px]  mx-auto select-custom mt-10">
      
      <h1 className="text-3xl text-white font-semibold text-center">
        Create Super Offer
      </h1>
      <p className="text-xl text-[#A9A9A9] font-semibold text-center mt-8">
        Balance
      </p>
      <p className="text-xl font-semibold text-center text-[#71797E] mt-2">
        {daixBalanceIsError
          ? "⚠️"
          : daixBalanceIsLoading
          ? "..."
          : daixBalanceIsSuccess
          ? parseFloat(utils.formatEther(daixBalance.toString())).toFixed(2)
          : 0.0}{" "}
        DAIx
      </p>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <form>
        <h1 className="text-3xl text-[#A9A9A9] font-semibold my-5 ">
          1 | Basic Information
        </h1>
        <div className="mb-6">
          <label
            for="name"
            className="block mb-2 text-lg font-semibold text-[#71797E]"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
          />
        </div>
        <div className="mb-6">
          <label
            for="description"
            className="block mb-2 text-lg font-semibold text-[#71797E]"
          >
            Short description
          </label>
          <input
            id="description"
            type="text"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            required
            className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
          />
        </div>

        <div className="flex justify-between mb-6">
          <div className="w-full mr-3">
            <label
              for="amount"
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              Amount (in Daix)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
              required
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
            />
          </div>
          <div className="w-full mx-3">
            <label
              for="startTime"
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              Start Time
            </label>
            <input
              id="startTime"
              type={"datetime-local"}
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                console.log(new Date(e.target.value).getTime());
              }}
              required
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
            ></input>
          </div>
          <div className="w-full ml-3">
            <label
              for="endTime"
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              End Time
            </label>
            <input
              id="endTime"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
              }}
              required
              type={"datetime-local"}
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
            ></input>
          </div>
        </div>

        <h1 className="text-3xl text-[#A9A9A9] font-semibold my-10 ">
          2 | Offer Conditions
        </h1>
        <div>
          <div className="mb-6">
            <label
              for={"contractAddress1"}
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              Contract Address 1
            </label>
            <input
              id={"contractAddress1"}
              value={contract1}
              type="text"
              onChange={(e) => {
                setContract1(e.target.value);
              }}
              required
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
            />
          </div>

          <div className="mb-6 flex justify-between">
            <div>
              <label
                for="function1"
                className="block mb-2 text-lg font-semibold text-[#71797E]"
              >
                Function signature 1
              </label>
              <input
                id={"function1"}
                className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
                value={function1}
                type="text"
                required
                onChange={(e) => setFunction1(e.target.value)}
              />
            </div>
            <div>
              <label
                for="outType1"
                className="block mb-2 text-lg font-semibold text-[#71797E]"
              >
                Output Type 1
              </label>
              <input
                id={"outType1"}
                className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
                value={outType1}
                type="text"
                required
                onChange={(e) => setOutType1(e.target.value)}
              />
            </div>
            <div>
              <label
                for="expected 1"
                className="block mb-2 text-lg font-semibold text-[#71797E]"
              >
                Expected output 1
              </label>
              <input
                id={"expected1"}
                className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
                value={expected1}
                type="text"
                required
                onChange={(e) => setExpected1(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mb-6">
            <label
              for={"contractAddress2"}
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              Contract Address 2
            </label>
            <input
              id={"contractAddress2"}
              value={contract2}
              type="text"
              onChange={(e) => {
                setContract2(e.target.value);
              }}
              disabled={
                contract1 === "" ||
                expected1 === "" ||
                function1 === "" ||
                outType1 == ""
              }
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] disabled:from-gray-600 disabled:to-gray-400 focus:border-[#4cbb17]"
            />
          </div>

          <div className="mb-6 flex justify-between">
            <div>
              <label
                for="function2"
                className="block mb-2 text-lg font-semibold text-[#71797E]"
              >
                Function signature 2
              </label>
              <input
                id={"function2"}
                className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] disabled:from-gray-600 disabled:to-gray-400 focus:border-[#4cbb17]"
                value={function2}
                type="text"
                onChange={(e) => setFunction2(e.target.value)}
                disabled={
                  contract1 === "" ||
                  expected1 === "" ||
                  function1 === "" ||
                  outType1 == ""
                }
              />
            </div>
            <div>
              <label
                for="outType2"
                className="block mb-2 text-lg font-semibold text-[#71797E]"
              >
                Output Type 2
              </label>
              <input
                id={"outType2"}
                className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] disabled:from-gray-600 disabled:to-gray-400 focus:border-[#4cbb17]"
                value={outType2}
                type="text"
                onChange={(e) => setOutType2(e.target.value)}
                disabled={
                  contract1 === "" ||
                  expected1 === "" ||
                  function1 === "" ||
                  outType1 == ""
                }
              />
            </div>
            <div>
              <label
                for="expected2"
                className="block mb-2 text-lg font-semibold text-[#71797E]"
              >
                Expected Output 2
              </label>
              <input
                id={"expected2"}
                className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] disabled:from-gray-600 disabled:to-gray-400 focus:border-[#4cbb17]"
                value={expected2}
                type="text"
                onChange={(e) => setExpected2(e.target.value)}
                disabled={
                  contract1 === "" ||
                  expected1 === "" ||
                  function1 === "" ||
                  outType1 == ""
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            onClick={(e) => {
              e.preventDefault();
              callApproveDaix();
            }}
            className=" text-white bg-[#E4D00A] hover:text-black hover:font-bold hover:bg-white my-10 rounded-lg text-lg font-semibold w-auto px-9 py-3 text-center"
          >
            Approve DAIx
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              let _args = [];
              if (
                contract2 !== "" &&
                expected2 !== "" &&
                function2 !== "" &&
                outType2 !== ""
              ) {
                const selector1 = utils
                  .keccak256(utils.toUtf8Bytes(function1))
                  .slice(0, 10);
                const selector2 = utils
                  .keccak256(utils.toUtf8Bytes(function2))
                  .slice(0, 10);
                _args = [
                  name,
                  [contract1, contract2],
                  [selector1, selector2],
                  [
                    utils.hexZeroPad(
                      BigNumber.from(expected1).toHexString(),
                      32
                    ),
                    utils.hexZeroPad(
                      BigNumber.from(expected2).toHexString(),
                      32
                    ),
                  ],
                  utils.parseEther(amount.toString()).toString(),
                  new Date(start).getTime() / 1000,
                  new Date(end).getTime() / 1000,
                  desc,
                ];
                setArgs(_args);
              } else {
                const selector1 = utils
                  .keccak256(utils.toUtf8Bytes(function1))
                  .slice(0, 10);
                _args = [
                  name,
                  [contract1],
                  [selector1],
                  [
                    utils.hexZeroPad(
                      BigNumber.from(expected1).toHexString(),
                      32
                    ),
                  ],
                  utils.parseEther(amount.toString()).toString(),
                  new Date(start).getTime() / 1000,
                  new Date(end).getTime() / 1000,
                  desc,
                ];
                setArgs(_args);
              }
              console.log(args);
              callCreateOffer();
            }}
            className="ml-5 text-white bg-[#4cbb17] hover:text-black hover:font-bold hover:bg-white my-10 rounded-lg text-lg font-semibold w-auto px-9 py-3 text-center disabled:bg-[#A9A9A9] disabled:hover:text-white disabled:hover:font-semibold"
            // disabled={!approveDaixIsSuccess}
          >
            Create Offer
          </button>
        </div>
      </form>
    </div>
  );
}
