import React, { memo } from 'react';

import {
  Box,
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormElement } from '../../../../state/ducks/form';

const useStyles = makeStyles(() => createStyles({
  formControl: {
    marginBottom: '10px',
    marginTop: '10px',
    width: '95%',
  },
  textFieldLabel: {
    fontSize: '16px',
  },
}));

const RenderPreview = (props: {questionSettings: FormElement}) => {
  const { questionSettings } = props;
  const classes = useStyles();

  switch (questionSettings.type) {
    case 'Short Text':
      return (
        <FormControl className={classes.formControl}>
          <TextField
            InputLabelProps={{
              className: classes.textFieldLabel,
              required: questionSettings.required,
              shrink: true,
            }}
            defaultValue=""
            error={questionSettings.required}
            label={questionSettings.label}
          />
          {questionSettings.required
          && <FormHelperText error>This field is required.</FormHelperText>}
        </FormControl>
      );
    case 'Long Text':
      return (
        <FormControl className={classes.formControl}>
          <TextField
            InputLabelProps={{
              className: classes.textFieldLabel,
              required: questionSettings.required,
              shrink: true,
            }}
            defaultValue=""
            error={questionSettings.required}
            label={questionSettings.label}
            multiline
            rows={3}
          />
          {questionSettings.required
          && <FormHelperText error>This field is required.</FormHelperText>}
        </FormControl>
      );
    case 'Dropdown':
      return (
        <FormControl className={classes.formControl}>
          <InputLabel
            error={questionSettings.required}
            id="standard-dropdown"
            shrink
            required={questionSettings.required}
          >
            {questionSettings.label}
          </InputLabel>
          <Select
            defaultValue=""
            error={questionSettings.required}
            label={questionSettings.label}
            labelId="standard-dropdown"
          >
            <MenuItem value="">None</MenuItem>
            {questionSettings.questionOptions
              ? questionSettings.questionOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.label}
                >
                  {option.label}
                </MenuItem>
              )) : <MenuItem value="Option 1">Option 1</MenuItem>}
          </Select>
          {questionSettings.required
          && <FormHelperText error>This field is required.</FormHelperText>}
        </FormControl>
      );
    case 'Multiple Choice':
      return (
        <FormControl className={classes.formControl}>
          <FormLabel
            error={questionSettings.required}
            required={questionSettings.required}
            style={{ fontSize: '12px' }}
          >
            {questionSettings.label}
          </FormLabel>
          <RadioGroup defaultValue="Option 1">
            {questionSettings.questionOptions
            && questionSettings.questionOptions.map((option, index) => (
              <FormControlLabel
                control={<Radio size='small' />}
                key={index}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {questionSettings.required
          && <FormHelperText error>This field is required.</FormHelperText>}
        </FormControl>
      );
    case 'Checkboxes':
      return (
        <FormControl className={classes.formControl}>
          <FormLabel style={{ fontSize: '12px' }}>{questionSettings.label}</FormLabel>
          <FormGroup>
            {questionSettings.questionOptions
              ? questionSettings.questionOptions.map((option, index) => (
                <FormControlLabel
                  control={<Checkbox size='small' />}
                  key={index}
                  label={option.label}
                  value={option.label}
                />
              )) : <FormControlLabel control={<Checkbox />} label="Option 1" />}
          </FormGroup>
        </FormControl>
      );
    case 'Auto Complete':
      return (
        <FormControl className={classes.formControl}>
          <Autocomplete
            autoHighlight
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  required: questionSettings.required,
                  shrink: true,
                }}
                error={questionSettings.required}
                label={questionSettings.label}
              />
            )}
            options={questionSettings.questionOptions ? questionSettings.questionOptions.map((option) => option.label) : ['Option 1']}
          />
          {questionSettings.required
          && <FormHelperText error>This field is required.</FormHelperText>}
        </FormControl>
      );
    case 'Title':
      return (
        <Box height="68px">
          <Typography variant={questionSettings.titleType}>
            {questionSettings.label}
          </Typography>
        </Box>
      );
    default:
      return <div>None</div>;
  }
};

export default memo(RenderPreview);
