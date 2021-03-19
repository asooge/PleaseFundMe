import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewFunds = ({ appState, drizzle, drizzleState }) => {
  const { funderCountHash } = appState;
  const fundersCount =
    funderCountHash &&
    drizzleState.contracts.PleaseFundMe.fundersCount[funderCountHash]?.value;

  const array = Array();
  for (var i = 0; i < fundersCount; i++) {
    array.push(i);
  }

  return (
    <div>
      {array.map((index) => {
        return (
          <div>
            <Link to={`/pages/${index}`}>Fund {index + 1}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ViewFunds;
