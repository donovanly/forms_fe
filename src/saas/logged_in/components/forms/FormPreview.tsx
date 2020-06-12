import React, { Fragment } from "react"

import {
  createStyles,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
  Droppable, Draggable,
} from "react-beautiful-dnd"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: "10px"
    },
    title: {
      marginBottom: theme.spacing(1),
    },
    listItem: {
      '&:hover': {
        background: theme.palette.primary.light
      }
    },
    draggingListItem: {
      background: theme.palette.primary.light
    },
    placeholder: {
      alignContent: "center",
      alignItems: "center",
      border: "1px solid",
      borderColor: theme.palette.primary.main,
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      height: "75px",
      lineHeight: "1.5",
      padding: "0.5rem",
      margin: "0 0.5rem 0.5rem",
    },
    placeholderDrag: {
      alignContent: "center",
      alignItems: "center",
      border: "1px dashed #000",
      borderColor: theme.palette.secondary.main,
      borderRadius: "10px",
      color: "#aaa",
      height: "75px",
      padding: "0.5rem",
      margin: "0 0.5rem 0.5rem",
    }
}))

const FormPreview = (props: {items: {id: string, type: string}[]}) => {
  const { items } = props
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Form Preview
      </Typography>
      <Divider />
      <Droppable droppableId="FormPreview">
        {(provided, snapshot) => (
          <List innerRef={provided.innerRef}>
            {items.length ? items.map( (item, index) => (
              <Fragment>
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(dProvided, dSnapshot) => (
                    <ListItem
                      button
                      className={dSnapshot.isDragging ? classes.draggingListItem : classes.listItem}
                      {...dProvided.dragHandleProps}
                      {...dProvided.draggableProps}
                      innerRef={dProvided.innerRef}
                    >
                      <ListItemIcon>
                        Text Icon {item.id}
                      </ListItemIcon>
                      <ListItemText primary="Title" />
                    </ListItem>
                  )}
                </Draggable>
                {provided.placeholder}
              </Fragment>
            )) : (snapshot.isDraggingOver ? (
              <div className={classes.placeholderDrag} />
            ) : (
              <div className={classes.placeholder}>
                Drop Form Elements Here
              </div>
            ))}
          </List>
        )}
        </Droppable>
    </Paper>
  )
}

export default FormPreview