import React, { useEffect, useState } from 'react'
import Logic from './FundMe'

const Home = ({ drizzle, drizzleState }) => {

  const [state, setState] = useState({
    funderCountHash: null,
  })

  const fundersCount = state.funderCountHash && drizzleState.contracts.PleaseFundMe.fundersCount[state.funderCountHash]?.value
  console.log({ fundersCount })
  
  useEffect(() => {
    const txHash = drizzle.contracts.PleaseFundMe.methods.fundersCount.cacheCall()
    setState({ funderCountHash: txHash})
  }, [])

  useEffect(() => {
    console.log('count changed')
    console.log(drizzleState)
  }, [drizzleState])
  
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
