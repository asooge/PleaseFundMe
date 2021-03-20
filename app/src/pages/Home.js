import React from 'react';
import Logic from './FundMe';

const Home = ({ appState, drizzle, drizzleState }) => {
  const { funderCountHash } = appState;
  const fundersCount =
    funderCountHash &&
    drizzleState.contracts.PleaseFundMe.userCount[funderCountHash]?.value;

  return (
    <div>
      <h1>Home</h1>
      The count is {fundersCount}
      <Logic drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  );
};

export default Home;
