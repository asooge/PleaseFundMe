import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ContributionForm from './subcomponents/ContributeForm';
import ProgressBar from './subcomponents/ProgressBar';
import { UpdateFunderForm } from './subcomponents/UpdateFunderForm';
import { weiToEther, timestampToDateString } from '../../helpers/utils';
import './SingleFund.scss';

const SingleFund = ({ drizzle, drizzleState, match }) => {
  const [state, setState] = useState({
    funderHash: null,
    getFunderContributionsHash: null,
  });
  const { funderId } = match.params;

  useEffect(() => {
    const funderHash = drizzle.contracts.PleaseFundMe.methods.getFunderById.cacheCall(
      funderId,
    );
    const getFunderContributionsHash = drizzle.contracts.PleaseFundMe.methods.getFunderContributions.cacheCall(
      funderId,
    );
    setState({ funderHash, getFunderContributionsHash });
  }, [funderId, drizzle.contracts.PleaseFundMe.methods.getFunderById]);

  const withdrawFunder = () => {
    drizzle.contracts.PleaseFundMe.methods.withdraw.cacheSend(funderId);
  };

  const funder =
    state.funderHash &&
    drizzleState.contracts.PleaseFundMe.getFunderById[state.funderHash]
      ?.value;

  const contributions =
    state.getFunderContributionsHash &&
    drizzleState.contracts.PleaseFundMe.getFunderContributions[
      state.getFunderContributionsHash
    ]?.value;
  const isOwner = funder && funder.owner === drizzleState.accounts[0];
  return funder ? (
    <div className="single-fund">
      <div className="fund-info">
        <h1>{funder.title}</h1>
        <p>Fund Target: {weiToEther(funder.fundTarget)}</p>
        <p>Fund Balance: {weiToEther(funder.fundBalance)}</p>
        <p>Total Amount Raised: {weiToEther(funder.amountRaised)} Matic</p>
        <p>Description: {funder.description}</p>
        <p>Start Date: {timestampToDateString(funder.startDate)}</p>
        <p>End Date: {timestampToDateString(funder.endDate)}</p>
        <p>Last Updated: {timestampToDateString(funder.updatedAt)}</p>
      </div>
      <div className="side-bar">
        <ProgressBar amount={weiToEther(funder.amountRaised)} goal={weiToEther(funder.fundTarget)} />
      </div>
      {isOwner && (
        <UpdateFunderForm
          drizzle={drizzle}
          funderId={funder.id}
          initialState={funder}
        />
      )}
      {isOwner ? (
        <div className="side-bar">
          <button onClick={withdrawFunder}>withdraw</button>
        </div>
      ) : (
        <div className="side-bar">
          <ContributionForm drizzle={drizzle} funderId={funderId} />
        </div>
      )}

      <div className="contributions-container">
        <h3>Contributions:</h3>
        {contributions?.map((contribution) => (
          <div key={contribution.id} className="contribution">
            <p>message: {contribution.message}</p>
            <p>amount: {weiToEther(contribution.amount)} Matic</p>
            <p>contributer: {contribution.contributer}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    'Loading . . .'
  );
};

export default withRouter(SingleFund);
