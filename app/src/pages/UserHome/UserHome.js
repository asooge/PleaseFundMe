import React, { useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import UpdateHomePage from './subcomponents/UpdateHomePage';
import NavigationLink from '../../nav/NavigationLink';
import CreateFunder from './subcomponents/CreateFunder/CreateFunder';

const UserHome = ({ appState, setApp, drizzle, drizzleState, match }) => {
  const { getUsersHash } = appState;

  const users = useMemo(() => {
    return (
      getUsersHash &&
      drizzleState.contracts.PleaseFundMe.getUsers[getUsersHash]?.value
    );
  }, [getUsersHash, drizzleState]);

  const { id } = match.params;

  const user = useMemo(() => {
    return users && users[id];
  }, [users, id]);

  useEffect(() => {
    const userFundersHash =
      user &&
      drizzle.contracts.PleaseFundMe.methods.getUserFunders.cacheCall(
        user.owner,
      );
    setApp((prevState) => ({
      ...prevState,
      userFundersHash,
    }));
  }, [user]);

  const { userFundersHash } = appState;

  const userFunders =
    userFundersHash &&
    drizzleState.contracts.PleaseFundMe.getUserFunders[userFundersHash]?.value;

  const isOwner = user && user.owner == drizzleState.accounts[0];

  return user ? (
    <div
      className="user-home"
      style={{ backgroundColor: user.backgroundGradient }}>
      <h1>Hello</h1>
      <h2>{user.username}</h2>
      <p>{user.aboutMe}</p>
      <p>{user.owner}</p>
      {isOwner && (
        <UpdateHomePage
          appState={appState}
          drizzle={drizzle}
          drizzleState={drizzleState}
          user={user}
        />
      )}
      <div className="create-funder-form">
        {isOwner && <CreateFunder drizzle={drizzle} />}
      </div>
      <div className="funders-container">
        {userFunders &&
          userFunders.map((funder) => (
            <div>
              <NavigationLink
                title={`${funder.title}, ${funder.fundTarget}`}
                href={`#/users/${user.owner}/${funder.id}`}
                key={user.owner}
              />
            </div>
          ))}
      </div>
    </div>
  ) : null;
};

export default withRouter(UserHome);
