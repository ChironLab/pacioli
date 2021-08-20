import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReportProblemRounded } from '@material-ui/icons';
import type { Page } from '../../Pages';

type Props = {
  page: Page;
};

const ListComponent = ({ page }: Props) => {
  const { meta, route } = page;
  const { name, icon: Icon } = meta;

  return (
    <ListItem button key={page.meta.name}>
      <Link to={route.path}>
        <ListItemIcon>
          {Icon ? <Icon /> : <ReportProblemRounded />}
        </ListItemIcon>
        <ListItemText primary={name} />
      </Link>
    </ListItem>
  );
};

export default ListComponent;
