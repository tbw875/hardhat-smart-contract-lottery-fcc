const { assert } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {
          let raffle, vrfCoordinatorV2Mock;
          const chainId = network.config.chainid;

          beforeEach(async function () {
              const { deployer } = await getNamedAccounts();
              await deployments.fixture(["all"]);
              raffle = await ethers.getContract("Raffle", deployer);
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer);
          });

          describe("constructor", async function () {
              it("initializes the raffle directly", async function () {
                  //ideall we make our tests one assert per it
                  const raffleState = await raffle.getRaffleState();
                  assert.equal(raffleState.toString(), "0");
                  const interval = await raffle.getInterval();
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"]);
              });
          });
      });
