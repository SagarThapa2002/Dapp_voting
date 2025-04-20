// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public owner;
    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;

    constructor(string[] memory candidateNames) {
        owner = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    function vote(uint candidateIndex) public {
        require(!hasVoted[msg.sender], "You have already voted!");
        require(candidateIndex < candidates.length, "Invalid candidate!");
        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount++;
    }

    //  New: return number of candidates
    function getTotalCandidates() public view returns (uint) {
        return candidates.length;
    }

    //  New: return a candidate by index
    function getCandidate(uint index) public view returns (string memory name, uint voteCount) {
        require(index < candidates.length, "Candidate does not exist.");
        Candidate memory candidate = candidates[index];
        return (candidate.name, candidate.voteCount);
    }
}
