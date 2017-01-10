import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { loginUser } from '../actions/index';

class LogIn extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  onSubmit = (inputs) => {
    this.props.loginUser(inputs)
      .then(() => this.context.router.push('/'));
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <Card>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2 className="card-heading">LogIn</h2>
          <div className="field-line">
            <Field name="username" type="text" component={this.renderTextField} label="Username" />
          </div>
          <div className="field-line">
            <Field name="password" type="password" component={this.renderTextField} label="Password" />
          </div>
          <div className="button-line">
            <RaisedButton type="submit" label="Log in" disabled={pristine || submitting} primary />
          </div>
          <a href="/auth/facebook">
            <RaisedButton label="Login with Facebook" primary />
          </a>
          <CardText>
            Don&apos;t have an account?<Link to={'/signup'}> Create one</Link>.
          </CardText>
        </form>
      </Card>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

LogIn = reduxForm({
  form: 'LogIn',
  validate,
})(LogIn);

export default connect(null, { loginUser })(LogIn);
