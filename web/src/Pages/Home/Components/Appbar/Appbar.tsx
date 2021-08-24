import React from 'react';
import clsx from 'clsx';
import { Menu as MenuIcon } from '@material-ui/icons';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
} from '@material-ui/core';
import { format, startOfDay, endOfDay } from 'date-fns';
import { useStyles } from './styles';
import { startDateVar, endDateVar } from '../../../../Context/Apollo';

type Props = {
  toggleDrawer: () => null | void | undefined;
  isDrawerOpen: boolean;
};

const Appbar = ({ toggleDrawer, isDrawerOpen }: Props) => {
  const classes = useStyles();

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          edge='start'
          className={clsx(classes.menuButton, {
            [classes.hide]: isDrawerOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap>
          Pacioli
        </Typography>
        <form className={classes.dateInputContainer} noValidate>
          <TextField
            id='startDate'
            label='Start Date'
            type='date'
            className={classes.dateInput}
            defaultValue={format(startDateVar(), 'yyyy-MM-dd')}
            onChange={(e: any) =>
              startDateVar(startOfDay(new Date(e.target.valueAsDate)))
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id='endDate'
            label='End Date'
            type='date'
            className={classes.dateInput}
            defaultValue={format(endDateVar(), 'yyyy-MM-dd')}
            onChange={(e: any) =>
              endDateVar(endOfDay(new Date(e.target.valueAsDate)))
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
