import React, { useEffect, useState } from 'react';
import Router from '../router/Router';

const AppState = ({ drizzle, drizzleState }) => {
  const [appState, setAppState] = useState({
    getAccountsHash: null,
    userId: null,
    userFriends: [],
  });

  const getUserData = async () => {
    const userId = await drizzle.contracts.PleaseFundMe_v3.methods
      .getUserId()
      .call();
    const userFriends = await drizzle.contracts.PleaseFundMe_v3.methods
      .getUserFriends(userId)
      .call();
    setAppState((prevState) => ({ ...prevState, userId, userFriends }));
  };

  useEffect(() => {
    const getAccountsHash = drizzle.contracts.PleaseFundMe_v3.methods.getAccounts.cacheCall();
    getUserData();
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
