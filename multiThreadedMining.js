const fs = require('fs');
const path = require('path');
const ethers = require('ethers');
const { Worker } = require('worker_threads');

async function main() {
    console.log("Main thread starting...");

    // Create an Ethereum JSON-RPC provider for the Polygon network.
    const provider = new ethers.providers.JsonRpcProvider('Polygon_network_RPC');

    // Specify the Ethereum smart contract address you want to interact with.
    const contractAddress = '0x4B7e197E8b6807C4Ffb52ca7F0b56095d03c0B47';

    // Replace 'your_private_key' with your actual private key.
    const privateKey = 'your_private_key';

    // Load the ABI (Application Binary Interface) of the contract.
    const abiPath = path.join(__dirname, 'abi', 'abi.json');
    const contractABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

    // Create an Ethereum wallet using the specified private key and provider.
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create an Ethereum contract instance using the contract address and ABI.
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Define a function to start a mining thread with a given nonce range.
    function startMiningThread(startNonce, range) {
        console.log(`Starting a mining thread for range: ${startNonce} to ${startNonce + range}`);
        
        // Create a worker thread and pass necessary data to it.
        const worker = new Worker('./minerWorker.js', {
            workerData: {
                startNonce,
                range,
                address: wallet.address,
                contractABI,
                privateKey,
                contractAddress
            }
        });

        // Listen for messages from the worker thread.
        worker.on('message', async (message) => {
            if (message.type === 'found') {
                console.log(`Found valid nonce: ${message.nonce}, Hash: ${message.hash}`);
                try {
                    console.log(`Valid Nonce found: ${message.nonce}, comparing with the contract...`);

                    // Check the validity of the solution with the smart contract.
                    const [contractMessage, contractHash] = await contract.debugSolution(message.nonce, wallet.address);

                    // Define a custom gas price.
                    const customGasPrice = ethers.utils.parseUnits("400", "gwei");

                    if (message.hash === contractHash && contractMessage === "Solution is valid") {
                        console.log(`Hash matches with contract: ${message.hash}`);
                        console.log(`Sending mining transaction, Nonce: ${message.nonce}, Hash: ${message.hash}`);
                        
                        // Send a mining transaction to the smart contract.
                        const tx = await contract.mint(message.nonce, wallet.address, {
                            gasLimit: ethers.utils.hexlify(2000000),
                            value: ethers.utils.parseUnits("0.06", "ether"),
                            gasPrice: customGasPrice
                        });
                        console.log(`Mining transaction sent, Transaction Hash: ${tx.hash}`);
                        
                        // Wait for the transaction to be confirmed.
                        await tx.wait();
                        console.log("Mining successful, preparing for the next round...");
                    } else {
                        console.log(`Invalid or unmatched solution: ${contractMessage}`);
                    }
                } catch (error) {
                    console.error("Error during transaction: ", error);
                }
            }
        });

        // Handle errors from the worker thread.
        worker.on('error', (error) => {
            console.error('Error from worker:', error);
        });

        // Handle the worker thread's exit.
        worker.on('exit', (code) => {
            console.log(`Worker exited with code ${code}`);
        });
    }

    // Create an array of worker threads for parallel mining.
    const workers = [];
    const range = 50000000;

    // Start 10 mining threads, each with its own nonce range.
    for (let i = 0; i < 10; i++) {
        startMiningThread(i * range, range);
    }

    console.log("All mining threads started.");
}

// Execute the main function, handling any errors.
main().catch(console.error);

