import React from 'react';
import {
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

interface IProps {
  checked: boolean,
  handleChecked: () => void,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  elementSettingsGrid: {
    transition: theme.transitions.create(
      'all',
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      },
    ),
  },
  paper: {
    padding: '10px',
    minWidth: '250px',
  },
  title: {
    marginBottom: theme.spacing(1),
    display: 'inline-block',
  },
  closeIconButton: {
    position: 'relative',
    left: 'calc(100% - 205px)',
    top: '-12px',
    padding: '5px',
  },
  openMenuButton: {
    background: theme.palette.primary.light,
    color: theme.palette.secondary.light,
  },
}));

const ElementSettings = (props: IProps) => {
  const { checked, handleChecked } = props;
  const classes = useStyles();

  return (
    <Grid item sm={checked ? 3 : 1} xs={12} className={classes.elementSettingsGrid}>
      {checked ? (
        <Paper className={classes.paper}>
          <div>
            <Typography variant="h5" className={classes.title}>
              Element Settings
            </Typography>
            <IconButton
              className={classes.closeIconButton}
              onClick={handleChecked}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
        </Paper>
      ) : (
        <div style={{float: 'right'}}>
          <IconButton
            className={classes.openMenuButton}
            onClick={handleChecked}
          >
            <MenuOpenIcon fontSize="large" />
          </IconButton>
        </div>
      )}
    </Grid>
  );
};

export default ElementSettings;
