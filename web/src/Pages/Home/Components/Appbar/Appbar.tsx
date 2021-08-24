import React from 'react';
import { useReactiveVar } from '@apollo/client';
import DatePicker from '@material-ui/lab/DatePicker';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Toolbar, Typography, IconButton, TextField } from '@material-ui/core';
import { endOfDay } from 'date-fns';
import { AppBar } from './styles';
import { startDateVar, endDateVar } from '../../../../Context/Apollo';

type Props = {
  toggleDrawer: () => null | void | undefined;
  isDrawerOpen: boolean;
};

const Appbar = ({ toggleDrawer, isDrawerOpen }: Props) => {
  const startDate = useReactiveVar(startDateVar);
  const endDate = useReactiveVar(endDateVar);

  return (
    <AppBar position='fixed' open={isDrawerOpen}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          edge='start'
          sx={{
            marginRight: '36px',
            ...(isDrawerOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap>
          Pacioli
        </Typography>
        <DatePicker
          label='Start Date'
          value={startDate}
          onChange={(newValue) => {
            if (!newValue) {
              return;
            }
            startDateVar(new Date(newValue));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label='End Date'
          value={endDate}
          onChange={(newValue) => {
            if (!newValue) {
              return;
            }
            endDateVar(endOfDay(new Date(newValue)));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
