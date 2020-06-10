import React, { useState } from "react"

import FormPreview from "./FormPreview";
import Grid from '@material-ui/core/Grid';
import {
  Box,
  createStyles,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Theme,
} from "@material-ui/core";
import clsx from 'clsx';
import CreateIcon from '@material-ui/icons/Create';
import FormBuilder from "./FormBuilder";
import PublishIcon from '@material-ui/icons/Publish';
import SettingsIcon from '@material-ui/icons/Settings';
import { RootState } from "../../../../state/root";
import { saveFormRequest } from '../../../../state/ducks/form'
import { StepIconProps } from '@material-ui/core/StepIcon';
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
    },
    gridContainer:{
      marginTop: "64px"
    },
    gridItem: {
      minWidth: "425px",
      maxWidth: "475px",
    },
    appBar: {
      alignItems: "center",
      paddingBottom:"10px",
      paddingTop: "10px",
      top: "64px",
    }
}))

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...';
    case 1:
      return 'Step 2: What is an ad group anyways?';
    case 2:
      return 'Step 3: This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    "&:hover": {
      cursor: "pointer"
    }
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

const ColorlibStepIcon = (props: StepIconProps) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <CreateIcon />,
    2: <SettingsIcon />,
    3: <PublishIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const CreateForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles()
  const dispatch = useDispatch()
  const description = useSelector((state: RootState) => state.formReducer.description)
  const name = useSelector((state: RootState) => state.formReducer.formName)
  const formElements = useSelector((state: RootState) => state.formReducer.formElements)

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" className={classes.gridContainer}>
        <Grid item xs={12} justify="center" style={{maxWidth:"100%"}}>
          <Box display="flex" justifyContent="center">
            <Stepper activeStep={activeStep} nonLinear style={{background:"inherit", width:"600px"}}>
              <Step>
                <StepLabel StepIconComponent={ColorlibStepIcon} onClick={handleStep(0)}>
                  Create Form
                </StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={ColorlibStepIcon} onClick={handleStep(1)}>
                  Settings
                </StepLabel>
                </Step>
                <Step>
                <StepLabel StepIconComponent={ColorlibStepIcon} onClick={handleStep(2)}>
                  Publish
                </StepLabel>
              </Step>
            </Stepper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridItem}>
          <FormBuilder />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gridItem}>
          <FormPreview />
        </Grid>
      </Grid>
    </div>
  )
}

export default CreateForm