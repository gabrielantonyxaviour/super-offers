const { ethers, network } = require("hardhat")
async function claimOffer(offerId) {
    const superOffer = await ethers.getContract(
        "SuperOffers",
        ethers.provider.getSigner(network.config.accounts[1])
    )

    const out = await superOffer.claimOffer(offerId)
    console.log(out)
}

claimOffer(0)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
