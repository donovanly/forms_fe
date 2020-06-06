import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

interface IProps {
  handleDrawerToggle: () => void,
  mobileOpen: boolean
}


const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(25),
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {...theme.mixins.toolbar, backgroundColor: theme.palette.background.default},
  drawerPaper: {
    width: theme.spacing(25),
    backgroundColor: theme.palette.background.default
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  selectedItem: {
    backgroundColor: theme.palette.primary.light + " !important"
  }
}));

const SideBar = (props: IProps) =>  {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  // Need so update state in order to re-render on location change
  // eslint-disable-next-line
  const [loc, setLoc] = useState<string>("");

  useEffect(() => history.listen(() => {
    setLoc(history.location.pathname)
  }), [history])

  const { handleDrawerToggle, mobileOpen } = props
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button key={"Forms"}
          component={Link}
          to="/c/forms"
          selected={history.location.pathname==="/c/forms"}
          classes={{ selected: classes.selectedItem }}
        >
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary={"Forms"} />
        </ListItem>
      <Divider />
        <ListItem
          button key={"Reports"}
          component={Link}
          to="/c/reports"
          selected={history.location.pathname==="/c/reports"}
          classes={{ selected: classes.selectedItem }}
        >
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary={"Reports"} />
        </ListItem>
      </List>
    </div>
  );

  return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
  );
}

export default SideBar;
