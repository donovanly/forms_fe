/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, Fragment } from 'react';
import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Divider,
} from '@material-ui/core';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import TitleIcon from '@material-ui/icons/Title';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addElement, defaultFormElements, FormElement } from '../../../../state/ducks/form';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    minWidth: 120,
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
  listItem: {
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  draggingListItem: {
    background: theme.palette.primary.main,
  },
  listItemCopy: {
    '& ~ div': {
      transform: 'none !important',
    },
  },
}));

const elementIcon = (elementType: string) => {
  switch (elementType) {
    case 'Title':
      return <TitleIcon />;
    case 'Short Text':
      return <ShortTextIcon />;
    case 'Long Text':
      return <SubjectIcon />;
    case 'Dropdown':
      return <ArrowDropDownCircleIcon />;
    case 'Auto Complete':
      return <TextRotationNoneIcon />;
    case 'Multiple Choice':
      return <RadioButtonCheckedIcon />;
    case 'Checkboxes':
      return <CheckBoxIcon />;
    default:
      return <div>Invalid Type</div>;
  }
};

const getRenderItem = (formElements: FormElement[]) => (
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot,
  rubric: DraggableRubric,
) => {
  const element = formElements[rubric.source.index];
  const classes = useStyles();
  return (
    <ListItem
      button
      className={snapshot.isDragging
        ? classes.draggingListItem
        : classes.listItem}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      innerRef={provided.innerRef}
    >
      <ListItemIcon>
        {elementIcon(element.type)}
      </ListItemIcon>
      <ListItemText primary={element.type} />
    </ListItem>
  );
};

const FormBuilder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const addElementHandler = (index: number) => {
    const elementType = defaultFormElements[index];
    const questionOptions = elementType.questionOptions.map((val) => ({ ...val, id: uuid() }));
    dispatch(addElement({ ...elementType, id: uuid(), questionOptions }));
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Form Elements
      </Typography>
      <Divider />
      <Droppable droppableId="FormElements" isDropDisabled renderClone={getRenderItem(defaultFormElements)}>
        {(provided, snapshot) => (
          <List innerRef={provided.innerRef}>
            {defaultFormElements.map((element, index) => {
              const shouldRenderClone = element.id === snapshot.draggingFromThisWith;
              return (
                <Fragment key={element.id}>
                  {shouldRenderClone ? (
                    <ListItem
                      button
                      className={classes.listItemCopy}
                    >
                      <ListItemIcon>
                        {elementIcon(element.type)}
                      </ListItemIcon>
                      <ListItemText primary={element.type} />
                    </ListItem>
                  ) : (
                    <Draggable draggableId={element.id} index={index}>
                      {(dProvided, dSnapShot) => (
                        <ListItem
                          button
                          className={dSnapShot.isDragging
                            ? classes.draggingListItem
                            : classes.listItem}
                          {...dProvided.dragHandleProps}
                          {...dProvided.draggableProps}
                          innerRef={dProvided.innerRef}
                          onClick={() => addElementHandler(index)}
                        >
                          <ListItemIcon>
                            {elementIcon(element.type)}
                          </ListItemIcon>
                          <ListItemText primary={element.type} />
                        </ListItem>
                      )}
                    </Draggable>
                  )}
                </Fragment>
              );
            })}
          </List>
        )}
      </Droppable>
    </Paper>
  );
};

export default memo(FormBuilder);
