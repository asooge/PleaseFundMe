import React, { useState } from 'react';
import { contributeInputs } from '../../../components/Form/inputs';
import { Form } from '../../../components/Form/Form';

const ContributionForm = ({ drizzle, funderId }) => {
  const [state, setState] = useState({
    amount: 0,
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = drizzle.web3.utils.toWei(state.amount, 'ether');
    drizzle.contracts.PleaseFundMe_v3.methods
      .contribute(funderId, state.message)
      .send({ value: amount });
  };

  return (
    <div>
      Contribute
      <Form
        inputs={contributeInputs}
        values={state}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ContributionForm;
