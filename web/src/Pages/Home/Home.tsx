import React from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Appbar from './Components/Appbar';
import SideDrawer from './Components/SideDrawer';
import { useStyles } from './styles';
import { pages } from './Pages';

const Home = () => {
  const classes = useStyles();
  const [isDrawerOpen, toggleDrawer] = React.useState(false);
  const [isModalOpen, toggleModal] = React.useState(false);

  return (
    <main className={classes.root}>
      <CssBaseline />
      <Appbar
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={() => toggleDrawer((prevState) => !prevState)}
      />
      <SideDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={() => toggleDrawer((prevState) => !prevState)}
        pages={pages}
      />
      <section className={classes.content}>
        <div className={classes.toolbar} />
        {pages.map((page) => {
          const { route, meta, Component } = page;
          return (
            <Route {...route} key={`Route_${meta.name}`}>
              <Component
                isModalOpen={isModalOpen}
                toggleModal={() => toggleModal((prevState) => !prevState)}
              />
            </Route>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
