import React, { useEffect, useState } from 'react';
import NavigationLink from '../nav/NavigationLink';
import { homePageInputs } from '../components/Form/inputs';
import { Form } from '../components/Form/Form';

const Home = ({ appState, drizzle, drizzleState }) => {
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
    drizzle.contracts.PleaseFundMe.methods.createHomePage.cacheSend(
      user.username,
      user.aboutMe,
      user.backgroundGradient,
    );
    alert(`Home page created for ${user.username}!`);
  };

  return (
    <div>
      <h1>Home</h1>
      {users &&
        users.map((user) => (
          <NavigationLink
            title={user.username}
            href={`#/pages/${user.id}`}
            style={{ backgroundColor: user.backgroundGradient }}
            key={user.owner}
          />
        ))}
      <h2>Create a Username</h2>
      <div>
        <Form
          inputs={homePageInputs}
          values={user}
          handleChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
