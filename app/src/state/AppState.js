import React, { useEffect, useState } from 'react';
import Router from '../router/Router';

const AppState = ({ drizzle, drizzleState }) => {
  const [appState, setAppState] = useState({
    getUsersHash: null,
  });

  useEffect(() => {
    const txHash = drizzle.contracts.PleaseFundMe.methods.getUsers.cacheCall();
    // drizzle.contracts.PleaseFundMe.methods.createHomePage.cacheSend('mikey', 'hii', 'yellow', { from: '0x1045EcA16654dD41e35681132d24a4a84AbB84cF', gas: 1250000 })
    setAppState({ getUsersHash: txHash });
  }, []);

  return (
    <div>
      <Router
        appState={appState}
        setApp={setAppState}
        drizzle={drizzle}
        drizzleState={drizzleState}
      />
    </div>
  );
};

export default AppState;
