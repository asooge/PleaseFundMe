import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const ProgressBar = ({ drizzle, drizzleState, match }) => {
  const [state, setState] = useState({
    funderHash: null,
  });
  const { address, index } = match.params;

  useEffect(() => {
    getFunder();
  }, [index]);

  const getFunder = async () => {
    const funderHash = drizzle.contracts.PleaseFundMe.methods.getUserFunderAtIndex.cacheCall(
      address,
      index,
    );
    setState({ funderHash });
  };

  const funder =
    state.funderHash &&
    drizzleState.contracts.PleaseFundMe.getUserFunderAtIndex[state.funderHash]
      ?.value;

  return funder ? (
    <div>
      <h2>Amount Raised</h2>
      <p>
        {funder.amountRaised} out of {funder.fundTarget}
      </p>
      <progress value={funder.amountRaised} max={funder.fundTarget} />
    </div>
  ) : (
    'Loading...'
  );
};

export default withRouter(ProgressBar);
