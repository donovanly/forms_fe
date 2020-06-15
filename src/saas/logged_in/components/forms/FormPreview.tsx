/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import {
  createStyles,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import RenderPreview from './RenderPreview';
import { RootState } from '../../../../state/root';
import { setFormElements } from '../../../../state/ducks/form';
import ElementSettings from './ElementSettings';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    padding: '10px',
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  listItem: {
    '&:hover': {
      background: theme.palette.primary.light,
      borderRadius: '10px',
    },
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  formPreviewGrid: {
    minWidth: '425px',
    transition: theme.transitions.create(
      'all',
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      },
    ),
  },
  draggingListItem: {
    background: theme.palette.primary.light,
    borderRadius: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  placeholder: {
    alignContent: 'center',
    alignItems: 'center',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    height: '75px',
    lineHeight: '1.5',
    padding: '0.5rem',
    margin: '0 0.5rem 0.5rem',
  },
  placeholderDrag: {
    alignContent: 'center',
    alignItems: 'center',
    border: '1px dashed #000',
    borderColor: theme.palette.secondary.main,
    borderRadius: '10px',
    color: '#aaa',
    height: '75px',
    padding: '0.5rem',
    margin: '0 0.5rem 0.5rem',
  },
  questionIconContainer: {
    position: 'absolute',
    right: '0',
    zIndex: 1,
  },
  iconButton: {
    display: 'block',
    padding: '5px',
  },
  deleteIcon: {
    color: theme.palette.secondary.main,
  },
}));

const FormPreview = () => {
  const formElements = useSelector((state: RootState) => state.formReducer.formElements);
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChecked = () => {
    setChecked((prev) => !prev);
  };

  const deleteElementHandler = (index: number) => {
    const formElementsClone = formElements.slice();
    formElementsClone.splice(index, 1);
    dispatch(setFormElements(formElementsClone));
  };

  return (
    <>
      <Grid item sm={checked ? 6 : 8} xs={12} className={classes.formPreviewGrid}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.title}>
            Form Preview
          </Typography>
          <Divider />
          <Droppable droppableId="FormPreview">
            {(provided, snapshot) => (
              <>
                <List innerRef={provided.innerRef}>
                  {formElements.length ? formElements.map((formElement, index) => (
                    <Draggable key={formElement.id} draggableId={formElement.id} index={index}>
                      {(dProvided, dSnapShot) => (
                        <div
                          {...dProvided.dragHandleProps}
                          {...dProvided.draggableProps}
                          className={dSnapShot.isDragging
                            ? classes.draggingListItem
                            : classes.listItem}
                          ref={dProvided.innerRef}
                        >
                          <div className={classes.questionIconContainer}>
                            <IconButton
                              className={classes.iconButton}
                              onClick={handleChecked}
                            >
                              <SettingsIcon />
                            </IconButton>
                            <IconButton
                              className={classes.iconButton}
                              onClick={() => deleteElementHandler(index)}
                            >
                              <DeleteIcon className={classes.deleteIcon} />
                            </IconButton>
                          </div>
                          <RenderPreview
                            questionSettings={formElement}
                          />
                        </div>
                      )}
                    </Draggable>
                  )) : (
                    <div
                      className={
                      snapshot.isDraggingOver
                        ? classes.placeholderDrag
                        : classes.placeholder
                    }
                    >
                      {!snapshot.isDraggingOver && 'Drop Form Elements Here'}
                    </div>
                  )}
                </List>
                {formElements.length ? provided.placeholder : null}
              </>
            )}
          </Droppable>
        </Paper>
      </Grid>
      <ElementSettings checked={checked} handleChecked={handleChecked} />
    </>
  );
};

export default FormPreview;
