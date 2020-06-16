import React from 'react';
import {
  Button,
  createStyles,
  Divider,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../state/root';
import {
  FormElement,
  multiAnswerQuestionTypes,
  requiredQuestionTypes,
  setFormElements,
} from '../../../../state/ducks/form';

interface IProps {
  checked: boolean,
  handleChecked: () => void,
  selectedElement: string,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  elementSettingsGrid: {
    transition: theme.transitions.create(
      'all',
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      },
    ),
  },
  paper: {
    padding: '10px',
    minWidth: '250px',
  },
  title: {
    marginBottom: theme.spacing(1),
    display: 'inline-block',
  },
  closeIconButton: {
    position: 'relative',
    left: 'calc(100% - 205px)',
    top: '-12px',
    padding: '5px',
  },
  openMenuButton: {
    background: theme.palette.primary.light,
    color: theme.palette.secondary.light,
  },
  closedButtonContainer: {
    float: 'right',
  },
  missingElement: {
    alignItems: 'center',
    display: 'flex',
    height: '200px',
    justifyContent: 'center',
  },
  formControl: {
    marginBottom: '10px',
    marginTop: '10px',
  },
}));

const ElementSettings = (props: IProps) => {
  const { checked, handleChecked, selectedElement } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const smallSize = useMediaQuery('(min-width:600px)');
  const formElements = useSelector((state: RootState) => state.formReducer.formElements);
  // If no match, we can determine that there is no selected element when formIndex === -1
  const formIndex = formElements.findIndex((x) => x.id === selectedElement);

  const updateElement = (formElement: FormElement) => {
    const formElementsClone = formElements.slice();
    formElementsClone[formIndex] = formElement;
    dispatch(setFormElements(formElementsClone));
  };

  return (
    <Grid item sm={checked ? 3 : 1} xs={12} className={classes.elementSettingsGrid}>
      {checked ? (
        <Paper className={classes.paper}>
          <div>
            <Typography variant="h5" className={classes.title}>
              Element Settings
            </Typography>
            <IconButton
              className={classes.closeIconButton}
              onClick={handleChecked}
              style={!smallSize ? { left: 'calc(100% - 175px)', top: '-10px' } : {}}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          {formIndex >= 0 ? (
            <>
              <FormControl className={classes.formControl} fullWidth>
                <TextField
                  InputLabelProps={{
                    required: true,
                    shrink: true,
                  }}
                  label="Element Label"
                  onChange={(event) => updateElement({
                    ...formElements[formIndex], label: event.target.value,
                  })}
                  size="small"
                  value={formElements[formIndex].label}
                />
              </FormControl>
              {requiredQuestionTypes.includes(formElements[formIndex].type) && (
                <FormControl className={classes.formControl} fullWidth>
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={formElements[formIndex].required}
                        color="primary"
                        name="required"
                        onChange={((event) => updateElement({
                          ...formElements[formIndex], required: event.target.checked,
                        }))}
                      />
                    )}
                    label="Question Required"
                  />
                </FormControl>
              )}
              {multiAnswerQuestionTypes.includes(formElements[formIndex].type)
                && formElements[formIndex].questionOptions.map((item, index) => (
                  <div key={index}>
                    <TextField
                      InputLabelProps={{
                        required: true,
                        shrink: true,
                      }}
                      label={`Option Label ${index + 1}`}
                      size="small"
                    />
                    {index === formElements[formIndex].questionOptions.length - 1 ? (
                      <>
                        <Button
                        // className={classes.deleteOptinosButton}
                          color="secondary"
                          disabled={formElements[formIndex].questionOptions.length === 1}
                        // onClick={() => remove(index)}
                          size="small"
                          type="button"
                          variant="outlined"
                        >
                          Delete
                        </Button>
                        <Button
                        // className={classes.addOptionsButton}
                          color="primary"
                        // onClick={() => append({ name: `Option ${index + 2}` })}
                          size="small"
                          type="button"
                          variant="outlined"
                        >
                          Add
                        </Button>
                      </>
                    ) : (
                      <Button
                      // className={classes.deleteOptinosButton}
                        color="secondary"
                      // onClick={() => remove(index)}
                        size="small"
                        type="button"
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                ))}
            </>
          ) : (
            <div className={classes.missingElement}>
              Create or Select an Element
            </div>
          )}
        </Paper>
      ) : (
        <div className={classes.closedButtonContainer}>
          <IconButton
            className={classes.openMenuButton}
            onClick={handleChecked}
          >
            <MenuOpenIcon fontSize="large" />
          </IconButton>
        </div>
      )}
    </Grid>
  );
};

export default ElementSettings;
