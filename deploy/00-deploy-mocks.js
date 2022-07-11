const { developmentChains } = require("../helper-hardhat-config.js");

const BASE_FEE = ethers.utils.parseEther("0.25"); // 0.25 is the premium LINK for request.
const GAS_PRICE_LINK = 1e9; // Calculated value based on gas price of chain.

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [BASE_FEE, GAS_PRICE_LINK];

    if (developmentChains.includes(network.name)) {
        log("Local network chain detected! Deploying m o c k s ...");
        // deploy mock vrfcoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        });
        log("Mocks Deployed");
        log("------------------------------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];
