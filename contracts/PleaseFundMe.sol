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
        uint id;
        string title;
        uint fundTarget;
        uint fundBalance;
        uint amountRaised;
    }
    
    struct User {
        address owner;
        uint id;
        string username;
        string aboutMe;
        string backgroundGradient;
        uint fundersCount;
    }
    
    User[] public users;
    uint public userCount = 0;
    
    mapping (address => uint) ownerToUserId;
    mapping (address => Funder[]) ownerToFunders;
    
    address private _developerAddress;
    
    constructor() {
        _createHomePage(msg.sender, 'dev', 'developer page', 'blue');
        _developerAddress = msg.sender;
    }
    
    
    function createHomePage(string memory _username, string memory _aboutMe, string memory _backgroundGradient) public {
        uint _id = ownerToUserId[msg.sender];
        require(msg.sender != _developerAddress, 'dev already has a home page');
        require(_id == 0, 'user already has a home page'); // enforce only one User per address
        _createHomePage(msg.sender, _username, _aboutMe, _backgroundGradient);
    }
    
    function _createHomePage(address _sender, string memory _username, string memory _aboutMe, string memory _backgroundGradient) internal {
        User memory newUser = User(msg.sender, userCount, _username, _aboutMe, _backgroundGradient, 0);
        ownerToUserId[_sender] = userCount; // assign sender a user id
        users.push(newUser); // add the new user
        userCount = users.length; // increment the userCount
    }
    
    function updateHomePage(string memory _username, string memory _aboutMe, string memory _backgroundGradient) public {
        uint _id = ownerToUserId[msg.sender];
        require(users[_id].owner == msg.sender);
        users[_id].username = _username;
        users[_id].aboutMe = _aboutMe;
        users[_id].backgroundGradient = _backgroundGradient;
    }
    
    function createFunder(string memory _title, uint _fundTarget) public {
        uint _id = ownerToUserId[msg.sender];
        if (_id == 0) {
            require(msg.sender == _developerAddress, 'must create home page before creating funder');
        }
        _createFunder(msg.sender, _title, _fundTarget);
    }
    
    
    function _createFunder(address _sender, string memory _title, uint _fundTarget) internal {
        uint _homePageId = ownerToUserId[_sender];
        uint _funderId = users[_homePageId].fundersCount;
        ownerToFunders[_sender].push(Funder(_sender, _funderId, _title, _fundTarget, 0, 0));
        
        users[_homePageId].fundersCount = users[_homePageId].fundersCount + 1;
    }
    
    function updateFunder(uint _index, string memory _title, uint _fundTarget) public {
        address _sender = msg.sender;
        uint _homePageId = ownerToUserId[_sender];
        require(users[_homePageId].owner == _sender, 'must be owner to update');
        ownerToFunders[_sender][_index].title = _title;
        ownerToFunders[_sender][_index].fundTarget = _fundTarget;
    }
    
    function getUserFundersCount(address _address) public view returns(uint) {
        return users[ownerToUserId[_address]].fundersCount;
    }
    
    function getUserFunderAtIndex(address _owner, uint _index) public view returns(Funder memory) {
        return ownerToFunders[_owner][_index];
    }
    
    function getUserFunders(address _owner) public view returns(Funder[] memory) {
        return ownerToFunders[_owner];
    }

    function getUsers() public view returns(User[] memory) {
        return users;
    }
    
    function getMyBalance(uint _index) public view returns(uint) {
        address owner = msg.sender;
        Funder memory funder = ownerToFunders[owner][_index];
        require (funder.owner == msg.sender, 'no funder for user');
        return funder.fundBalance;
    }
    
    function contribute(address _owner, uint _index) payable public {
        uint contribution = msg.value;
        Funder storage funder = ownerToFunders[_owner][_index];
        funder.fundBalance += contribution;
        funder.amountRaised += contribution;
    }
    
    function withdraw(uint _index) public payable{
        Funder storage funder = ownerToFunders[msg.sender][_index];
        uint totalFunds = funder.fundBalance;
        require(totalFunds > 0, 'no funds to withdraw');
        require(funder.owner == msg.sender, "unauthorized");
        funder.fundBalance = 0;
        msg.sender.transfer(totalFunds);
    }
}