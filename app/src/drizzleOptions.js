import Web3 from 'web3';
import PleaseFundMe from './contracts/PleaseFundMe.json';
import PleaseFundMe_v3 from './contracts/PleaseFundMe_v3.json';

window.ethereum.enable();

const options = {
  web3: {
    block: false,
    customProvider: new Web3(window.ethereum),
    fallBack: {
      type: 'ws',
      url: 'ws://localhost:8545',
    },
  },
  contracts: [PleaseFundMe, PleaseFundMe_v3],
  events: {},
};

export default options;
