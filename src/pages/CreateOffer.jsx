import { useState } from "react";

export default function CreateOffer() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [count, setCount] = useState(1);

  function Conditions() {
    const cond = [];
    for (let i = 0; i < count; i++) {
      cond.push(
        <div>
          <div className="mb-6">
            <label
              for={"contractAddress " + (i + 1)}
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              Contract Address {i + 1}
            </label>
            <input
              id={"contractAddress " + (i + 1)}
              type="text"
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for={"abi " + (i + 1)}
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              Contract ABI {i + 1}
            </label>
            <input
              id={"abi " + (i + 1)}
              type="file"
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
              required
            />
          </div>
        </div>
      );
    }
    return cond;
  }

  return (
    <div className="max-w-[1400px]  mx-auto select-custom mt-10">
      <h1 className="text-3xl text-white font-semibold text-center">
        Create Super Offer
      </h1>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <h1 className="text-3xl text-[#A9A9A9] font-semibold my-5 ">
        1 | Basic Information
      </h1>

      <form>
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
            className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
            required
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
            className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
            required
          />
        </div>

        <div className="flex justify-between mb-6">
          <div className="w-full mr-3">
            <label
              for="description"
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              Start Time
            </label>
            <input
              type={"datetime-local"}
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
              s
            ></input>
          </div>
          <div className="w-full ml-3">
            <label
              for="description"
              className="block mb-2 text-lg font-semibold text-[#71797E]"
            >
              End Time
            </label>
            <input
              type={"datetime-local"}
              className="border text-md rounded-lg  block w-full p-2.5 bg-gradient-to-r from-black to-[#181818] border-gray-800 placeholder-gray-400 text-[#A9A9A9] focus:ring-[#4cbb17] focus:border-[#4cbb17]"
              s
            ></input>
          </div>
        </div>
        <h1 className="text-3xl text-[#A9A9A9] font-semibold my-10 ">
          2 | Offer Conditions
        </h1>
        <div>
          <Conditions />
          <div className="flex justify-center">
            {count < 3 && (
              <button
                className="bg-[#4cbb17] rounded-full w-[50px] h-[50px] text-center  text-white font-bold text-2xl mx-2"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <p className="my-2">+</p>
              </button>
            )}
            {count > 1 && (
              <button
                className="bg-[#D22B2B] rounded-full w-[50px] h-[50px] text-center  text-white font-bold text-2xl mx-2"
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                <p className="my-2">-</p>
              </button>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-[#4cbb17] hover:bg-[#009E60]  font-medium rounded-lg text-md w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
