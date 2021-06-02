import Web3 from 'web3';
import PleaseFundMe from './contracts/PleaseFundMe.json';

const options = {
  web3: {
    block: false,
    customProvider: new Web3(window.ethereum),
    fallBack: {
      type: 'ws',
      url: 'ws://localhost:8545',
    },
  },
  contracts: [PleaseFundMe],
  events: {
    PleaseFundMe: ['InteractionSuccess', 'TransferSuccess']
  },
};

export default options;
