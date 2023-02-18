const { network, ethers } = require("hardhat")
const { FDAIX_CONTRACT_ADDRESS } = require("../utils/constants")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// const FUND_AMOUNT = ethers.utils.parseEther("1") // 1 Ether, or 1e18 (10^18) Wei

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const args = [FDAIX_CONTRACT_ADDRESS]
    const superOffers = await deploy("SuperOffers", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(superOffers.address, args)
    }

    log("Create SuperOffer with command:")
    const networkName = network.name == "hardhat" ? "localhost" : network.name
    log(`yarn hardhat run scripts/create-offer.js --network ${networkName}`)
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "superoffer"]
