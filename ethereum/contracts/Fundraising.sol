pragma solidity ^0.8.9;

contract FundraisingFactory {
  Fundraising[] public deployedFundraising;

  function createFundraising(string memory description, uint minimumFund) public {
    Fundraising newFundraisingAddress = new Fundraising(description, minimumFund, msg.sender);
    deployedFundraising.push(newFundraisingAddress);
  }

  function getDeployedFundraising() public view returns (Fundraising[] memory) {
    return deployedFundraising;
  }
}

contract Fundraising {
  struct Request {
    string description;
    uint costOfRequest;
    bool isComplete;
    address payable recipient;
    uint approverCount;
    mapping(address => bool) approvers;
  }

  string description;
  address public manager;
  uint public minimumFundRaising;
  uint public investorCount;
  mapping(address => bool) public investors;
  uint public numRequests;
  mapping(uint256 => Request) public requests;

  constructor(string memory desc, uint minimumFund, address creator) {
    description = desc;
    manager = creator;
    minimumFundRaising = minimumFund;
  }

  function invest() public payable {
    require(msg.value > minimumFundRaising);
    investors[msg.sender] = true;
    investorCount++;
  }

  function createRequest(string memory desc, uint value, address payable recipient) public requiredManager {
    Request storage r = requests[numRequests++];
    r.description = desc;
    r.approverCount = 0;
    r.costOfRequest = value;
    r.isComplete = false;
    r.recipient = recipient;
  }

  function approveRequest(uint index) public {
    Request storage request = requests[index];

    require(investors[msg.sender]);
    require(!request.approvers[msg.sender]);

    request.approvers[msg.sender] = true;
    request.approverCount++;
  }

  function finishRequest(uint index) public {
    Request storage request = requests[index];
    require(!request.isComplete);
    require(request.approverCount > (investorCount / 2));

    request.recipient.transfer(request.costOfRequest);
    request.isComplete = true;
  }

  function getSummary() public view returns (
     string memory, uint, uint, uint, uint, address
  ) {
    return (
      description,
      minimumFundRaising,
      address(this).balance,
      numRequests,
      investorCount,
      manager
    );
  }

  modifier requiredManager() {
    require(msg.sender == manager);
    _;
  }
}