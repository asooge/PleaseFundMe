import React, { useEffect, useState } from 'react';
import { homePageInputs } from '../../../components/Form/inputs';
import { Form } from '../../../components/Form/Form';

const UpdateHomePage = ({ appState, drizzle, drizzleState, match, user }) => {
  const [state, setState] = useState({
    username: user.username,
    aboutMe: user.aboutMe,
    backgroundGradient: user.backgroundGradient,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    drizzle.contracts.PleaseFundMe.methods.updateHomePage.cacheSend(
      state.username,
      state.aboutMe,
      state.backgroundGradient,
    );
  };

  return (
    <div>
      Update
      <Form
        inputs={homePageInputs}
        values={state}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdateHomePage;
