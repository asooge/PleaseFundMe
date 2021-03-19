import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const SingleFund = ({ drizzle, drizzleState, match }) => {
  const [state, setState] = useState({
    funderHash: null,
  });

  useEffect(() => {
    getFunder();
  }, [match.params.id]);
  const getFunder = async () => {
    console.log('get funder');

    // drizle makes a cache call to keep data up to date with the blockchain
    const funderHash = drizzle.contracts.PleaseFundMe.methods.funders.cacheCall(
      match.params.id,
    );
    console.log({ funderHash });
    setState({ funderHash });

    // alternatively you can use Web3 to call the function and receive the data
    const funder = await drizzle.contracts.PleaseFundMe.methods
      .funders(match.params.id)
      .call();
    const { amountRaised, fundBalance, fundTarget, owner, title } = funder;

    console.log({
      amountRaised,
      fundBalance,
      fundTarget,
      owner,
      title,
    });
  };

  const funder = state.funderHash
    ? drizzleState.contracts.PleaseFundMe.funders[state.funderHash]?.value
    : 'loading';

  console.log({ funder });

  return funder ? (
    <div>
      {funder.title}
      {funder.fundTarget}
    </div>
  ) : (
    'Loading . . .'
  );
};

export default withRouter(SingleFund);
