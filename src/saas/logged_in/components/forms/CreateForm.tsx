import React, { memo, useState, useCallback } from 'react';
import {
  Box,
  createStyles,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';

import clsx from 'clsx';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import PublishIcon from '@material-ui/icons/Publish';
import SettingsIcon from '@material-ui/icons/Settings';
import { v4 as uuid } from 'uuid';
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { useDispatch, useSelector } from 'react-redux';
import FormPreview from './FormPreview';
import FormBuilder from './FormBuilder';
import { defaultFormElements, FormElement, setFormElements } from '../../../../state/ducks/form';
import { RootState } from '../../../../state/root';

const useStyles = makeStyles(() => createStyles({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  elementSelectorGrid: {
    maxWidth: '475px',
  },
  stepper: {
    background: 'inherit',
    width: '600px',
  },
}));

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
    '&:hover': {
      cursor: 'pointer',
    },
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
  const { active, completed, icon } = props;

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
      {icons[String(icon)]}
    </div>
  );
};

const reorder = (source: FormElement[], startIndex: number, endIndex: number) => {
  const sourceClone = source.slice();
  const [removed] = sourceClone.splice(startIndex, 1);
  sourceClone.splice(endIndex, 0, removed);
  return sourceClone;
};

const copy = (
  destination: FormElement[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
) => {
  const elementType = defaultFormElements[droppableSource.index];
  const destinationClone = destination.slice();
  const questionOptions = elementType.questionOptions.map((val) => ({ ...val, id: uuid() }));
  destinationClone.splice(
    droppableDestination.index, 0, { ...elementType, id: uuid(), questionOptions },
  );
  return destinationClone;
};

interface StepperProps {
  step: number,
  handleStep: (step: number) => void,
}

const MemoStepperComponent = memo((props: StepperProps) => {
  const { step, handleStep } = props;
  const classes = useStyles();
  return (
    <Grid item xs={12} justify="center" style={{ maxWidth: '100%' }}>
      <Box display="flex" justifyContent="center">
        <Stepper activeStep={step} nonLinear className={classes.stepper}>
          <Step>
            <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => handleStep(0)}>
              Edit Form
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => handleStep(1)}>
              Settings
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => handleStep(2)}>
              Publish
            </StepLabel>
          </Step>
        </Stepper>
      </Box>
    </Grid>
)});

const CreateForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const formElements = useSelector((state: RootState) => state.formReducer.formElements);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleStep = (step: number) => {
    setActiveStep(step);
  };

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        dispatch(setFormElements(reorder(formElements, source.index, destination.index)));
        break;
      case 'FormElements':
        dispatch(setFormElements(copy(formElements, source, destination)));
        break;
      default:
        break;
    }
  },
  [dispatch, formElements]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <MemoStepperComponent step={activeStep} handleStep={handleStep} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid item xs={12} sm={3} className={classes.elementSelectorGrid}>
            <FormBuilder />
          </Grid>
          <FormPreview />
        </DragDropContext>
      </Grid>
    </div>
  );
};

export default CreateForm;
