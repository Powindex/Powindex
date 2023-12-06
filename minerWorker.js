const { parentPort, workerData } = require('worker_threads');
const ethers = require('ethers');

// Worker data
const { startNonce, range, address, contractABI, contractAddress, privateKey } = workerData;

// Create an Ethereum provider for the Polygon network.
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/polygon');

// Create an Ethereum wallet using the provided private key and provider.
const wallet = new ethers.Wallet(privateKey, provider);

// Create an Ethereum contract instance using the contract address and ABI.
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function to fetch the current global challenge from the contract.
async function checkCurrentChallenge() {
    try {
        return await contract.currentGlobalChallenge();
    } catch (error) {
        console.error("Error fetching current challenge:", error);
        return null;
    }
}

// Function to check if a hash is valid based on a certain condition.
function isValidHash(hash) {
    return hash < "0x000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
}

// Function to perform mining within a given nonce range.
async function mine(startNonce, endNonce) {
    console.log(`Worker mining from nonce ${startNonce} to ${endNonce}`);
    let currentGlobalChallengeValue = await checkCurrentChallenge();

    for (let nonce = startNonce; nonce < endNonce; nonce++) {
        // Check the challenge value every 500,000 iterations.
        if (nonce % 500000 === 0) {
            let newChallenge = await checkCurrentChallenge();
            if (newChallenge !== currentGlobalChallengeValue) {
                console.log("Challenge has changed. Restarting mining.");
                currentGlobalChallengeValue = newChallenge;
                startNonce = nonce;
                break;
            }
        }

        // Calculate the hash for the current nonce and challenge.
        const addressBytes = ethers.utils.arrayify(address);
        const challengeBytes = ethers.utils.arrayify(currentGlobalChallengeValue);
        const minerSpecificChallenge = ethers.utils.keccak256(ethers.utils.concat([challengeBytes, addressBytes]));
        const nonceBytes = ethers.utils.zeroPad(ethers.utils.arrayify(nonce), 32);
        const hash = ethers.utils.keccak256(ethers.utils.concat([nonceBytes, ethers.utils.arrayify(minerSpecificChallenge), addressBytes]));

        // Check if the hash meets the validity condition.
        if (isValidHash(hash)) {
            parentPort.postMessage({
                type: 'found',
                nonce: nonce,
                hash: hash,
                address: address
            });
        }
    }
    console.log("Worker finished mining.");
    mine(startNonce, endNonce); // Restart mining for the next range.
}

// Start mining within the specified nonce range.
mine(startNonce, startNonce + range);
