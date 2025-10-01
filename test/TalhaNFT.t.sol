// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TalhaNFT.sol";

contract TalhaNFTScript is Script {
    TalhaPassNFT public talhaNFT;

    function setUp() public {
        // Latest deployed contract address on Sepolia (loading existing - NO 'new' call)
        talhaNFT = TalhaPassNFT(0x5BF1c468E8F1387D946051f8595954A59BA98AdD);
    }

    function run() public {
        // Start broadcast with private key (owner/deployer)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Mint Foundry 101 NFT (tokenId 1)
        string
            memory foundryURI = "ipfs://bafkreidy2bxzu7nzk2phsfindnbfkufz3gbgojl4ja6wndbdc32gbclcka";
        talhaNFT.mintNFT(msg.sender, 1, foundryURI);

        // Mint Linux LFS170 NFT (tokenId 2)
        string
            memory linuxURI = "ipfs://bafkreicmqyukiy7qd5ee6pypsmhde52j7awyu7q7qyhlbu7chhx7fpct5m";
        talhaNFT.mintNFT(msg.sender, 2, linuxURI);

        vm.stopBroadcast();
    }
}
