import React, { useEffect } from 'react';
import NavigationLink from '../nav/NavigationLink';

const Home = ({ appState, drizzle, drizzleState }) => {
  useEffect(() => {
    users && console.log({ users: users });
  }, [drizzleState.contracts.PleaseFundMe]);
  const { getUsersHash } = appState;
  const users =
    getUsersHash &&
    drizzleState.contracts.PleaseFundMe.getUsers[getUsersHash]?.value;

  return (
    <div>
      <h1>Home</h1>
      {users &&
        users.map((user) => (
          <NavigationLink
            title={user.username}
            href={`#/pages/${user.owner}`}
            style={{ backgroundColor: user.backgroundGradient }}
            key={user.owner}
          />
        ))}
    </div>
  );
};

export default Home;
