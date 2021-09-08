import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReportProblemRounded } from '@material-ui/icons';
import type { Page } from '../../Pages';

type Props = {
  page: Page;
};

const LinkItem = ({ page }: Props) => {
  const { meta: pageMeta, route } = page;

  if (pageMeta.navPosition === 'none') {
    return null;
  }

  const { name, icon: Icon } = pageMeta;

  return (
    <Link to={route.path}>
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
