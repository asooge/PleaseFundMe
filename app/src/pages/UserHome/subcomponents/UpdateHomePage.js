import React, { useEffect, useState } from 'react';
import { homePageInputs } from '../../../components/Form/inputs';
import { Form } from '../../../components/Form/Form';

const UpdateHomePage = ({ appState, drizzle, drizzleState, match }) => {
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
    drizzle.contracts.PleaseFundMe.methods.updateHomePage.cacheSend(
      user.username,
      user.aboutMe,
      user.backgroundGradient,
      { gas: 1043200 },
    );
    alert('User updated!');
  };

  return (
    <div>
      Update
      <Form
        inputs={homePageInputs}
        values={user}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdateHomePage;
