# PoWIndex: Proof of Work-Based Distributed Index for Ethereum Inscriptions Whitepaper

## Abstract
PoWIndex is an innovative distributed index system, tailored for Ethereum Inscriptions (Ethscriptions). Integrating Proof of Work (PoW) mining mechanisms with blockchain technology, it establishes a decentralized platform enabling users to earn governance tokens POWC by solving cryptographic challenges. These tokens serve as governance tools within the system and represent a consensus on the value of inscriptions.

## 1. Introduction
### 1.1 Background
The evolution of blockchain technology necessitates decentralized methods for indexing and verifying content. PoWIndex emerges to offer a transparent, equitable, and decentralized way to record and validate Ethereum inscriptions.

### 1.2 Purpose
To create a distributed index system based on Ethereum inscriptions, utilizing Proof of Work mechanism to reward contributors, and establishing a governance structure around POWC tokens.

## 2. System Overview
### 2.2 Smart Contract
The smart contract on Ethereum manages challenge code generation, answer submission, and initial POWC distribution. Later, it will determine which inscriptions can be engraved in the distributed index, based on first correct answer submissions.


### 2.3 POWC Token
- Initially rewarding users for solving challenge codes, POWC evolves to allow holders to partake in inscription-related decisions.
- Contract address: 0x4b7e197e8b6807c4ffb52ca7f0b56095d03c0b47
- Deployment network: Polygon
- Total Supply: The total supply of POWC tokens is 21,000,000.
- Initial Reward Mechanism: POWC tokens were initially developed as a reward mechanism to reward users who successfully solve complex algorithmic challenges or verification efforts. This incentive method encourages more participants to invest in the calculation and verification of the system.
- Governance participation: As the POWC ecosystem develops, holders can now participate in more decisions about the token ecology. This may include voting on the project's future path, funding allocations, and other key governance decisions.
- Node Certificate NFT: Node Certificate NFTs, presented in NFT format, can be exchanged using POWC tokens at the exchange address: [http://destinynode.xyz](http://destinynode.xyz). These NFTs serve as verification credentials between broadcasting nodes and broadcasting contracts, enabling miners to retrieve node domain names from the contract. Additionally, the POWC tokens obtained from the sale of Node Certificate NFTs are initially used to provide liquidity for the token's economy. In the later stages, these accumulated POWC tokens are completely destroyed to regulate the token supply and maintain economic stability.
## 3. Features
### 3.1 Mining Program
### 3.3 Challenge Code Retrieval

The mining program begins by retrieving the current challenge code from the smart contract.
This challenge code, known as the currentGlobalChallenge, is a dynamic value that changes with each successful mining attempt, ensuring uniqueness in each mining operation.
### 3.4 Answer Calculation

The core of the mining program lies in calculating the answer using a PoW (Proof of Work) algorithm.
It combines the retrieved challenge code, the miner's wallet address, and a continually changing nonce to generate a hash using the keccak256 function.
The goal is to find a nonce that produces a hash meeting the specific criteria set by the contract (e.g., a hash with a specified number of leading zeros).
### 3.5 Answer Submission

Once a valid nonce is found and the corresponding hash meets the contract’s criteria, the mining program submits this answer (the nonce) to the smart contract.
This submission is a transaction on the blockchain, where the nonce is used as proof that the miner has completed the required computational work.

### 3.6 Challenge Code Generation

The smart contract is responsible for generating and updating the challenge code.
After each successful mining operation, the contract updates the currentGlobalChallenge, ensuring that each mining attempt is based on a fresh and unique challenge.
This mechanism prevents repetitive mining attempts and ensures the network's security and integrity.
### 3.7 Answer Verification

When an answer (nonce) is submitted, the smart contract verifies its correctness.
It recomputes the hash using the submitted nonce along with the stored challenge code and miner’s address to ensure that it matches the criteria (e.g., the hash has the required number of leading zeros).
This verification is crucial to prevent fraudulent claims and ensure that only valid mining efforts are rewarded.
### 3.8 Token Distribution

Successful miners, whose submitted nonces pass the verification process, are rewarded with POWC tokens.
The distribution of tokens is an automated process within the contract, crediting the miner’s wallet with the designated reward.
This incentive structure motivates participants to contribute their computational power to the network, maintaining the blockchain's operability and security.

### 3.9 POWC Usage
- **Governance:** POWC holders participate in platform decisions.
- **Inscription Consensus:** Future versions will record only the winner's inscription in the distributed index.

## 4. Technical Architecture
### 4.1 Non-upgradable Contract
PoWIndex uses a non-upgradable smart contract. Once deployed, its logic and functionality are permanently fixed, ensuring transparency and immutable rules for all participants.

### 4.2 Detailed Encryption Mining Process
In the discussed smart contract and mining script, the mining process utilizes the currentGlobalChallenge, wallet address, and a random number (nonce) for encryption calculations, forming a unique Proof of Work (PoW) mechanism. Here is a more detailed description of this process:

### 1. Combining Data to Generate Hash Value
- Challenge Value (CurrentGlobalChallenge):

This value is a dynamically changing global variable in the smart contract, providing a foundational challenge for the mining process.
It is updated after each successful mining operation, ensuring the challenge's continual variation and uniqueness.
- Wallet Address:

The Ethereum wallet address (or similar account address) of the miner ensures that each mining attempt is specific to that miner.
Since the address is unique, it helps differentiate the work of different miners, preventing hash value duplication or conflict.
- Random Number (Nonce):

The nonce is a continually changing value in the mining process. Miners need to find a specific nonce that results in a hash value meeting predetermined conditions (such as having a specific number of leading zeros).
Each mining attempt requires a new nonce, meaning miners will try a large number of different values in the search for the correct nonce.
### 2. Using the keccak256 Hash Function
- Choice of Hash Function:

keccak256 is widely used in Ethereum for its high security and efficiency.
It transforms input of any length into a fixed-length output (hash value).
Generating Hash Value:

The challenge value, wallet address, and nonce are combined and then passed through the keccak256 function to generate a hash value.
Due to the unpredictable output of keccak256, finding a hash that meets specific criteria is a computational challenge.
### 3. Hash Value Verification and Mining Difficulty
- Conditions for the Target Hash Value:

A valid hash must meet specific criteria, such as the first few characters of the hash being zeros, as defined in the smart contract.
This condition sets the mining difficulty, ensuring that generating a hash that meets the criteria requires significant computational work.
- Adjusting Mining Difficulty:

Mining difficulty can be adjusted by changing the conditions for the target hash value. For example, requiring more leading zeros increases the difficulty of finding a valid hash.
This difficulty adjustment mechanism allows the network to appropriately alter mining difficulty based on the overall computational power, maintaining network stability and security.
Conclusion
By combining the challenge value, wallet address, and nonce, and using the keccak256 hash function, the smart contract and mining script create a unique and secure Proof of Work mining process. This method ensures the difficulty and fairness of mining, while also protecting the network from malicious activities.

### 4.3 Hash Verification and Governance Token
First miners to submit correct answers can engrave their inscriptions on the blockchain and receive POWC tokens. Initially rewarding miners, POWC's role evolves to governance for inscription consensus.

### 4.4 Inscription Engraving
Later stages focus on inscription engraving. The first miner with the correct answer each round earns the right to have their content recorded on the blockchain, promoting efficient mining and decentralized content preservation.

## 5. Development Roadmap
- **Initial Phase:** Launch mining programs and smart contracts; distribute POWC tokens.
- **Mid Phase:** Enhance POWC governance functions; allow holder participation in decisions.
- **Later Phase:** Implement inscription engraving; allow the first correct answer submitter to engrave content into the distributed index.

## 6. Conclusion
PoWIndex combines blockchain technology with a Proof of Work mechanism to create a decentralized, secure, and fair distributed index for Ethereum inscriptions.



# Powindex Script Installation and Usage Guide

The Powindex script is a Node.js-based tool for interacting with the Polygon network. This guide will walk you through the steps of installing the necessary environment, configuring the script, and running it.

## Prerequisites

Before you start, make sure you have the following software installed on your computer:

- Node.js
- npm (Node.js package manager, usually installed with Node.js)

If you haven't installed these tools yet, visit the [Node.js official website](https://nodejs.org/) to download and install the latest version of Node.js, which will also install npm.

## Cloning the Repository

To get started, clone the Powindex repository to your local machine. Open your command line tool and run the following command:

```bash
git clone https://github.com/Powindex/Powindex.git
```
This will create a directory named Powindex on your computer containing all the necessary project files.

Installing Dependencies
Navigate to the project directory:

```bash
cd Powindex
```
In the root directory of the project, run the following command to install all the required dependencies as defined in the package.json file:

```bash
npm install
```
This will automatically download and install all necessary Node.js libraries.

Configuring the Script
Before running the script, you need to configure the necessary parameters:

Open the Powc_miner.js file in a text editor.

Enter your private key and Polygon RPC address in the designated places.
Important Notes
Security: Handle your private key and sensitive information with utmost care. Never store your private key in any public code repository or other publicly accessible places.
```bash
const privateKey = 'your_private_key'; // Replace with your private key
const provider = new ethers.providers.JsonRpcProvider('Polygon_network_RPC');
```
Warning: Never share or commit your private key in any public repository.

Running the Script
After configuration, run the script with the following command:

```bash
node Powc_miner.js
```
The script will begin to operate based on the configuration you've set.

# Multi-Threaded POWC Mining on Polygon Network

This repository contains a Node.js script (`multiThreadedMining.js`) that allows for multi-threaded POWC mining on the Polygon network. It leverages worker threads for parallel mining operations. If you want to start mining using multiple threads, follow the instructions below.
 Open the multiThreadedMining.js file and replace the following lines with your Polygon RPC URL and wallet private key:
```bash

const provider = new ethers.providers.JsonRpcProvider('Polygon_network_RPC');

const privateKey = 'your_private_key';
```
Inside the for loop in the main function, you can adjust the number of threads according to your computer's performance:
```bash
// Start 10 mining threads, each with its own nonce range.
for (let i = 0; i < 10; i++) {
    startMiningThread(i * range, range);
}
```
Save the changes to the multiThreadedMining.js file.

Open your terminal and navigate to the project directory.

Run the multi-threaded mining script:
```bash
node multiThreadedMining.js

```

Testing: It is recommended to conduct thorough testing on a test network before connecting to the main network and performing actual transactions.
Support and Contributions
If you encounter any issues or would like to contribute to the code, please submit issues or pull requests through the project's Issues page.
