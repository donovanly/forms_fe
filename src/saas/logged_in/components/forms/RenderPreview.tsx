import React from "react"

import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
} from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormElement } from '../../../../state/ducks/form'

export const RenderPreview = (props: {questionSettings: FormElement}) => {
  const { questionSettings } = props

  switch(questionSettings.type) {
    case "Short Text":
      return (
        <FormControl style={{marginBottom: "10px", marginTop: "10px"}} fullWidth>
          <TextField
            InputLabelProps={{
              required:  questionSettings.required,
              shrink: true,
            }}
            defaultValue=""
            error={questionSettings.required}
            label={questionSettings.title}
          />
          {questionSettings.required && <FormHelperText error={true}>This field is required.</FormHelperText>}
        </FormControl>
      )
    case "Long Text":
      return (
        <FormControl style={{marginBottom: "10px", marginTop: "10px"}} fullWidth>
          <TextField
            InputLabelProps={{
              required:  questionSettings.required,
              shrink: true,
            }}
            defaultValue=""
            error={questionSettings.required}
            label={questionSettings.title}
            multiline
            rows={3} 
          />
          {questionSettings.required && <FormHelperText error={true}>This field is required.</FormHelperText>}
        </FormControl>
      )
    case "Dropdown":
      return (
        <FormControl style={{marginBottom: "10px", marginTop: "10px"}} fullWidth>
          <InputLabel
            error={questionSettings.required}
            id="standard-dropdown"
            shrink
            required={ questionSettings.required}
            >
            {questionSettings.title}
          </InputLabel>
          <Select
            defaultValue=""
            error={questionSettings.required}
            label={questionSettings.title}
            labelId="standard-dropdown"
          >
            <MenuItem value="">None</MenuItem>
            {questionSettings.questionOptions ? questionSettings.questionOptions.map((option, index) => 
              <MenuItem
                key={index}
                value={option.name}
              >{option.name}</MenuItem>
            ) : <MenuItem value="Option 1">Option 1</MenuItem>}
          </Select>
          {questionSettings.required && <FormHelperText error={true}>This field is required.</FormHelperText>}
        </FormControl>
      )
    case "Multiple Choice":
      return (
        <FormControl style={{marginBottom: "10px", marginTop: "10px"}} fullWidth>
          <FormLabel component="legend">{questionSettings.title}</FormLabel>
          <RadioGroup defaultValue={"Option 1"}>
            {questionSettings.questionOptions && questionSettings.questionOptions.map((option, index) => 
              <FormControlLabel
                control={<Radio />}
                key={index}
                label={option.name}
                value={option.name}
              />
            )}
          </RadioGroup> 
        </FormControl>
      )
    case "Checkboxes":
      return (
        <FormControl style={{marginBottom: "10px", marginTop: "10px"}} fullWidth>
          <FormLabel>{questionSettings.title}</FormLabel>
          <FormGroup>
          {questionSettings.questionOptions ? questionSettings.questionOptions.map((option, index) => 
              <FormControlLabel
                control={<Checkbox />}
                key={index}
                label={option.name}
                value={option.name}
              />
            ) : <FormControlLabel control={<Checkbox />} label="Option 1" />}
          </FormGroup>
        </FormControl>
      )
    case "Auto Complete":
      return (
        <FormControl style={{marginBottom: "10px", marginTop: "10px"}} fullWidth>
          <Autocomplete
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{
                required: questionSettings.required,
                shrink: true,
              }}
              error={questionSettings.required}
              label={questionSettings.title}
              variant="outlined"
            />
          )}
          options={questionSettings.questionOptions ? questionSettings.questionOptions.map(option => option.name) : ["Option 1"]}
        />
        {questionSettings.required && <FormHelperText error={true}>This field is required.</FormHelperText>}
        </FormControl>
      )
    case "Title":
      return (
        <Typography variant={questionSettings.titleType}>
          {questionSettings.title}
        </Typography>
      )
    default:
      return <div>None</div>
  }
}
