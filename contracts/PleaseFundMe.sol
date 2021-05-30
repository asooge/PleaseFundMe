pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract PleaseFundMe {
    event InteractionSuccess(address sender, string message);
    event TransferSuccess(address sender, string transaction, uint amount);
    
    struct Funder {
        address owner;
        bytes32 id;
        uint startDate;
        uint endDate;
        uint updatedAt;
        string title;
        string description;
        uint fundTarget;
        uint fundBalance;
        uint amountRaised;
    }
    
    struct User {
        address owner;
        bytes32 id;
        string username;
        string aboutMe;
        string backgroundGradient;
    }
    
    struct Contribution {
        bytes32 id;
        uint timeCreated;
        address contributer;
        uint amount;
        string message;
    }
    
    mapping (bytes32 => Contribution) contributions;
    mapping (bytes32 => bytes32[]) funderContributions;
    bytes32[] private contributionIndex;
    
    mapping (bytes32 => User) users;
    bytes32[] private userIndex;
    mapping (bytes32 => bytes32[]) userFriends;
    mapping (bytes32 => mapping (bytes32 => bool)) friendMap;
    
    mapping (address => bytes32) ownerToUserId;
    
    mapping (bytes32 => Funder) funders;
    bytes32[] private funderIndex;
    mapping (bytes32 => bytes32[]) ownerFunders;
    
    address payable _developerAddress;
    
    constructor() {
        _createHomePage(msg.sender, 'dev', 'developer page', 'blue');
        _developerAddress = msg.sender;
    }
    
    function getAccounts() public view returns(User[] memory) {
        uint userCount = userIndex.length;
        User[] memory _users = new User[](userCount);
        for(uint i = 0; i < userCount; i++) {
            _users[i] = users[userIndex[i]];
        }
        return _users;
    }

    function addFriend(bytes32 _friend) public {
        bytes32 _user = ownerToUserId[msg.sender];
        require(ownerToUserId[msg.sender] != 0, 'user account does not exist'); // require user has an account
        require(_user != _friend, 'you cannot add yourself as a friend ');
        require(!friendMap[_user][_friend], 'friend already added'); // require not existing friend
        userFriends[_user].push(_friend);
        friendMap[_user][_friend] = true;
    }
    
    function getUserFriends(bytes32 _user) public view returns (User[] memory) {
        uint friendsCount = userFriends[_user].length;
        User[] memory _userFriends = new User[](friendsCount);
        for (uint i = 0; i < friendsCount; i++) {
            _userFriends[i] = users[userFriends[_user][i]];
        }
        return _userFriends;
    }
    
    function getAccountById (bytes32 _id) public view returns(User memory) {
        return users[_id];
    }
    
    function getUserIndex() public view returns(bytes32[] memory) {
        return userIndex;
    }
    
    function getUserCount() public view returns(uint) {
        return userIndex.length;
    }
    
    function getUserId() public view returns(bytes32) {
        return ownerToUserId[msg.sender];
    }
    
    
    function createHomePage(string memory _username, string memory _aboutMe, string memory _backgroundGradient) public {
        bytes32 _id = ownerToUserId[msg.sender];
        require(msg.sender != _developerAddress, 'dev already has a home page');
        require(_id == 0, 'user already has a home page'); // enforce only one User per address
        _createHomePage(msg.sender, _username, _aboutMe, _backgroundGradient);
    }
    
    function _createHomePage(address _sender, string memory _username, string memory _aboutMe, string memory _backgroundGradient) internal {
        bytes32 _id = keccak256(abi.encodePacked(block.timestamp, _sender, _username, _aboutMe, _backgroundGradient));
        User memory newUser = User(_sender, _id, _username, _aboutMe, _backgroundGradient);
        users[_id] = newUser; // add the new user
        ownerToUserId[_sender] = _id;
        userIndex.push(_id);
        emit InteractionSuccess(_sender, 'account created');
    }
    
    function updateHomePage(string memory _username, string memory _aboutMe, string memory _backgroundGradient) public {
        bytes32 _id = ownerToUserId[msg.sender];
        require(users[_id].owner == msg.sender);
        users[_id].username = _username;
        users[_id].aboutMe = _aboutMe;
        users[_id].backgroundGradient = _backgroundGradient;
        emit InteractionSuccess(msg.sender, 'account updated');
    }
    
    function createFunder(string memory _title, uint _fundTarget, string memory _description, uint _endDate) public {
        bytes32 _id = ownerToUserId[msg.sender];
        if (_id == 0) {
            require(msg.sender == _developerAddress, 'must create home page before creating funder');
        }
        _createFunder(msg.sender, _title, _fundTarget, _description, _endDate);
    }
    
    
    function _createFunder(address _sender, string memory _title, uint _fundTarget, string memory _description, uint _endDate) internal {
        bytes32 _userId = ownerToUserId[_sender];
        bytes32 _funderId = keccak256(abi.encodePacked(block.timestamp, _sender, _title, _description, _fundTarget));
        funders[_funderId] = Funder(_sender, _funderId, block.timestamp, _endDate, block.timestamp, _title, _description, _fundTarget, 0, 0);
        ownerFunders[_userId].push(_funderId);
        funderIndex.push(_funderId);
        emit InteractionSuccess(_sender, 'funder created');
    }
    
    function updateFunder(bytes32 _funderId, string memory _title, uint _fundTarget, string memory _description, uint _endDate) public {
        address _sender = msg.sender;
        bytes32 _userId = ownerToUserId[_sender];
        require(users[_userId].owner == _sender, 'must be owner to update');
        funders[_funderId].title = _title;
        funders[_funderId].description = _description;
        funders[_funderId].fundTarget = _fundTarget;
        funders[_funderId].endDate = _endDate;
        funders[_funderId].updatedAt = block.timestamp;
        emit InteractionSuccess(_sender, 'funder updated');
    }
    
    function getUserFunders(bytes32 _userId) public view returns(Funder[] memory) {
        uint _fundersCount = ownerFunders[_userId].length;
        Funder[] memory _userFunders = new Funder[](_fundersCount);
        for (uint i = 0; i < _fundersCount; i++) {
            _userFunders[i] = funders[ownerFunders[_userId][i]];
        }
        return _userFunders;
    }
    
    function getAllFunders() public view returns (Funder[] memory) {
        uint _fundersCount = funderIndex.length;
        Funder[] memory _funders = new Funder[](_fundersCount);
        for (uint i = 0; i < _fundersCount; i++) {
            _funders[i] = funders[funderIndex[i]];
        }
        return _funders;
    }
    
    function getFunderById(bytes32 _funderId) public view returns(Funder memory) {
        return funders[_funderId];
    }
    
    function contribute(bytes32 _funderId, string memory _message) payable public {
        uint contribution = msg.value;
        Funder storage funder = funders[_funderId];
        funder.fundBalance += contribution;
        funder.amountRaised += contribution;
        
        bytes32 _contributionId = keccak256(abi.encodePacked(block.timestamp, msg.sender, msg.value, _message));
        contributions[_contributionId] = Contribution(_contributionId, block.timestamp, msg.sender, msg.value, _message);
        funderContributions[_funderId].push(_contributionId);
        contributionIndex.push(_contributionId);
        emit TransferSuccess(msg.sender, 'contribution successful', msg.value);
    }
    
    function getFunderContributions(bytes32 _funderId) public view returns(Contribution[] memory) {
        uint funderCount = funderContributions[_funderId].length;
        Contribution[] memory _funderContributions = new Contribution[](funderCount);
        for (uint i = 0; i < funderCount; i++) {
            _funderContributions[i] = contributions[funderContributions[_funderId][i]];
        }
        return _funderContributions;
    }
    
    function getAllContributions() public view returns(Contribution[] memory) {
        uint funderCount = contributionIndex.length;
        Contribution[] memory _contributions = new Contribution[](funderCount);
        for (uint i = 0; i < funderCount; i++) {
            _contributions[i] = contributions[contributionIndex[i]];
        }
        return _contributions;
    }
    
    function withdraw(bytes32 _funderId) public payable{
        Funder storage funder = funders[_funderId];
        uint totalFunds = funder.fundBalance;
        uint devFunds = totalFunds / 1000;
        uint withdrawalFunds = totalFunds - devFunds;
        require(totalFunds > 0, 'no funds to withdraw');
        require(funder.owner == msg.sender, "unauthorized");
        funder.fundBalance = 0;
        _developerAddress.transfer(devFunds);
        msg.sender.transfer(withdrawalFunds);
        emit TransferSuccess(msg.sender, 'withdrawal successful', withdrawalFunds);
    }
}