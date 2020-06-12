import React, { useState, useCallback } from "react"
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
import FormPreview from "./FormPreview";
import Grid from '@material-ui/core/Grid';
import PublishIcon from '@material-ui/icons/Publish';
import SettingsIcon from '@material-ui/icons/Settings';
import { v4 as uuid } from "uuid";
import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";
import { StepIconProps } from '@material-ui/core/StepIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
    },
    elementSelectorGrid: {
      minWidth: "425px",
      maxWidth: "475px",
    },
    formPreviewGrid: {
      minWidth: "425px",
    },
    stepper: {
      background:"inherit",
      width: "600px"
    }
}))

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
      'linear-gradient( 136deg, #B13D56 0%, #622346 95%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, #B13D56 0%, #622346 95%, rgb(138,35,135) 100%)',
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

const reorder = (source: {id: string, type: string}[], startIndex: number, endIndex: number) => {
  const [removed] = source.splice(startIndex, 1);
  source.splice(endIndex, 0, removed);
  return source;
};

const copy = (source: {id: string, type: string}[], destination: {id: string, type: string}[], droppableSource:  DraggableLocation, droppableDestination: DraggableLocation) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destination;
};

const elementTypes = [
  {type: "Title", id: uuid()},
  {type: "Short Text", id: uuid()},
  {type: "Long Text", id: uuid()},
  {type: "Dropdown", id: uuid()},
  {type: "Auto Complete", id: uuid()},
  {type: "Multiple Choice", id: uuid()},
  {type: "Checkboxes", id: uuid()},
]

const CreateForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formElements, setFormElements] = useState<{id: string, type: string}[]>([])
  const classes = useStyles()

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setFormElements( state =>
          reorder(state, source.index, destination.index)
        )
        break
      case "FormElements":
        setFormElements( state =>
          copy(elementTypes, state, source, destination)
        )
        break
      default:
        break
    }
  },
  [setFormElements]
)

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} justify="center" style={{maxWidth:"100%"}}>
          <Box display="flex" justifyContent="center">
            <Stepper activeStep={activeStep} nonLinear className={classes.stepper}>
              <Step>
                <StepLabel StepIconComponent={ColorlibStepIcon} onClick={handleStep(0)}>
                  Edit Form
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid item xs={10} sm={6} className={classes.elementSelectorGrid}>
            <FormBuilder elementTypes={elementTypes} />
          </Grid>
          <Grid item xs={10} sm={8} className={classes.formPreviewGrid}>
            <FormPreview items={formElements} />
          </Grid>
        </DragDropContext>
      </Grid>
    </div>
  )
}

export default CreateForm