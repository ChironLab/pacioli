import React from 'react';
import Appbar from './Components/Appbar';
import SideDrawer from './Components/SideDrawer';
import { pages } from './Pages';

const NavWrapper = () => {
  const [isDrawerOpen, toggleDrawer] = React.useState(false);

  return (
    <>
      {' '}
      <Appbar
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={() => toggleDrawer((prevState) => !prevState)}
      />
      <SideDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={() => toggleDrawer((prevState) => !prevState)}
        pages={pages}
      />
    </>
  );
};

export default NavWrapper;
