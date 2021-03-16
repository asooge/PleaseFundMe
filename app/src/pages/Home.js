import React, { useEffect, useState } from 'react'
import Logic from './FundMe'

const Home = ({ drizzle, drizzleState }) => {

  const [state, setState] = useState({
    funderCountHash: null,
  })

  const fundersCount = state.funderCountHash && drizzleState.contracts.PleaseFundMe.fundersCount[state.funderCountHash]?.value
  
  useEffect(() => {
    const txHash = drizzle.contracts.PleaseFundMe.methods.fundersCount.cacheCall()
    setState({ funderCountHash: txHash})
  }, [])
 
  return(
    <div>
      Home
      <button>
        The count is {fundersCount}
      </button>
      <Logic drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  )
}

export default Home
