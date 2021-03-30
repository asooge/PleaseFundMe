import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { funderInputs } from '../../components/Form/inputs';
import ContributionForm from './subcomponents/ContributeForm';
import ProgressBar from './subcomponents/ProgressBar';

const SingleFund = ({ drizzle, drizzleState, match }) => {
  const [state, setState] = useState({
    funderHash: null,
  });
  const { funderId } = match.params;

  const [fund, setFund] = useState({
    title: '',
    goal: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    getFunder();
  }, [funderId]);

  const getFunder = async () => {
    const funderHash = drizzle.contracts.PleaseFundMe_v3.methods.getFunderById.cacheCall(
      funderId,
    );
    setState({ funderHash });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFund((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateFunder = async (event) => {
    event.preventDefault();
    drizzle.contracts.PleaseFundMe_v3.methods.updateFunder.cacheSend(
      funderId,
      fund.title,
      fund.goal,
      fund.description,
      123456,
    );
  };

  const withdrawFunder = () => {
    drizzle.contracts.PleaseFundMe_v3.methods.withdraw.cacheSend(funderId);
  };

  const funder =
    state.funderHash &&
    drizzleState.contracts.PleaseFundMe_v3.getFunderById[state.funderHash]
      ?.value;

  console.log({ funder });

  const isOwner = funder && funder.owner == drizzleState.accounts[0];
  return funder ? (
    <div className="single-fund">
      <div className="fund-info">
        <h1>{funder.title}</h1>
        <p>Fund Target: {funder.fundTarget}</p>
        <p>Fund Balance: {funder.fundBalance}</p>
        <p>Total Amount Raised: {funder.amountRaised}</p>
        <p>Description: {funder.description}</p>
        <p>End Date: {funder.endDate}</p>
      </div>
      <div className="side-bar">
        <ProgressBar amount={funder.amountRaised} goal={funder.fundTarget} />
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
          <ContributionForm drizzle={drizzle} funderId={funderId} />
        </div>
      )}
    </div>
  ) : (
    'Loading . . .'
  );
};

export default withRouter(SingleFund);
