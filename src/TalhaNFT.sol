// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract TalhaPassNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor(
        address initialOwner
    ) ERC721("TalhaPassNFT", "TPASS") Ownable(initialOwner) {
        tokenCounter = 0;
    }

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        tokenCounter++;
        uint256 newItemId = tokenCounter;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
