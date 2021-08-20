import type { Action } from './actions';

export const initialState = {
  isDrawerOpen: false,
};

type State = typeof initialState;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER': {
      const isDrawerOpen = state.isDrawerOpen ? false : true;
      return { ...state, isDrawerOpen };
    }
  }
};
