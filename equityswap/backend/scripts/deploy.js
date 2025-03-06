async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with:", deployer.address);

    const EquitySwap = await ethers.getContractFactory("EquitySwap");
    const contract = await EquitySwap.deploy("0xPartyBAddress", "0xAssetAddress", 100);

    console.log("EquitySwap deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
