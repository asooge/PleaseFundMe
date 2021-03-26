import React, { useEffect, useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { funderInputs } from '../../components/Form/inputs';
import ContributionForm from './subcomponents/ContributeForm';
import ProgressBar from './subcomponents/ProgressBar';

const SingleFund = ({ drizzle, drizzleState, match }) => {
  const [state, setState] = useState({
    funderHash: null,
  });
  const { address, index } = match.params;

  const [fund, setFund] = useState({
    title: '',
    goal: '',
    endDate: '',
    description: '',
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFund((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateFunder = async (event) => {
    event.preventDefault();
    drizzle.contracts.PleaseFundMe.methods.updateFunder.cacheSend(
      index,
      fund.title,
      fund.goal,
    );
  };

  const withdrawFunder = () => {
    drizzle.contracts.PleaseFundMe.methods.withdraw.cacheSend(index);
  };

  const funder =
    state.funderHash &&
    drizzleState.contracts.PleaseFundMe.getUserFunderAtIndex[state.funderHash]
      ?.value;

  const isOwner = address == drizzleState.accounts[0];
  return funder ? (
    <div className="single-fund">
      <div className="fund-info">
        <h1>{funder.title}</h1>
        <p>Fund Target: {funder.fundTarget}</p>
        <p>Fund Balance: {funder.fundBalance}</p>
        <p>Total Amount Raised: {funder.amountRaised}</p>
      </div>
      <div className="side-bar">
        <ProgressBar drizzle={drizzle} drizzleState={drizzleState} />
      </div>
      {isOwner && (
        <div className="fund-info">
          <Form
            inputs={funderInputs}
            values={fund}
            handleChange={handleChange}
            onSubmit={updateFunder}
          />
        </div>
      )}
      {isOwner ? (
        <div className="side-bar">
          <button onClick={withdrawFunder}>withdraw</button>
        </div>
      ) : (
        <div className="side-bar">
          <ContributionForm
            drizzle={drizzle}
            toAddress={address}
            funderIndex={index}
          />
        </div>
      )}
    </div>
  ) : (
    'Loading . . .'
  );
};

export default withRouter(SingleFund);
