## Foundry
ERC-721 NFT-Based Certificate Issuance System (Foundry)
Project Overview

This project implements an ERC-721 NFT-based certificate system to issue tamper-proof, verifiable certificates for blockchain and smart contract training completed via Foundry-based development workflows.
Each certificate is minted as a non-fungible token (NFT), ensuring ownership, authenticity, and immutability on-chain.

The system was developed and tested entirely in a Linux environment, following professional smart contract engineering practices.

Problem Statement

Traditional digital certificates suffer from multiple issues:

Easy to forge or modify

No global verification mechanism

Centralized issuance and storage

Employers must trust issuing authority blindly

There is no cryptographic proof of authenticity in standard PDF or database-backed certificates.

Proposed Solution

To solve this, I designed an ERC-721-based certificate NFT system where:

Each certificate is a unique NFT

Ownership is provable on-chain

Certificates cannot be altered or duplicated

Verification is permissionless via blockchain explorers

This makes certificates:

Trustless

Transparent

Globally verifiable

System Architecture

Smart Contract: ERC-721 (OpenZeppelin-based)

Development Framework: Foundry

Environment: Linux (CLI-driven workflow)

Blockchain: Ethereum-compatible testnet

Metadata Storage: Token URI referencing certificate metadata

Key Features

Unique Certificate NFTs: Each certificate corresponds to exactly one NFT

Issuer-Controlled Minting: Only authorized issuer can mint certificates

Immutable Records: Certificate ownership permanently stored on-chain

Standard Compliance: Fully ERC-721 compatible

Gas-Efficient Design: Optimized minting logic

Test Coverage: Unit tests written using Foundry

Technical Implementation Details

Implemented ERC-721 using OpenZeppelin contracts

Custom mintCertificate() function restricted to issuer

Token metadata includes:

Certificate title

Course name

Issue date

Recipient wallet address

Deployed and tested using Foundry CLI tools (forge build, forge test, forge script)

Linux-based development ensured reproducibility and automation

Testing & Validation

Unit tests written in Foundry

Tested:

Authorized vs unauthorized minting

Ownership correctness

Token uniqueness

Contracts compiled and tested via Linux terminal

Deployment scripts executed using Foundry scripting

Security Considerations

Access control enforced using modifiers

No external minting allowed

No upgradeability to prevent post-issuance manipulation

ERC-721 standard ensures compatibility with wallets and explorers

Blockchain Implications

This system demonstrates how blockchain can:

Replace centralized certificate authorities

Prevent credential fraud

Enable trustless verification for employers and institutions

Create interoperable digital credentials usable across platforms

NFT-based certificates can be extended to:

Universities

Online education platforms

Corporate training programs

Professional certifications

Outcome

Successfully deployed ERC-721 certificate contract

Verified ownership via blockchain explorer

Certificates became non-transferable proof of achievement

Demonstrated real-world use of NFTs beyond speculation
**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
# TalhaPassNFT DApp

A decentralized NFT dashboard to connect MetaMask, view owned NFTs, and transfer them securely.

## Features

- Connect MetaMask  
- Show wallet address and ETH balance  
- List owned NFTs (based on token IDs)  
- Transfer NFTs with Etherscan link  

## How to run

```bash
# Install http-server (if not installed)
npm install -g http-server

# Serve the frontend
http-server .

# Then in browser open
http://localhost:8080
