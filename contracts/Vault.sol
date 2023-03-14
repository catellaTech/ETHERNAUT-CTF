// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vault {
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}

contract attackerV5 {
  Vault private vault;

  constructor(address _v){
    vault = Vault(_v);
  }

  function attack(bytes32 _data) external {
    vault.unlock(_data);
  }
}