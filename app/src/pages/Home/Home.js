import React, { useEffect } from 'react';
import './Home.scss';

const Home = () => {
  useEffect(() => {
    !window.ethereum && alert('please connect to metamask to begin')
  }, [])
  return (
    <div className='onboarding-home'>
      <h1>Home</h1>
      <div className='welcome-container'>
        <p>Welcome to Please Fund Me, a decentralized crowdfunding application on the blockchain</p>
      </div>
      <p>You will need Metamask or another web3 wallet to begin:</p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/ZIGUC9JAAw8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      <div className='matic-container'>
        <p>You also have to connect to the polygon/matic network:</p>        
      </div>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/arQbnikiooA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <p>
        go to your metamask network tab and select "custom rpc"
      </p>
      <p>enter the following information:</p>
      <div className='custom-rpc-container'>
        <p>Network Name: Matic Mainnet</p>
        <p>New RPC URL: https://rpc-mainnet.matic.network</p>
        <p>Chain ID: 137</p>
        <p>Currency Symbol: MATIC</p>
        <p>Block Explorer URL: https://explorer.matic.network/</p>
      </div>
      <p>You can get matic tokens for gas fees here: <a href='https://matic.supply/' target='_blank'>https://matic.supply/</a></p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/ePRmAa4oHug?start=70" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  );
};
export default Home;