import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UpdateHomePage from './subcomponents/UpdateHomePage';

const UserHome = ({ appState, drizzle, drizzleState, match }) => {
  useEffect(() => {
    users && console.log({ users: users });
  }, [drizzleState.contracts.PleaseFundMe]);
  const { getUsersHash } = appState;
  const users =
    getUsersHash &&
    drizzleState.contracts.PleaseFundMe.getUsers[getUsersHash]?.value;

  const id = match.params.id;

  const user = users && users[id];
  console.log(user);

  return user ? (
    <div
      className="user-home"
      style={{ backgroundColor: user.backgroundGradient }}>
      <h1>Hello</h1>
      <h2>{user.username}</h2>
      <p>{user.aboutMe}</p>
      <p>{user.owner}</p>
      <UpdateHomePage
        appState={appState}
        drizzle={drizzle}
        drizzleState={drizzleState}
      />
    </div>
  ) : null;
};

export default withRouter(UserHome);
