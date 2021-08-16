import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

type Props = {
  type: string;
  name: string;
  description: string;
};

const OutlinedCard = ({ type, name, description }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {type}
        </Typography>
        <Typography variant='h5' component='h2'>
          {name}
        </Typography>
        <Typography variant='body2' component='p'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>DO IT</Button>
      </CardActions>
    </Card>
  );
};

export default OutlinedCard;
