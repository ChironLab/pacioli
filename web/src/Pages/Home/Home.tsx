import React from 'react';
import { Route } from 'react-router-dom';
import {useQuery, useReactiveVar} from '@apollo/client'
import { CircularProgress } from '@material-ui/core';
import Appbar from './Components/Appbar';
import SideDrawer from './Components/SideDrawer';
import { useUiContext } from '../../Context/UiContext';
import { useStyles } from './styles';

import {BOOTSTRAP} from '../../API'
import {startDateVar, endDateVar} from '../../Context/Apollo'

import { Vendor } from './Vendor';
import { Customer } from './Customer';
import { Accountant } from './Accountant';
import { Dashboard } from './Dashboard';

const pages = [Dashboard, Vendor, Customer, Accountant];

const Home = () => {
  const classes = useStyles();
  const { state, dispatch } = useUiContext();

  const startDate = useReactiveVar(startDateVar)
  const endDate = useReactiveVar(endDateVar)

  const {loading, error, data} = useQuery(BOOTSTRAP, {
    variables: {
      startAndEndDate: {
        startDate,
        endDate
      }
    }
  })

  if(loading) {
    return <CircularProgress />
  }

  if(error) {
    return <p> ERRRROR PLEASE RELOAD </p>
  }

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
        {pages.map((page) => {
          const {route, meta, Component} = page
          return <Route {...route} key={`Route_${meta.name}`}>
            <Component data={data}/>
          </Route>
        })}
      </section>
    </main>
  );
};

export default Home;
