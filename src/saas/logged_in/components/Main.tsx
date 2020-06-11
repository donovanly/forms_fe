import React, { memo, useState, Fragment, useEffect } from "react";
import classNames from "classnames";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import SideBar from "./navigation/SideBar";
import { makeStyles } from '@material-ui/core/styles';
import { formListRequest } from "../../../state/ducks/formList";
import { useDispatch } from 'react-redux'

interface ITarget {
  [index: number] :
  {
    id: number,
    number1: number,
    number2: number,
    number3: number,
    number4: number,
    name: string,
    profilePicUrl: string,
    isActivated: boolean,
  }
}

interface ITtransaction {
  [index: number]: {
    id: number,
    description: string,
    balanceChange: number,
    paidUntil: number,
    timestamp: number
}}

interface IProfit extends Array<any> {
  [key: number]: {value: Number, timestamp: string}
}

interface IViews extends Array<any> {
  [key: number]: {value: string, timestamp: string}
}

interface IPost {
  [key: number]: {
    id: number;
    src: string;
    timestamp: number;
    name: string;
}}

const useStyles = makeStyles((theme) => ({
  main: {
    marginLeft: theme.spacing(25),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
}))

const Main = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    dispatch(formListRequest())
  }, [dispatch])

  return (
    <Fragment>
      <NavBar
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideBar
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <main className={classNames(classes.main)}>
        <Routing />
      </main>
    </Fragment>
  );
}

export default memo(Main);
