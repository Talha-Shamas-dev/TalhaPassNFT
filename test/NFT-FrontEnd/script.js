const contractAddress = '0x911fc47ec8352c73a671dcd33778b184eaaa86df';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Minimal ABI (sirf zaruri functions)
const abi = [
    'function balanceOf(address owner) view returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
    'function tokenURI(uint256 tokenId) view returns (string)',
    'function name() view returns (string)'
];

const contract = new ethers.Contract(contractAddress, abi, signer);

document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        await provider.send('eth_requestAccounts', []);
        const address = await signer.getAddress();
        document.getElementById('account').textContent = `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
        loadNFTs();
    } catch (error) {
        alert('MetaMask connect nahi hua: ' + error.message);
    }
});

async function loadNFTs() {
    try {
        const address = await signer.getAddress();
        const balance = await contract.balanceOf(address);
        const nftsDiv = document.getElementById('nfts');
        nftsDiv.innerHTML = '';

        for (let i = 0; i < balance; i++) {
            const tokenId = await contract.tokenOfOwnerByIndex(address, i);
            const uri = await contract.tokenURI(tokenId);
            const response = await fetch(uri.replace('ipfs://', 'https://ipfs.io/ipfs/'));
            const metadata = await response.json();

            const nftCard = document.createElement('div');
            nftCard.className = 'nft-card';
            nftCard.innerHTML = `
                <img src="${metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}" alt="${metadata.name}" class="nft-image" onerror="this.src='https://via.placeholder.com/300x200?text=NFT+Image'">
                <div class="nft-name">${metadata.name}</div>
                <div class="nft-desc">${metadata.description}</div>
                <div class="attributes">
                    ${metadata.attributes.map(attr => `<div class="attribute"><strong>${attr.trait_type}:</strong> ${attr.value}</div>`).join('')}
                </div>
                <p>Token ID: ${tokenId.toString()}</p>
            `;
            nftsDiv.appendChild(nftCard);
        }
    } catch (error) {
        alert('NFTs load nahi hue: ' + error.message);
    }
}

// Auto-connect agar already logged in
if (window.ethereum && window.ethereum.selectedAddress) {
    loadNFTs();
}