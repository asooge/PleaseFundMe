import React, { useEffect, useState } from 'react'
import Router from '../router/Router'

const AppState = ({ drizzle, drizzleState }) => {

  const [appState, setAppState] = useState({
    funderCountHash: null,
  })

  
  useEffect(() => {
    const txHash = drizzle.contracts.PleaseFundMe.methods.fundersCount.cacheCall()
    setAppState({ funderCountHash: txHash})
  }, [])
 
  return(
    <div>
      <Router appState={appState} setApp={setAppState} drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  )
}

export default AppState