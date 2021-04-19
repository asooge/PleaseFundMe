import React, { useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UpdateHomePage from './subcomponents/UpdateHomePage';
import NavigationLink from '../../nav/NavigationLink';
import CreateFunder from './CreateFunder/CreateFunder';

const noUserValue =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

const UserHome = ({ appState, drizzle, drizzleState, match }) => {
  const { userId } = match.params;

  const [state, setState] = useState({
    accountIdHash: null,
    userFundersHash: null,
    userFriends: [],
  });
  const { accountIdHash } = state;

  const getUserFriends = async () => {
    const userFriends = await drizzle.contracts.PleaseFundMe_v3.methods
      .getUserFriends(userId)
      .call();
    console.log({ userFriends });
    setState((prevState) => ({ ...prevState, userFriends }));
  };

  useEffect(() => {
    const accountIdHash = drizzle.contracts.PleaseFundMe_v3.methods.getAccountByid.cacheCall(
      userId,
    );
    getUserFriends();
    setState({ accountIdHash });
  }, [userId, drizzle.contracts.PleaseFundMe_v3.methods.getAccountByid]);

  const user = useMemo(() => {
    return (
      accountIdHash &&
      drizzleState.contracts.PleaseFundMe_v3.getAccountByid[accountIdHash]
        ?.value
    );
  }, [accountIdHash, drizzleState]);

  useEffect(() => {
    const userFundersHash =
      user &&
      drizzle.contracts.PleaseFundMe_v3.methods.getUserFunders.cacheCall(
        user.id,
      );
    setState((prevState) => ({
      ...prevState,
      userFundersHash,
    }));
  }, [user, drizzle.contracts.PleaseFundMe_v3.methods.getUserFunders]);

  const addFriend = () => {
    console.log('add friend');
    drizzle.contracts.PleaseFundMe_v3.methods.addFriend.cacheSend(userId);
  };

  const { userFundersHash } = state;

  const userFunders =
    userFundersHash &&
    drizzleState.contracts.PleaseFundMe_v3.getUserFunders[userFundersHash]
      ?.value;

  const isOwner = user && user.owner === drizzleState.accounts[0];
  const isUser = appState.userId !== noUserValue;

  return user ? (
    <div
      className="user-home"
      style={{ backgroundColor: user.backgroundGradient }}>
      <h2>{user.username}</h2>
      <p>{user.aboutMe}</p>
      <p>{user.owner}</p>
      {isOwner && (
        <UpdateHomePage
          drizzle={drizzle}
          drizzleState={drizzleState}
          user={user}
        />
      )}
      {isOwner ? (
        <div className="create-funder-form">
          <CreateFunder drizzle={drizzle} />
        </div>
      ) : (
        isUser && (
          <div>
            <button onClick={addFriend}>Add Friend</button>
          </div>
        )
      )}
      <div id="friends-container">
        <h3>Friends</h3>
        {state.userFriends?.map((friend) => (
          <NavigationLink
            title={friend.username}
            href={`#/users/${friend.id}`}
            key={friend.id}
          />
        ))}
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
