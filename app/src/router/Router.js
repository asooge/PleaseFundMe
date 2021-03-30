import React from 'react';
import NavigationBar from '../nav/NavigationBar';
import { HashRouter, Route } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';
import ViewFunds from '../pages/ViewFunds';
import SingleFund from '../pages/SingleFund/SingleFund';
import CreateFund from '../pages/CreateFund';
import UserHome from '../pages/UserHome/UserHome';
import Users from '../pages/Users';
import CreateUser from '../pages/CreateUser';

function Router({ appState, setApp, drizzle, drizzleState }) {
  return (
    <div className="App">
      <HashRouter>
        <NavigationBar />

        <Route exact path="/">
          <Home
            appState={appState}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
        <Route path="/about" component={About} />
        <Route exact path="/funds">
          <ViewFunds
            appState={appState}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
        <Route exact path="/funders/:funderId">
          <SingleFund
            appState={appState}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
        <Route path="/create">
          <CreateFund
            appState={appState}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
        <Route exact path="/users/:userId">
          <UserHome
            appState={appState}
            setApp={setApp}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
        <Route exact path="/users">
          <Users
            appState={appState}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
        <Route path="/create-user">
          <CreateUser
            appState={appState}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
      </HashRouter>
    </div>
  );
}

export default Router;
