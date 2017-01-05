import React, { PropTypes } from 'react';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

export const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
    {...input}
    {...rest}
  />
);
