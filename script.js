console.log("script.js loaded ✅");

// Contract details (update with your deployed address + ABI)
const contractAddress = "0x911FC47eC8352c73a671dcD33778b184eaaA86dF"; // your contract
const contractABI = [
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)",
    "function transferFrom(address from, address to, uint256 tokenId) public",
    "function balanceOf(address owner) view returns (uint256)"
];

let provider, signer, contract;

async function connectMetaMask() {
    if (typeof window.ethereum === "undefined") {
        showPopup("MetaMask not detected ❌");
        return;
    }
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        const walletAddress = await signer.getAddress();
        const balance = await provider.getBalance(walletAddress);

        document.getElementById("walletInfo").classList.remove("hidden");
        document.getElementById("walletAddress").innerText = walletAddress;
        document.getElementById("walletBalance").innerText =
            ethers.utils.formatEther(balance) + " ETH";

        showPopup("Connected to MetaMask ✅");
        loadNFTs(walletAddress);
    } catch (err) {
        console.error("Connect error:", err);
        showPopup("Failed to connect MetaMask!");
    }
}

async function loadNFTs(walletAddress) {
    const nftList = document.getElementById("nftList");
    nftList.innerHTML = "<p>Loading NFTs...</p>";

    let items = [];
    for (let i = 1; i <= 20; i++) {
        try {
            let owner = await contract.ownerOf(i);
            if (owner.toLowerCase() === walletAddress.toLowerCase()) {
                let uri = await contract.tokenURI(i);
                items.push({ id: i, uri });
            }
        } catch (e) {
            // token not exist, skip
        }
    }

    nftList.innerHTML = "";
    if (items.length === 0) {
        nftList.innerHTML = "<p>No NFTs found ❌</p>";
    } else {
        items.forEach(nft => {
            let div = document.createElement("div");
            div.className = "nft-item";
            div.innerHTML = `<p><b>ID:</b> ${nft.id}</p><p>URI: ${nft.uri}</p>`;
            nftList.appendChild(div);
        });
    }
}

async function transferNFT() {
    try {
        const recipient = document.getElementById("recipient").value;
        const tokenId = document.getElementById("tokenId").value;
        const from = await signer.getAddress();

        if (!ethers.utils.isAddress(recipient)) {
            showPopup("Invalid recipient address ❌");
            return;
        }

        const tx = await contract.transferFrom(from, recipient, tokenId);
        await tx.wait();

        const etherscanLink = `https://sepolia.etherscan.io/tx/${tx.hash}`;
        showPopup(`NFT Transferred ✅ <a href="${etherscanLink}" target="_blank">View on Etherscan</a>`);
        loadNFTs(from);
    } catch (err) {
        console.error(err);
        showPopup("Transfer failed ❌");
    }
}

function showPopup(message) {
    const popup = document.getElementById("statusPopup");
    popup.innerHTML = message;
    popup.classList.remove("hidden");
    setTimeout(() => popup.classList.add("hidden"), 3000);
}

document.getElementById("connectBtn").addEventListener("click", connectMetaMask);
document.getElementById("transferBtn").addEventListener("click", transferNFT);
