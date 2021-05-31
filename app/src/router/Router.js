import React from 'react';
import NavigationBar from '../nav/NavigationBar';
import { HashRouter, Route } from 'react-router-dom';
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import SingleFund from '../pages/SingleFund/SingleFund';
import UserHome from '../pages/UserHome/UserHome';
import Users from '../pages/Users/Users';
import GetStarted from '../pages/GetStarted/GetStarted';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Router({ appState, setApp, drizzle, drizzleState }) {
  return (
    <div className="App">
      <HashRouter>
        <ToastContainer />
        <NavigationBar />
        <Route exact path="/">
          <Home
            appState={appState}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
        <Route path="/about" component={About} />
        <Route exact path="/funders/:funderId">
          <SingleFund
            appState={appState}
            drizzle={drizzle}
            drizzleState={drizzleState}
          />
        </Route>
        <Route exact path="/users/:userId">
          <UserHome
            appState={appState}
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
        <Route path="/get-started">
          <GetStarted
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
