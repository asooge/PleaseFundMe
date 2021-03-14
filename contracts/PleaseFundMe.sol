// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract PleaseFundMe {
    event StorageSet(string _message);

    event LogSender(address _sender);

    uint public storedData;

    function set(uint x) public {
        storedData = x;

        emit StorageSet("Data stored successfully!");
        emit LogSender(msg.sender);
    }

    // PleaseFundMe

    struct Funder {
        address owner;
        string title;
        uint fundTarget;
        uint fundBalance;
        uint amountRaised;
    }
    
    Funder[] public funders;
    uint public fundersCount = 0;
    
    mapping (address => uint256) ownerToIndex;
    
    
    function createFunder(string memory _title, uint _fundTarget) public {
        Funder memory newFunder = Funder(msg.sender, _title, _fundTarget, 0, 0);
        funders.push(newFunder);
        fundersCount = funders.length;

        ownerToIndex[msg.sender] = fundersCount - 1;
    }
    
    function updateFunder(string memory _title, uint _fundTarget) public {
        uint256 index = ownerToIndex[msg.sender];
        Funder storage funder = funders[index];
        require(msg.sender == funder.owner, "not authorized");
        
        funder.title = _title;
        funder.fundTarget = _fundTarget;
    }
    
    function getMyBalance() public view returns(uint) {
        address owner = msg.sender;
        uint256 index = ownerToIndex[owner];
        require (funders[index].owner == msg.sender, 'no funder for user');
        return funders[index].fundBalance;
    }
    
    function contribute(uint _num) payable public {
        uint contribution = msg.value;
        Funder storage funder = funders[_num];
        funder.fundBalance += contribution;
        funder.amountRaised += contribution;
    }
    
    function withdraw() public payable{
        uint index = ownerToIndex[msg.sender];
        Funder storage funder = funders[index];
        uint totalFunds = funder.fundBalance;
        require(totalFunds > 0, 'no funds to withdraw');
        require(funder.owner == msg.sender, "unauthorized");
        funder.fundBalance = 0;
        msg.sender.transfer(totalFunds);
    }
}