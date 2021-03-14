import React, { useState } from 'react';
import { drizzleConnect } from '@drizzle/react-plugin';

const Home = ({ drizzle, drizzleState }) => {

  const [state, updateState] = useState({

  })
  const account = drizzleState.accounts[0];

  const createFunder = async () => {
    console.log('click')
    console.log(account)
    const stackId = await drizzle.contracts.PleaseFundMe.methods.createFunder.cacheSend('test gas', 500, { gas: 104320 })

    console.log({ stackId })
    console.log({ drizzleState })
    const txHash = drizzleState.transactionStack[stackId]
    const status = drizzleState.transactions[txHash]?.status
    console.log({ status })
  }

  const updateFunder = () => {
    console.log('update funder')
    const stackId = drizzle.contracts.PleaseFundMe.methods.updateFunder.cacheSend('updated funder title', 777, { gas: 104320 })

    console.log({ stackId })
  }

  const readFunderCount = async () => {
    console.log('read')
    // making cache call to keep data updated with blockchain
    const txHash = drizzle.contracts.PleaseFundMe.methods.fundersCount.cacheCall()
    console.log({ txHash })

    // using Web3 to get the data at the exact moment in time
    const count = await drizzle.contracts.PleaseFundMe.methods.fundersCount().call()
    console.log({ count })
  }

  const getFunder = async () => {
    console.log('get funder')

    // drizle makes a cache call to keep data up to date with the blockchain
    const funderHash = drizzle.contracts.PleaseFundMe.methods.funders.cacheCall(11)
    console.log({ funderHash })

    // alternatively you can use Web3 to call the function and receive the data
    const funder = await drizzle.contracts.PleaseFundMe.methods.funders(11).call();
    const {
      amountRaised,
      fundBalance,
      fundTarget,
      owner,
      title,
    } = funder;

    console.log({
      amountRaised,
      fundBalance,
      fundTarget,
      owner,
      title,
    })
  }

  return (
    <div>
      <h1>Home</h1>

      <button onClick={createFunder} >Create Funder</button>

      <button onClick={readFunderCount} >Get Funders Count</button>

      <button onClick={getFunder} >Get Funder</button>

      <button onClick={updateFunder} >Update Funder</button>
    </div>
  )
}


export default (Home);