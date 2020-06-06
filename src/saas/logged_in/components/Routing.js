import React, { memo } from "react";
import Forms from "./forms/Forms";
import Reports from "./reports/Reports";
import PropsRoute from "../../shared/components/PropsRoute";
import { Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

const Routing = () => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Switch>
        <PropsRoute
          path="/c/forms"
          component={Forms}
        />
        <PropsRoute
          path="/c/reports"
          component={Reports}
        />
      </Switch>
    </div>
  );
}

export default memo(Routing);
