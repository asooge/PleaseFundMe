import React, { useEffect, useState } from 'react';
import Router from '../router/Router';

const AppState = ({ drizzle, drizzleState }) => {
  const [appState, setAppState] = useState({
    getAccountsHash: null,
    getUserIdHash: null,
    userId: null,
    userFriends: [],
  });

  useEffect(async () => {
    const getAccountsHash = drizzle.contracts.PleaseFundMe_v3.methods.getAccounts.cacheCall();
    const getUserIdHash = drizzle.contracts.PleaseFundMe_v3.methods.getUserId.cacheCall();
    const userId = await drizzle.contracts.PleaseFundMe_v3.methods
      .getUserId()
      .call();
    const userFriends = await drizzle.contracts.PleaseFundMe_v3.methods
      .getUserFriends(userId)
      .call();
    setAppState({ getAccountsHash, getUserIdHash, userId, userFriends });
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
