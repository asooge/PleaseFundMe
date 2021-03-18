import React from 'react'
// import './App.scss';
import NavigationBar from '../nav/NavigationBar'
import {
  HashRouter,
  Route
} from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'
import ViewFunds from '../pages/ViewFunds'
import SingleFund from '../pages/SingleFund'
import CreateFund from '../pages/CreateFund'
import Logic from '../pages/FundMe'

function Router({ appState, setApp, drizzle, drizzleState }) {
  return (
    <div className="App">
      <HashRouter>
        <NavigationBar/>
        
        <Route exact path="/">
          <Home appState={appState} drizzle={drizzle} drizzleState={drizzleState}/>
        </Route>
        <Route path="/about" component={About}/>
        <Route exact path="/pages">
          <ViewFunds appState={appState} drizzle={drizzle} drizzleState={drizzleState}/>
        </Route>
        <Route path="/pages/:id">
          <SingleFund appState={appState} drizzle={drizzle} drizzleState={drizzleState} />
        </Route>
        <Route path="/create">
          <CreateFund appState={appState} drizzle={drizzle} drizzleState={drizzleState}/>
        </Route>
        <Route path="/logic" >
          <Logic drizzle={drizzle} drizzleState={drizzleState} />
        </Route>
      </HashRouter>
    </div>
  );
}

export default Router;
