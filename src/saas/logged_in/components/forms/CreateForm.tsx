import React from "react"

import FormBuilder from "./FormBuilder";
import FormPreview from "./FormPreview";
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%"
    },
    grid: {
      minWidth: "475px",
      maxWidth: "475px",
    }
}))

const CreateForm = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className={classes.grid}>
          <FormBuilder />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.grid}>
          <FormPreview />
        </Grid>
      </Grid>
    </div>
  )
}

export default CreateForm