import React, { useEffect, useState } from 'react';
import { homePageInputs } from '../components/Form/inputs';
import { Form } from '../components/Form/Form';
import { withRouter } from 'react-router-dom';

const CreateUser = ({ appState, drizzle, drizzleState }) => {
  useEffect(() => {
    users && console.log({ users: users });
  }, [drizzleState.contracts.PleaseFundMe]);
  const { getUsersHash } = appState;
  const users =
    getUsersHash &&
    drizzleState.contracts.PleaseFundMe.getUsers[getUsersHash]?.value;

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
    drizzle.contracts.PleaseFundMe_v3.methods.createHomePage.cacheSend(
      user.username,
      user.aboutMe,
      user.backgroundGradient,
    );
    alert(`Home page created for ${user.username}!`);
  };

  return (
    <div>
      <h1>Create Username</h1>
      <Form
        inputs={homePageInputs}
        values={user}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default withRouter(CreateUser);
