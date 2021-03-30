import React, { useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UpdateHomePage from './subcomponents/UpdateHomePage';
import NavigationLink from '../../nav/NavigationLink';
import CreateFunder from './subcomponents/CreateFunder/CreateFunder';

const UserHome = ({ appState, setApp, drizzle, drizzleState, match }) => {
  const { userId } = match.params;

  const [state, setState] = useState({ accountIdHash: null });
  const { accountIdHash } = state;

  useEffect(() => {
    const accountIdHash = drizzle.contracts.PleaseFundMe_v3.methods.getAccountByid.cacheCall(
      userId,
    );
    setState({ accountIdHash: accountIdHash });
  }, []);

  const user = useMemo(() => {
    return (
      accountIdHash &&
      drizzleState.contracts.PleaseFundMe_v3.getAccountByid[accountIdHash]
        ?.value
    );
  }, [accountIdHash, drizzleState]);

  useEffect(() => {
    console.log(user);
    const userFundersHash =
      user &&
      drizzle.contracts.PleaseFundMe_v3.methods.getUserFunders.cacheCall(
        user.id,
      );
    setApp((prevState) => ({
      ...prevState,
      userFundersHash,
    }));
  }, [user]);

  const { userFundersHash } = appState;

  const userFunders =
    userFundersHash &&
    drizzleState.contracts.PleaseFundMe_v3.getUserFunders[userFundersHash]
      ?.value;

  const isOwner = user && user.owner == drizzleState.accounts[0];

  return user ? (
    <div
      className="user-home"
      style={{ backgroundColor: user.backgroundGradient }}>
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
                href={`#/funders/${funder.id}`}
                key={user.owner}
              />
            </div>
          ))}
      </div>
    </div>
  ) : null;
};

export default withRouter(UserHome);
