import React from 'react';
import clsx from 'clsx';
import { Menu as MenuIcon } from '@material-ui/icons';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { useStyles } from './styles';

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
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
