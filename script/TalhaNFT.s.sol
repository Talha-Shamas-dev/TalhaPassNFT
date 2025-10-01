// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/TalhaNFT.sol";

contract TalhaNFTScript is Script {
    TalhaPassNFT public talhaNFT;

    function setUp() public {
        // Latest deployed contract address on Sepolia (loading existing - NO 'new' call)
        talhaNFT = TalhaPassNFT(0x911FC47eC8352c73a671dcD33778b184eaaA86dF);
    }

    function run() public {
        // Start broadcast with private key (owner/deployer)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Mint Foundry 101 NFT (auto tokenId 1)
        string
            memory foundryURI = "ipfs://bafkreidy2bxzu7nzk2phsfindnbfkufz3gbgojl4ja6wndbdc32gbclcka";
        talhaNFT.mintNFT(msg.sender, foundryURI);

        // Mint Linux LFS170 NFT (auto tokenId 2)
        string
            memory linuxURI = "ipfs://bafkreicmqyukiy7qd5ee6pypsmhde52j7awyu7q7qyhlbu7chhx7fpct5m";
        talhaNFT.mintNFT(msg.sender, linuxURI);

        vm.stopBroadcast();
    }
}
