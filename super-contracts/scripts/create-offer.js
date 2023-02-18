const { ethers, network } = require("hardhat")
const { FDAIX_CONTRACT_ADDRESS, FDAIX_ABI } = require("../utils/constants.js")

async function createOffer(name, addresses, resolvers, expected, amount, description) {
    const superOffer = await ethers.getContract("SuperOffers")
    const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)
    const fdaix = await ethers.Contract(FDAIX_CONTRACT_ADDRESS, FDAIX_ABI, wallet)
    // const blockNum = await ethers.provider.getBlockNumber()
    // const block = await ethers.provider.getBlock(blockNum)
    // const timestamp = block.timestamp + 250
    // await fdaix.approve(superOffer.address, amount)
    // await superOffer.createOffer(
    //     name,
    //     addresses,
    //     resolvers,
    //     expected,
    //     amount,
    //     timestamp,
    //     timestamp + 1000,
    //     description
    // )
    // console.log("Offer Created!")
}

createOffer(
    "HODL Link",
    ["0x326C977E6efc84E512bB9C30f76E30c160eD06FB"],
    ["0x70a08231"],
    ["0x0000000000000000000000000000000000000000000000004563918244f40000"],
    "1000000000000000000",
    "Hello"
)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
