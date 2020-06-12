import React, { Fragment } from "react";
import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Divider,
} from "@material-ui/core";
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
} from "react-beautiful-dnd";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
        background: theme.palette.primary.light
      }
    },
    draggingListItem: {
      background: theme.palette.primary.light,
    }
}))

const elementIcon = (elementType: string) => {

  switch(elementType) {
    case "Title":
      return <TitleIcon />
    case "Short Text":
      return <ShortTextIcon />
    case "Long Text":
      return <SubjectIcon  />
    case "Dropdown":
      return <ArrowDropDownCircleIcon />
    case "Auto Complete":
      return <TextRotationNoneIcon />
    case "Multiple Choice":
      return <RadioButtonCheckedIcon />
      case "Checkboxes":
      return <CheckBoxIcon />
  }
}

const FormBuilder = (props: {elementTypes: {id: string, type: string}[]}) => {
  const classes = useStyles()
  const { elementTypes } = props

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Form Elements
        </Typography>
        <Divider />
        <Droppable droppableId="FormElements" isDropDisabled={true}>
          {(provided, snapshot) => (
            <List innerRef={provided.innerRef}>
              {elementTypes.map((element, index) => (
                  <Draggable draggableId={element.type} index={index} key={index}>
                  {(dProvided, dSnapShot) => (
                    <Fragment>
                      <ListItem
                        button
                        className={dSnapShot.isDragging ? classes.draggingListItem : classes.listItem}
                        {...dProvided.dragHandleProps}
                        {...dProvided.draggableProps}
                        innerRef={dProvided.innerRef}
                      >
                        <ListItemIcon>
                          {elementIcon(element.type)}
                        </ListItemIcon>
                        <ListItemText primary={element.type} />
                      </ListItem>
                      {dSnapShot.isDragging && (
                        <ListItem
                        button
                      >
                        <ListItemIcon>
                          {elementIcon(element.type)}
                        </ListItemIcon>
                        <ListItemText primary={element.type} />
                      </ListItem>
                    )}
                    </Fragment>
                  )}
                </Draggable>
              ))}
            </List>
          )}
        </Droppable>
      </Paper>
    </Fragment>
  )
}

export default FormBuilder