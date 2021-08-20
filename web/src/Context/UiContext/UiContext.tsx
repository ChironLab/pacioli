import React from 'react';
import { reducer, initialState } from './reducer';
import type { Action } from './actions';

type Props = {
  children: JSX.Element | JSX.Element[];
};

interface UIContext {
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}

const UiContext = React.createContext({} as UIContext);

export const UiProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UiContext.Provider value={{ state, dispatch }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => React.useContext(UiContext);
