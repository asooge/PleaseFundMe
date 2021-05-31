import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import drizzleOptions from './drizzleOptions';
import './App.scss';
import State from './state/AppState';
import store from './middleware';

const drizzle = new Drizzle(drizzleOptions, store);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          return initialized ? (
            <State drizzle={drizzle} drizzleState={drizzleState} />
          ) : (
            'Loading . . .'
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
};

export default App;
