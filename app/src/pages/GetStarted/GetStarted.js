import React, { useState } from 'react';
import { homePageInputs } from '../../components/Form/inputs';
import { Form } from '../../components/Form/Form';
import { withRouter } from 'react-router-dom';

const GetStarted = ({ drizzle }) => {
  const [user, setUser] = useState({
    username: '',
    aboutMe: '',
    backgroundGradient: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    drizzle.contracts.PleaseFundMe.methods.createHomePage.cacheSend(
      user.username,
      user.aboutMe,
      user.backgroundGradient,
    );
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <Form
        inputs={homePageInputs}
        values={user}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default withRouter(GetStarted);
