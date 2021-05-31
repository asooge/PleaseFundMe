import React, { useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UpdateHomePage from './subcomponents/UpdateHomePage';
import NavigationLink from '../../components/NavigationLink/NavigationLink';
import CreateFunder from './CreateFunder/CreateFunder';
import { weiToEther } from '../../helpers/utils';
import './UserHome.scss';

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
    const userFriends = await drizzle.contracts.PleaseFundMe.methods
      .getUserFriends(userId)
      .call();
    setState((prevState) => ({ ...prevState, userFriends }));
  };

  useEffect(() => {
    const accountIdHash = drizzle.contracts.PleaseFundMe.methods.getAccountById.cacheCall(
      userId,
    );
    getUserFriends();
    setState({ accountIdHash });
  }, [userId, drizzle.contracts.PleaseFundMe.methods.getAccountById]);

  const user = useMemo(() => {
    return (
      accountIdHash &&
      drizzleState.contracts.PleaseFundMe.getAccountById[accountIdHash]
        ?.value
    );
  }, [accountIdHash, drizzleState]);

  useEffect(() => {
    const userFundersHash =
      user &&
      drizzle.contracts.PleaseFundMe.methods.getUserFunders.cacheCall(
        user.id,
      );
    setState((prevState) => ({
      ...prevState,
      userFundersHash,
    }));
  }, [user, drizzle.contracts.PleaseFundMe.methods.getUserFunders]);

  const addFriend = () => {
    drizzle.contracts.PleaseFundMe.methods.addFriend.cacheSend(userId);
  };

  const { userFundersHash } = state;

  const userFunders =
    userFundersHash &&
    drizzleState.contracts.PleaseFundMe.getUserFunders[userFundersHash]
      ?.value;

  const isOwner = user && user.owner === drizzleState.accounts[0];
  const isUser = appState.userId !== noUserValue;
  const isUserFriend = appState.userFriends?.some(
    (friend) => friend.id == userId,
  );

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
        isUser &&
        !isUserFriend && (
          <div>
            <button onClick={addFriend}>Add Friend</button>
          </div>
        )
      )}
      <div className="friends-container">
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
        <h3>Funders</h3>
        {userFunders &&
          userFunders.map((funder) => (
            <div key={funder.id}>
              <NavigationLink
                title={`${funder.title}, ${weiToEther(funder.fundTarget)}`}
                href={`#/funders/${funder.id}`}
              />
            </div>
          ))}
      </div>
    </div>
  ) : null;
};

export default withRouter(UserHome);
