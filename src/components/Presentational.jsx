import React, { PropTypes } from 'react';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

export const renderTextField = ({ input, label, meta: { touched, error }, listener,...custom }) => {
  console.log('PRESENTATIONAL | renderTextField input.value : ', input.value);
  return (
    <input
      {...input}
      placeholder={label}
    />
  );
};


export const renderRadioGroup = ({ input, ...rest }) => {
  console.log('PRESENTATIONAL | renderRadioGroup input : ', input);
  return (
    <RadioButtonGroup
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
      {...input}
      {...rest}
    />
  );
}
