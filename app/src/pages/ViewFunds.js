import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewFunds = ({ appState, drizzle, drizzleState }) => {
  const { getAccountsHash } = appState;
  const fundersCount =
    getAccountsHash &&
    drizzleState.contracts.PleaseFundMe_v3.getAccounts[getAccountsHash]?.value;

  const array = Array();
  for (var i = 0; i < fundersCount; i++) {
    array.push(i);
  }

  return (
    <div>
      <h1>View Funds</h1>
      {array.map((index) => {
        return (
          <div>
            <Link to={`/funds/${index}`}>Fund {index}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ViewFunds;
