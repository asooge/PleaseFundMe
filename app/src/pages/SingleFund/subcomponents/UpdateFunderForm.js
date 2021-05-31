import React, { useState } from 'react';
import { Form } from '../../../components/Form/Form';
import { funderInputs } from '../../../components/Form/inputs';
import web3 from 'web3';

export const UpdateFunderForm = ({ drizzle, funderId, initialState }) => {
  const [fund, setFund] = useState({
    title: initialState.title,
    goal: web3.utils.fromWei(initialState.fundTarget, 'ether'),
    endDate: new Date(parseInt(initialState.endDate) * 1000)
      .toISOString()
      .slice(0, 10), // @TODO helper convert timestamp to iso string
    description: initialState.description,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFund((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateFunder = async (event) => {
    event.preventDefault();
    const datum = Date.parse(fund.endDate) / 1000;
    drizzle.contracts.PleaseFundMe.methods.updateFunder.cacheSend(
      funderId,
      fund.title,
      web3.utils.toWei(fund.goal, 'ether'),
      fund.description,
      datum,
    );
  };
  return (
    <div className="fund-info">
      <Form
        inputs={funderInputs}
        values={fund}
        handleChange={handleChange}
        onSubmit={updateFunder}
      />
    </div>
  );
};
