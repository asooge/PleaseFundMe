import React, { useEffect, useState } from 'react';
import Router from '../router/Router';

const AppState = ({ drizzle, drizzleState, networkId }) => {
  const [appState, setAppState] = useState({
    getAccountsHash: null,
    userId: null,
    userFriends: [],
    networkId,
  });

  const getUserData = async () => {
    const userId = await drizzle.contracts.PleaseFundMe.methods
      .getUserId()
      .call();
    const userFriends = await drizzle.contracts.PleaseFundMe.methods
      .getUserFriends(userId)
      .call();
    setAppState((prevState) => ({ ...prevState, userId, userFriends }));
  };

  useEffect(() => {
    const getAccountsHash = drizzle.contracts.PleaseFundMe?.methods.getAccounts.cacheCall();
    getUserData();
    setAppState((prevState) => ({ ...prevState, getAccountsHash }));
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
