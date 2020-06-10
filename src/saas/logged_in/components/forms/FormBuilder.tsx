import React, { Fragment } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  createStyles,
  FormControl,
  FormControlLabel,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  Switch,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ControlledAutoComplete from './input_wrappers/ControlledAutoComplete'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import TitleIcon from '@material-ui/icons/Title';
import { RenderPreview } from './RenderPreview'
import { addElement, defaultFormElement, titleTypes } from '../../../../state/ducks/form'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      marginBottom: theme.spacing(1),
    },
    divider: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    switchLabel: {
      justifyContent: "space-between",
    },
    previewButtonWrapper: {
      marginTop: theme.spacing(1),
    },
    addOptionsButton: {
      margin: "15px 0px 10px 10px",
    },
    deleteOptionButton: {
      margin: "15px 10px 10px 10px",
    },
    title: {
      marginBottom: theme.spacing(1),
    },
    paper: {
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
    },
    addToForm: {
      marginTop: theme.spacing(1)
    },
    dynamicQuestionTF:  {
      width: "calc(100% - 73px - 64px - 30px)"
    },
}))


const requiredQuestionTypes = ["Short Text","Long Text", "Dropdown", "Auto Complete", "Multiple Choice"]
const multiAnswerQuestionTypes = ["Auto Complete", "Checkboxes", "Dropdown", "Multiple Choice"]
const allQuestionTypes = [
  "Title", "Short Text","Long Text","Dropdown","Auto Complete","Multiple Choice","Checkboxes"
]
const renderedOptions = {
  "Title":
    <Box style={{alignItems: "center"}}>
      <TitleIcon fontSize="large" style={{paddingRight: "10px"}} />
      <span style={{position:"relative", bottom:"12px"}}>Title</span>
    </Box>,
  "Short Text": 
    <Box style={{alignItems: "center"}}>
      <ShortTextIcon fontSize="large" style={{paddingRight: "10px"}} />
      <span style={{position:"relative", bottom:"12px"}}>Short Text</span>
    </Box>,
  "Long Text":
    <Box style={{alignItems: "center"}}>
      <SubjectIcon fontSize="large" style={{paddingRight: "10px"}} />
      <span style={{position:"relative", bottom:"12px"}}>Long Text</span>
    </Box>,
  "Dropdown":
    <Box style={{alignItems: "center"}}>
      <ArrowDropDownCircleIcon fontSize="large" style={{paddingRight: "10px"}} />
      <span style={{position:"relative", bottom:"12px"}}>Dropdown</span>
    </Box>,
  "Multiple Choice":
    <Box style={{alignItems: "center"}}>
      <RadioButtonCheckedIcon fontSize="large" style={{paddingRight: "10px"}} />
      <span style={{position:"relative", bottom:"12px"}}>Multiple Choice</span>
    </Box>,
  "Checkboxes":
    <Box style={{alignItems: "center"}}>
      <CheckBoxIcon fontSize="large" style={{paddingRight: "10px"}} />
      <span style={{position:"relative", bottom:"12px"}}>Checkboxes</span>
    </Box>,
  "Auto Complete":
    <Box style={{alignItems: "center"}}>
      <TextRotationNoneIcon fontSize="large" style={{paddingRight: "10px"}} />
      <span style={{position:"relative", bottom:"12px"}}>Auto Complete</span>
    </Box>
}


const FormBuilder = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { control, register, reset, watch } = useForm({defaultValues: defaultFormElement});
  const { append, fields, remove } = useFieldArray({
    control,
    name: "questionOptions"
  })
  const optionSettings = watch({nest: true})

  const handleAddQuestion = () => {
    dispatch(addElement(optionSettings))
    reset(defaultFormElement)
  }

  return (
    <Fragment>
      <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Form Elements
      </Typography>
      <Card>
        <CardContent>
          <FormControl className={classes.formControl} fullWidth>
            <ControlledAutoComplete
              control={control}
              label="Element Type"
              name="type"
              options={allQuestionTypes}
              renderOptions={renderedOptions}
              variant="outlined"
            />
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={register({required: true})}
              label="Question Title"
              name="label"
              required
              type="text"
            />
          </FormControl>
          {optionSettings.type === "Title" &&
            <FormControl className={classes.formControl} fullWidth>
            <InputLabel
              id="title-dropdown"
              required
              shrink
            >
              Title Type
            </InputLabel>
            <Controller
              as={
              <Select
                label="Title Type"
                labelId="title-dropdown"
              >
                {titleTypes.map(titleType => <MenuItem key={titleType} value={titleType}>{titleType}</MenuItem>)}
              </Select>}
              control={control}
              defaultValue={titleTypes[0]}
              name="titleType"
            />
          </FormControl>
          }
          {multiAnswerQuestionTypes.includes(optionSettings.type) && fields.map((item, index) => (
            <div className={classes.previewButtonWrapper} key={item.id}>
              <Controller
                as={
                  <TextField
                    InputLabelProps={{
                      required: true,
                      shrink: true,
                    }}
                    className={classes.dynamicQuestionTF}
                    label={"Question Label " + (index + 1)}
                    size="small"
                  />
                }
                control={control}
                defaultValue={"Option " + (index + 1)}
                name={`questionOptions[${index}].label`}
              />
              {index === fields.length - 1 ? (
                <Fragment>
                  <Button
                  className={classes.deleteOptionButton}
                  color="secondary"
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  size="small"
                  type="button"
                  variant="outlined"
                >
                  Delete
                  </Button>
                  <Button
                    className={classes.addOptionsButton}
                    color="primary"
                    onClick={() => append({label: "Option " + (index + 2)})}
                    size="small"
                    type="button"
                    variant="outlined"
                  >
                    Add
                  </Button>
                </Fragment>
              ) : (
                <Button
                  className={classes.deleteOptionButton}
                  color="secondary"
                  onClick={() => remove(index)}
                  size="small"
                  type="button"
                  variant="outlined"
                >
                  Delete
              </Button>
              )}
            </div>
          ))}
          {requiredQuestionTypes.includes(watch("type")) &&
            <FormControl className={classes.formControl} fullWidth>
              <FormControlLabel
                control={
                  <Switch color="primary" inputRef={register} name="required" />
                }
                label="Question Required"
              />
            </FormControl>
          }
        </CardContent>
      </Card>
      <Button
        className={classes.addToForm}
        color="secondary"
        onClick={handleAddQuestion}
        fullWidth
        type="button"
        variant="contained"
      >
        Add Question to Form
      </Button>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5">
          Element Preview
        </Typography>
        <Card>
          <CardContent>
            <RenderPreview questionSettings={optionSettings} />
          </CardContent>
        </Card>
      </Paper>
    </Fragment>
  )
}

export default FormBuilder