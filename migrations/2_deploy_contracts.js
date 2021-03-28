const PleaseFundMe = artifacts.require('PleaseFundMe');
const PleaseFundMe_v3 = artifacts.require('PleaseFundMe_v3');

module.exports = function (deployer) {
  deployer.deploy(PleaseFundMe);
  deployer.deploy(PleaseFundMe_v3);
};
