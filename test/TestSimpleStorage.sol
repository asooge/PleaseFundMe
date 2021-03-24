pragma solidity >=0.7.0 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PleaseFundMe.sol";

contract TestPleaseFundMe {
    function testItStoresAValue() public {
        PleaseFundMe pleaseFundMe = PleaseFundMe(DeployedAddresses.PleaseFundMe());

        pleaseFundMe.set(89);

        uint expected = 89;

        Assert.equal(pleaseFundMe.storedData(), expected, "It should store the value 89.");
    }
}