import React, { useEffect, useState } from 'react';
import Router from '../router/Router';

const AppState = ({ drizzle, drizzleState }) => {
  const [appState, setAppState] = useState({
    getUsersHash: null,
  });

  useEffect(() => {
    const txHash = drizzle.contracts.PleaseFundMe_v3.methods.getAccounts.cacheCall();
    // drizzle.contracts.PleaseFundMe.methods.createHomePage.cacheSend(
    //   'miketsuji',
    //   'hello',
    //   'yellow',
    //   { from: '0x4721AcaC089c31B42c74948DC09d3a1a4626fD5F', gas: 1250000 },
    // );
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
