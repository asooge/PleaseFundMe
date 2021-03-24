import React, { useEffect, useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from '../components/Form/Form';
import { funderInputs } from '../components/Form/inputs';

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

  const funder =
    state.funderHash &&
    drizzleState.contracts.PleaseFundMe.getUserFunderAtIndex[state.funderHash]
      ?.value;

  const isOwner = address == drizzleState.accounts[0];
  return funder ? (
    <div>
      <div>
        {funder.title}
        {funder.fundTarget}
      </div>
      {isOwner && (
        <Form
          inputs={funderInputs}
          values={fund}
          handleChange={handleChange}
          onSubmit={updateFunder}
        />
      )}
    </div>
  ) : (
    'Loading . . .'
  );
};

export default withRouter(SingleFund);
