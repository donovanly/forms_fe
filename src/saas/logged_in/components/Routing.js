import React, { memo } from "react";
import FormView from "./forms/FormView";
import CreateForm from "./forms/CreateForm";
import Reports from "./reports/Reports";
import PropsRoute from "../../shared/components/PropsRoute";
import { Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "87.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      width: "85%",
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
          path="/c/forms/create"
          component={CreateForm}
        />
        <PropsRoute
          path="/c/forms"
          component={FormView}
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
