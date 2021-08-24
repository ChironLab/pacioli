import React from 'react';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { List, Divider, IconButton } from '@material-ui/core';
import { Drawer, DrawerHeader } from './styles';
import type { Page } from '../../Pages';
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
      open={isDrawerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={toggleDrawer} size="large">
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>{topNav}</List>
      <Divider />
      <List>{bottomNav}</List>
    </Drawer>
  );
};

export default SideDrawer;
