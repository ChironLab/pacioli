import React from 'react';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Toolbar, Typography, IconButton, TextField } from '@material-ui/core';
import { format, startOfDay, endOfDay } from 'date-fns';
import { AppBar } from './styles';
import { startDateVar, endDateVar } from '../../../../Context/Apollo';

type Props = {
  toggleDrawer: () => null | void | undefined;
  isDrawerOpen: boolean;
};

const Appbar = ({ toggleDrawer, isDrawerOpen }: Props) => {
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
        <form noValidate>
          <TextField
            id='startDate'
            label='Start Date'
            type='date'
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
