const { ethers } = require("hardhat")

async function getOffer(offerId) {
    const superOffer = await ethers.getContract("SuperOffers")
    const out = await superOffer.getSuperOffer(offerId)
    console.log(out.flow.updatedFlowRate.toString())
}

getOffer(0)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
