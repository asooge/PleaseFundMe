import React, { useEffect, useState } from 'react';
import Router from '../router/Router';

const AppState = ({ drizzle, drizzleState }) => {
  const [appState, setAppState] = useState({
    getAccountsHash: null,
  });

  useEffect(() => {
    const getAccountsHash = drizzle.contracts.PleaseFundMe_v3.methods.getAccounts.cacheCall();
    setAppState({ getAccountsHash });
  }, [drizzle.contracts.PleaseFundMe_v3.methods.getAccounts]);

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
