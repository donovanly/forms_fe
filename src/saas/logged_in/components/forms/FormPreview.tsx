/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  createStyles,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
  IconButton,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import RenderPreview from './RenderPreview';
import { RootState } from '../../../../state/root';
import { setFormElements } from '../../../../state/ducks/form';

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
  const dispatch = useDispatch();

  const deleteElementHandler = (index: number) => {
    const formElementsClone = formElements.slice();
    formElementsClone.splice(index, 1);
    dispatch(setFormElements(formElementsClone));
  };

  return (
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
                        <IconButton className={classes.iconButton}>
                          <MoreVertIcon />
                        </IconButton>
                        <IconButton className={classes.iconButton} onClick={() => deleteElementHandler(index)}>
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
  );
};

export default FormPreview;
