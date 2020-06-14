import React, { ReactNode } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Control, Controller } from 'react-hook-form';

interface IRenderOptions {
  [key: string]: ReactNode
}

interface IProps {
  control: Control,
  label: string,
  name: string,
  options: string[],
  renderOptions: IRenderOptions,
  variant: 'filled' | 'outlined' | 'standard' | undefined
}

// Default value is always the first option
const ControlledAutoComplete = (props: IProps) => {
  const {
    control, label, name, options, renderOptions, variant,
  } = props;

  return (
    <Controller
      as={(
        <Autocomplete
          autoHighlight
          getOptionSelected={(option, value) => option === value}
          options={options}
          renderOption={(option) => (renderOptions[option] ? renderOptions[option] : option)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true,
              }}
              label={label}
              required
              variant={variant}
            />
          )}
        />
      )}
      control={control}
      name={name}
      onChange={([, data]) => data}
    />
  );
};

export default ControlledAutoComplete;
