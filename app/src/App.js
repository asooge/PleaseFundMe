import React, { useEffect } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import drizzleOptions from './drizzleOptions';
import './App.scss';
import State from './state/AppState';
import Home from './pages/Home/Home';
import store from './middleware';

const drizzle = new Drizzle(drizzleOptions, store);

const App = () => {
  useEffect(() => {
    const loadMetamask = async () => {
      const metamask = window.ethereum;
      await metamask.enable();
      metamask.on('accountsChanged', (accounts) => {
        window.location.reload();
      });
      metamask.on('networkChanged', (networkId) => {
        window.location.reload();
      });
    };
    window.ethereum && loadMetamask();
  }, [])
  return window.ethereum ? (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          return initialized ? (
            <State
              drizzle={drizzle}
              drizzleState={drizzleState}
              networkId={window.ethereum.networkVersion}
            />
          ) : (
            "Loading App . . ."
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  ) : <Home />;
};

export default App;
