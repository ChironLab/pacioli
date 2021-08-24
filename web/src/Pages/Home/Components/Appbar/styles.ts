import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from '../SideDrawer';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  dateInputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dateInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
