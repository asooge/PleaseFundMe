import React, { useEffect } from 'react'

const Home = ({ drizzle, drizzleState }) => {
  const readFunderCount = async () => {
    console.log('read')
    // making cache call to keep data updated with blockchain
    const txHash = drizzle.contracts.PleaseFundMe.methods.fundersCount.cacheCall()
    console.log({ txHash })

    // using Web3 to get the data at the exact moment in time
    const count = await drizzle.contracts.PleaseFundMe.methods.fundersCount().call()
    console.log({ count })
  }
  
  useEffect(() => {
    readFunderCount()
  }, [])
  
  return(
    <div>
      Home
      <button>
        Read Funder Count
      </button>
    </div>
  )
}

export default Home
