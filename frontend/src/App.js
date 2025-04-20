import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Voting from './Voting.json';  // ABI of the contract

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';  // Replace with your deployed contract address

function App() {
  const [candidates, setCandidates] = useState([]);
  const [account, setAccount] = useState(null);

  // Fetch candidates data from the contract
  const getCandidates = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);  // Use Browser provider for MetaMask
      const contract = new ethers.Contract(contractAddress, Voting.abi, provider);
      try {
        const result = await contract.getCandidates();  // Calling the correct function
        setCandidates(result);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    } else {
      alert('Ethereum provider (MetaMask) not found!');
    }
  };

  // Connect to the wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(account);
      getCandidates();
    } else {
      alert('Please install MetaMask');
    }
  };

  // Handle voting
  const vote = async (index) => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, Voting.abi, signer);
      const tx = await contract.vote(index);
      await tx.wait(); // Wait for the transaction to be mined
      getCandidates(); // Refresh the candidates list
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();  // Auto-connect wallet on page load
    }
  }, []);

  return (
    <div className="App">
      <h1>Voting DApp</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected as: {account}</p>
      )}

      <div>
        {candidates.length > 0 ? (
          candidates.map((candidate, index) => (
            <div key={index}>
              <h2>{candidate.name}</h2>
              <p>Votes: {candidate.voteCount.toString()}</p>
              <button onClick={() => vote(index)}>Vote</button>
            </div>
          ))
        ) : (
          <p>Loading candidates...</p>
        )}
      </div>
    </div>
  );
}

export default App;
