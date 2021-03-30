import React, { useEffect, useState } from 'react';
import NavigationLink from '../nav/NavigationLink';
import { homePageInputs } from '../components/Form/inputs';
import { Form } from '../components/Form/Form';

const Users = ({ appState, drizzle, drizzleState }) => {
  const { getUsersHash } = appState;
  const users =
    getUsersHash &&
    drizzleState.contracts.PleaseFundMe_v3.getAccounts[getUsersHash]?.value;

  const [user, setUser] = useState({
    username: '',
    aboutMe: '',
    backgroundGradient: '',
  });

  console.log({ user });
  console.log({ users });

  return (
    <div>
      <h1>Users</h1>
      {users &&
        users.map((user) => (
          <NavigationLink
            title={user.username}
            href={`#/users/${user.id}`}
            style={{ backgroundColor: user.backgroundGradient }}
            key={user.owner}
          />
        ))}
    </div>
  );
};

export default Users;
