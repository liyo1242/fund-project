pragma solidity ^0.8.9;

contract FundraisingFactory {
  Fundraising[] public deployedFundraising;

  function createFundraising(uint minimumFund) public {
    Fundraising newFundraisingAddress = new Fundraising(minimumFund, msg.sender);
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

  address public manager;
  uint public minimumFundRaising;
  uint public investorCount;
  mapping(address => bool) public investors;
  uint numRequests;
  mapping(uint256 => Request) public requests;

  constructor(uint minimumFund, address creator) {
    manager = creator;
    minimumFundRaising = minimumFund;
  }

  function invest() public payable {
    require(msg.value > minimumFundRaising);
    investors[msg.sender] = true;
    investorCount++;
  }

  function createRequest(string memory description, uint value, address payable recipient) public requiredManager {
    Request storage r = requests[numRequests++];
    r.description = description;
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

  modifier requiredManager() {
    require(msg.sender == manager);
    _;
  }
}