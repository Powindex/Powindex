const fs = require('fs');
const path = require('path');
const ethers = require('ethers');

// Set up your Polygon node information for connecting to the Polygon network
const provider = new ethers.providers.JsonRpcProvider('Polygon_network_RPC');
// Your smart contract address and private key
const contractAddress = '0x4b7e197e8b6807c4ffb52ca7f0b56095d03c0b47';
const privateKey = 'your_private_key'; // Replace with your private key

// Read the ABI (Application Binary Interface) of the smart contract
const abiPath = path.join(__dirname, 'abi', 'abi.json');
const contractABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));



// Create a wallet instance and connect it with the provider
const wallet = new ethers.Wallet(privateKey, provider);

// Create an instance of the smart contract
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Check if a given hash satisfies the mining difficulty requirements
function isValidHash(hash) {
    return hash < "0x000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
}

// Main mining function
async function mine() {
    let currentGlobalChallenge = await contract.currentGlobalChallenge();
    let nonce = 0;
    let hash;
    let lastLogTime = Date.now();
    while (true) {
        try {
            // Periodically check if the global challenge value has changed
            if (nonce % 100000 === 0 || nonce === 0) {
                const newChallenge = await contract.currentGlobalChallenge();
                if (newChallenge !== currentGlobalChallenge) {
                    console.log("Global challenge value has changed, resetting mining process...");
                    currentGlobalChallenge = newChallenge;
                    nonce = 0;
                    continue;
                }
            }

            nonce++;
            const currentTime = Date.now();

            // Regularly log information
            if (currentTime - lastLogTime >= 8000) {
                const maticBalance = ethers.utils.formatEther(await wallet.getBalance());
                const powcBalance = ethers.utils.formatEther(await contract.balanceOf(wallet.address));
                console.log(`[Miner Log] Time: ${new Date().toISOString()} | Attempts: ${nonce} | Current Challenge: ${currentGlobalChallenge} | MATIC Balance: ${maticBalance} | POWC Balance: ${powcBalance}`);
                lastLogTime = currentTime;
            }

            // Prepare data for mining
            const addressBytes = ethers.utils.arrayify(wallet.address);
            const challengeBytes = ethers.utils.arrayify(currentGlobalChallenge);
            const minerSpecificChallenge = ethers.utils.keccak256(ethers.utils.concat([challengeBytes, addressBytes]));
            const nonceBytes = ethers.utils.zeroPad(ethers.utils.arrayify(nonce), 32);

            // Compute the hash
            hash = ethers.utils.keccak256(ethers.utils.concat([nonceBytes, ethers.utils.arrayify(minerSpecificChallenge), addressBytes]));

            // If a valid hash is found, try to submit it to the contract
            if (isValidHash(hash)) {
                console.log(`Valid Nonce found: ${nonce}, comparing with the contract...`);
                const [message, contractHash] = await contract.debugSolution(nonce, wallet.address);
                if (hash === contractHash && message === "Solution is valid") {
                    console.log(`Hash matches with contract: ${hash}`);
                    console.log(`Sending mining transaction, Nonce: ${nonce}, Hash: ${hash}`);
                    // Send transaction
                    const tx = await contract.mint(nonce, wallet.address, {
                        gasLimit: ethers.utils.hexlify(1000000),
                        value: ethers.utils.parseUnits("0.06", "ether")
                    });
                    console.log(`Mining transaction sent, Transaction Hash: ${tx.hash}`);
                    await tx.wait();
                    console.log("Mining successful, preparing for next round...");
                } else {
                    console.log(`Invalid or unmatched solution: ${message}`);
                    // Reset the mining process
                    nonce = 0;
                    currentGlobalChallenge = await contract.currentGlobalChallenge();
                }
            }
        } catch (error) {
            // Handle errors during the mining process
            console.error("Error during mining: ", error);
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }
}

mine();
