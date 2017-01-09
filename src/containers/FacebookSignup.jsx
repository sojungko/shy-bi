import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

import { signupUser } from '../actions/index';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class FacebookSignup extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    signupUser: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  onSubmit = (inputs) => {
    this.props.signupUser(inputs)
      .then(() => {
        this.context.router.push('/');
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
    <RadioButtonGroup
      {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );

  render() {
    const { handleSubmit } = this.props;

    return (
      <Card className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2 className="card-heading">Complete Signup</h2>
          <div className="field-line">
            <Field name="birthday" type="date" component={this.renderTextField} label="Birthday" />
          </div>
          <div className="field-line">
            <div>
              <Field name="sex" component={this.renderRadioGroup}>
                <RadioButton value="male" label="male" style={styles.RadioButton} />
                <RadioButton value="female" label="female" style={styles.RadioButton} />
              </Field>
            </div>
          </div>
          <div className="field-line">
            <Field name="city" type="text" component={this.renderTextField} label="City" />
          </div>
          <div className="button-line">
            <RaisedButton type="submit" label="Create New Account" primary />
          </div>
        </form>
      </Card>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ['birthday', 'sex', 'city'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

FacebookSignup = reduxForm({
  form: 'FacebookSignup',
  validate,
})(FacebookSignup);

export default connect(null, { signupUser })(FacebookSignup);
