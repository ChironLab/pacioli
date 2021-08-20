import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Appbar from '../Appbar';
import SideDrawer from '../SideDrawer';
import { useStyles } from './styles';
import { useUiContext } from '../../Context/UiContext';
import { Pages } from '../../Pages';

const MainContainer = () => {
  const classes = useStyles();
  const { state, dispatch } = useUiContext();

  return (
    <main className={classes.root}>
      <CssBaseline />
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
          <Routes pages={Pages} />
        </section>
      </BrowserRouter>
    </main>
  );
};

export default MainContainer;
