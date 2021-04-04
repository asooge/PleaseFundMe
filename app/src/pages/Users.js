import React from 'react';
import NavigationLink from '../nav/NavigationLink';

const Users = ({ appState, drizzleState }) => {
  const { getAccountsHash } = appState;
  const users =
    getAccountsHash &&
    drizzleState.contracts.PleaseFundMe_v3.getAccounts[getAccountsHash]?.value;

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
