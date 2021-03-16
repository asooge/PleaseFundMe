import React from 'react'
import Logic from './FundMe'

const Home = ({ appState, drizzle, drizzleState }) => {

  const { funderCountHash } = appState
  const fundersCount = funderCountHash && drizzleState.contracts.PleaseFundMe.fundersCount[funderCountHash]?.value
 
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
