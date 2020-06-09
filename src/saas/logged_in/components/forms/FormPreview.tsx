import React from "react"

import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RenderPreview } from './RenderPreview'
import { RootState } from "../../../../state/root";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: "10px"
    },
    title: {
      marginBottom: theme.spacing(1),
    },
}))

const FormPreview = () => {
  const classes = useStyles()
  const formElements = useSelector((state: RootState) => state.formReducer.formElements)


  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Form Preview
      </Typography>
      <Card>
        <CardContent>
          {formElements.map((formElement, index) => <RenderPreview key={index} questionSettings={formElement} />)}
        </CardContent>
      </Card>
    </Paper>
  )
}

export default FormPreview