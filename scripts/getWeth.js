const { getNamedAccounts, ethers, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let blocksToMine = chainId == 31337 ? 1 : 3
    const iweth = await ethers.getContractAt("IWeth", networkConfig[chainId].wethToken, deployer)
    const tx = await iweth.deposit({ value: AMOUNT })
    await tx.wait(blocksToMine)
    const wethBalance = await iweth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
