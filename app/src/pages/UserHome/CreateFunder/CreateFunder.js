import React, { useState } from 'react';
import { Form } from '../../../components/Form/Form';
import { funderInputs } from '../../../components/Form/inputs';
import web3 from 'web3';

const CreateFunder = ({ drizzle }) => {
  const [fund, setFund] = useState({
    title: '',
    goal: '',
    endDate: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFund((prevState) => ({ ...prevState, [name]: value }));
  };

  const createFunder = async (event) => {
    event.preventDefault();
    drizzle.contracts.PleaseFundMe.methods.createFunder.cacheSend(
      fund.title,
      web3.utils.toWei(fund.goal, 'ether'),
      fund.description,
      Date.parse(fund.endDate) / 1000,
    );
  };

  return (
    <div>
      <h1>Create a Funder</h1>
      <Form
        inputs={funderInputs}
        values={fund}
        handleChange={handleChange}
        onSubmit={createFunder}
      />
    </div>
  );
};

export default CreateFunder;
