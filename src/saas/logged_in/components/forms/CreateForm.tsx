import React from "react"
import { makeStyles, createStyles, Theme, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
    },
}))

const CreateForm = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper  className={classes.paper}>
        Hello world
      </Paper>
    </div>
  )
}

export default CreateForm