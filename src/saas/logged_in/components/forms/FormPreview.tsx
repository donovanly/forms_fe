/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useCallback, useState, useEffect } from 'react';

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
import { deleteElement, FormElement } from '../../../../state/ducks/form';
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

interface FormPreviewRowProps {
  checked: boolean,
  deleteElementHandler: (id: string) => void,
  formElement: FormElement,
  index: number,
  selectedElement: string,
  setChecked: (checked: boolean) => void,
  setSelectedElement: (formElementId: string) => void,
}

const MemoFormPreviewRow = memo((props: FormPreviewRowProps) => {
  const classes = useStyles();
  const {
    checked,
    deleteElementHandler,
    formElement,
    index,
    selectedElement,
    setChecked,
    setSelectedElement,
  } = props;

  return (
    <Draggable key={formElement.id} draggableId={formElement.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={
          (
            snapshot.isDragging
            || (checked && selectedElement === formElement.id)
          )
            ? classes.draggingListItem
            : classes.listItem
        }
          onClick={() => setSelectedElement(formElement.id)}
          ref={provided.innerRef}
          role="presentation"
        >
          <div className={classes.questionIconContainer}>
            <IconButton
              className={classes.iconButton}
              onClick={() => setChecked(true)}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              className={classes.iconButton}
              onClick={(event) => {
                event.stopPropagation();
                deleteElementHandler(formElement.id);
              }}
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
  );
});

const FormPreview = () => {
  const formElements = useSelector((state: RootState) => state.formReducer.formElements);
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [selectedElement, setSelectedElement] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedElement === '' && formElements.length > 0) {
      setSelectedElement(formElements[0].id);
    } else if (formElements.length === 0) {
      setSelectedElement('');
    }
  }, [formElements, selectedElement]);

  const handleChecked = () => {
    setChecked((prev) => !prev);
    if (formElements.length > 0 && selectedElement === '') {
      setSelectedElement(formElements[0].id);
    }
  };

  const deleteElementHandler = useCallback((id: string) => {
    dispatch(deleteElement(id));
  }, [dispatch]);

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
                    <MemoFormPreviewRow
                      checked={checked}
                      deleteElementHandler={deleteElementHandler}
                      formElement={formElement}
                      index={index}
                      key={formElement.id}
                      selectedElement={selectedElement}
                      setChecked={setChecked}
                      setSelectedElement={setSelectedElement}
                    />
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
      <ElementSettings
        checked={checked}
        handleChecked={handleChecked}
        selectedElement={selectedElement}
      />
    </>
  );
};

export default FormPreview;
