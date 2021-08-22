import React from 'react';
import clsx from 'clsx';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, List, Divider, IconButton } from '@material-ui/core';
import { useStyles } from './styles';
import type { Page } from '../../types';
import LinkItem from './LinkItem';

type Props = {
  toggleDrawer: () => null | void | undefined;
  isDrawerOpen: boolean;
  pages: Page[];
};

type NavAccumulator = {
  topNav: JSX.Element[];
  bottomNav: JSX.Element[];
};

const SideDrawer = ({ toggleDrawer, isDrawerOpen, pages }: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { topNav, bottomNav } = pages.reduce(
    (acc: NavAccumulator, page) => {
      switch (page.meta.navPosition) {
        case 'top': {
          acc.topNav.push(
            <LinkItem page={page} key={`TopNav_${page.meta.name}`} />
          );
          return acc;
        }

        case 'bottom': {
          acc.bottomNav.push(
            <LinkItem page={page} key={`BottomNav_${page.meta.name}`} />
          );
          return acc;
        }

        default: {
          return acc;
        }
      }
    },
    { topNav: [], bottomNav: [] }
  );

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isDrawerOpen,
        [classes.drawerClose]: !isDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={toggleDrawer}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>{topNav}</List>
      <Divider />
      <List>{bottomNav}</List>
    </Drawer>
  );
};

export default SideDrawer;
