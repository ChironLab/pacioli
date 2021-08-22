import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReportProblemRounded } from '@material-ui/icons';
import type { Page } from '../../types';
import { useStyles } from './styles';

type Props = {
  page: Page;
};

const LinkItem = ({ page }: Props) => {
  const classes = useStyles();
  const { meta: pageMeta, route } = page;
  const { name, icon: Icon } = pageMeta;

  return (
    <Link to={route.path} className={classes.link}>
      <ListItem button key={name}>
        <ListItemIcon>
          {Icon ? <Icon /> : <ReportProblemRounded />}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
};

export default LinkItem;
