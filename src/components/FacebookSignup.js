import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
// import { Field, reduxForm } from 'redux-form';
// import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import TextField from '@material-ui/core/TextField';

import { signupUser } from 'actions';

const { input, select, textarea } = ReactDOM;

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class FacebookSignup extends Component {
  static propTypes = {
    signupUser: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  onSubmit = (inputs) => {
    this.props.signupUser(inputs)
      .then(() => {
        Router.push('/');
      });
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
      {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2 className="card-heading">Complete Signup</h2>
          <div className="field-line">
            {/*<Field name="birthday" type="date" component={input} label="Birthday" />*/}
          </div>
          <div className="field-line">
            <div>
              {/*<label><Field name="sex" component={input} type="radio" value="male"/> Male</label>*/}
              {/*<label><Field name="sex" component={input} type="radio" value="female"/> Female</label>*/}
            </div>
          </div>
          <div className="field-line">
            {/*<Field name="city" type="text" component={input} label="City" />*/}
          </div>
          <div className="button-line">
            <button type="submit" label="Create New Account" primary />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { signupUser })(FacebookSignup);
