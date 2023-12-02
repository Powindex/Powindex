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
Initially rewarding users solving challenge codes, POWC evolves to allow holders to partake in inscription-related decisions.

## 3. Features
### 3.1 Mining Program
- **Challenge Code Retrieval:** Retrieves current challenge code from the contract.
- **Answer Calculation:** Calculates answer using PoW algorithm.
- **Answer Submission:** Submits answer to the smart contract.

### 3.2 Smart Contract
- **Challenge Code Generation:** Updates challenge code regularly.
- **Answer Verification:** Verifies correctness of submitted answers.
- **Token Distribution:** Distributes POWC tokens to successful miners.

### 3.3 POWC Usage
- **Governance:** POWC holders participate in platform decisions.
- **Inscription Consensus:** Future versions will record only the winner's inscription in the distributed index.

## 4. Technical Architecture
### 4.1 Non-upgradable Contract
PoWIndex uses a non-upgradable smart contract. Once deployed, its logic and functionality are permanently fixed, ensuring transparency and immutable rules for all participants.

### 4.2 Mining Mechanism and Hash Algorithm
At its core is a simulated PoW mining mechanism using keccak256 hash function. Miners must find a nonce that results in a hash with the first six characters being zero (0x000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF), ensuring fairness and computational intensity.

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

Warning: Never share or commit your private key in any public repository.

Running the Script
After configuration, run the script with the following command:

```bash
node Powc_miner.js
```
The script will begin to operate based on the configuration you've set.

Important Notes
Security: Handle your private key and sensitive information with utmost care. Never store your private key in any public code repository or other publicly accessible places.
```bash
const privateKey = 'your_private_key'; // Replace with your private key
const provider = new ethers.providers.JsonRpcProvider('Polygon_network_RPC');
```
Testing: It is recommended to conduct thorough testing on a test network before connecting to the main network and performing actual transactions.
Support and Contributions
If you encounter any issues or would like to contribute to the code, please submit issues or pull requests through the project's Issues page.
