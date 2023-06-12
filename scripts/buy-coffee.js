const hre = require("hardhat");


async function getBalance(address) {
    const balanceBigInt = await hre.waffle.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}


async function printBalances(addresses) {
    let idx = 0;
    for(const address of addresses) {
        console.log(`Address ${idx} balance: `, await getBalance(address));
        idx++;
    }
}

async function printMemos(memos) {
    for (const memo of memos) {
        const timestamp = memo.timestamp;
        const tipper = memo.name;
        const tipperAddress = memo.from;
        const message = memo.message;
        console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
    }
}

async function main() {

    const[owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();


    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const BuyMeACoffee = await BuyMeACoffee.deploy();
    await BuyMeACoffee.deployed();
    console.log("BuyMeACoffee deplyed to ", buyMeACoffee.address);


    const addresses = [owner.address, tipper.address, buyMeACoffee.address];
    console.log("== start ==");
    await printBalances(addresses);
    
    const tip = {value: hre.ethers.utils.parseEther("1")};
    await buyMeACoffee.connect(tipper1).buyCoffee("Rohan", "Yo");
    await buyMeACoffee.connect(tipper2).buyCoffee("Axe", "Hey");
    await buyMeACoffee.connect(tipper3).buyCoffee("Jon", "Great Going");

    console.log("== bought coffee ==");
    await printBalances(addresses);
















    const Greeter = await hre.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, Hardhat!");

    await greeter.deployed();

    console.log("Greeter deployed to:", greeter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });