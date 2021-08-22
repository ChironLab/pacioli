import React from 'react';
import { Route } from 'react-router-dom';
import Appbar from './Components/Appbar';
import SideDrawer from './Components/SideDrawer';
import { useUiContext } from '../../Context/UiContext';
import { useStyles } from './styles';

import { Vendor } from './Vendor';
import { Customer } from './Customer';
import { Accountant } from './Accountant';
import { Dashboard } from './Dashboard';

const pages = [Dashboard, Vendor, Customer, Accountant];

const Home = () => {
  const classes = useStyles();
  const { state, dispatch } = useUiContext();

  return (
    <main className={classes.root}>
      <Appbar
        isDrawerOpen={state.isDrawerOpen}
        toggleDrawer={() => dispatch({ type: 'TOGGLE_DRAWER' })}
      />
      <SideDrawer
        isDrawerOpen={state.isDrawerOpen}
        toggleDrawer={() => dispatch({ type: 'TOGGLE_DRAWER' })}
        pages={pages}
      />
      <section className={classes.content}>
        <div className={classes.toolbar} />
        {pages.map((page) => (
          <Route {...page.route} key={`Route_${page.meta.name}`} />
        ))}
      </section>
    </main>
  );
};

export default Home;
