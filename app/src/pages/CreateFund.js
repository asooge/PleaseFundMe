import React, { useState } from 'react';

const CreateFund = ({ drizzle, drizzleState }) => {
  const [fund, setFund] = useState({
    title: '',
    goal: '',
    endDate: '',
    description: '',
  });

  const account = drizzleState.accounts[0];

  const handleChange = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setFund((prevState) => {
      const updatedState = {
        title: prevState.title,
        goal: prevState.goal,
        endDate: prevState.endDate,
        description: prevState.description,
        [name]: newValue,
      };
      return updatedState;
    });
  };

  const createFunder = async (event) => {
    event.preventDefault();
    console.log('click');
    console.log(account);
    const stackId = await drizzle.contracts.PleaseFundMe.methods.createFunder.cacheSend(
      fund.title,
      fund.goal,
      { gas: 1043200 },
    );

    console.log({ stackId });
    console.log({ drizzleState });
    const txHash = drizzleState.transactionStack[stackId];
    const status = drizzleState.transactions[txHash]?.status;
    console.log({ status });
    alert('Fund ' + fund.title + ' submitted!');
  };

  return (
    <div>
      <form onSubmit={createFunder}>
        <label>Title</label>
        <input
          type="text"
          value={fund.title}
          onChange={handleChange}
          name="title"></input>
        <label>Fund Value</label>
        <input
          type="number"
          value={fund.goal}
          onChange={handleChange}
          name="goal"></input>
        <label>Target Date</label>
        <input
          type="date"
          value={fund.endDate}
          onChange={handleChange}
          name="endDate"></input>
        <label>Description</label>
        <input
          type="text"
          value={fund.description}
          onChange={handleChange}
          name="description"></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateFund;
