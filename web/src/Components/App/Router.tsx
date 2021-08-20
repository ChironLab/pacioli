import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Appbar from '../Appbar';
import SideDrawer from '../SideDrawer';
import { useStyles } from './styles';
import { useUiContext } from '../../Context/UiContext';
import { Pages } from '../../Pages';

const Router = () => {
  const classes = useStyles();
  const { state, dispatch } = useUiContext();

  return (
    <BrowserRouter>
      <Appbar
        isDrawerOpen={state.isDrawerOpen}
        toggleDrawer={() => dispatch({ type: 'TOGGLE_DRAWER' })}
      />
      <SideDrawer
        isDrawerOpen={state.isDrawerOpen}
        toggleDrawer={() => dispatch({ type: 'TOGGLE_DRAWER' })}
        pages={Pages}
      />
      <section className={classes.content}>
        <div className={classes.toolbar} />
        {Pages.map((page) => (
          <Route {...page.route} key={`Route_${page.meta.name}`} />
        ))}
      </section>
    </BrowserRouter>
  );
};

export default Router;
