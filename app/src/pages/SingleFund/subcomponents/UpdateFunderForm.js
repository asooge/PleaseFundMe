import React, { useState } from 'react';
import { Form } from '../../../components/Form/Form';
import { funderInputs } from '../../../components/Form/inputs';
import { weiToEther, etherToWei, timestampToCalendar } from '../../../helpers/utils.ts';

export const UpdateFunderForm = ({ drizzle, funderId, initialState }) => {
  const [fund, setFund] = useState({
    title: initialState.title,
    goal: weiToEther(initialState.fundTarget),
    endDate: timestampToCalendar(initialState.endDate),
    description: initialState.description,
  });

  console.log(timestampToCalendar(initialState.endDate))

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
      etherToWei(fund.goal),
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
