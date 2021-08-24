import React from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { useStyles } from './styles';
import { pages } from './Pages';
import Nav from './NavWrapper';

const Home = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <CssBaseline />
      <Nav />
      <section className={classes.content}>
        <div className={classes.toolbar} />
        {pages.map((page) => {
          const { route, meta, Component } = page;
          return (
            <Route {...route} key={`Route_${meta.name}`}>
              <Component />
            </Route>
          );
        })}
      </section>
    </main>
  );
};

export default Home;
