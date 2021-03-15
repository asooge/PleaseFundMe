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

function Router({ drizzle, drizzleState }) {
  return (
    <div className="App">
      Router
      <HashRouter>
        <NavigationBar/>
        
        <Route exact path="/">
          <Home drizzle={drizzle} drizzleState={drizzleState}/>
        </Route>
        <Route path="/about" component={About}/>
        <Route exact path="/pages" component={ViewFunds}/>
        <Route path="/pages/:id" component={SingleFund}/>
        <Route path="/create" component={CreateFund}/>
        <Route path="/logic" >
          <Logic drizzle={drizzle} drizzleState={drizzleState} />
        </Route>
      </HashRouter>
    </div>
  );
}

export default Router;
