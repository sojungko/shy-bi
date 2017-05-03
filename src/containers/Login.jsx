import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Card, CardHeader, CardText } from 'material-ui/Card';
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
    // this.context.router.push('/home');
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
      style={{ fontFamily: 'Source Sans Pro' }}
    />
  )

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <Card className="container" style={{ display: 'block' }}>
        <div style={{ margin: '0 auto', paddingTop: '81px', paddingBottom: '358px', width: '300px' }}>
          <CardHeader
            title="Log In"
            titleStyle={{ fontFamily: 'Source Sans Pro', fontSize: '30px' }}
            titleColor="black"
          />
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="field-line">
              <Field name="username" type="text" component={this.renderTextField} label="Username" />
            </div>
            <div className="field-line">
              <Field name="password" type="password" component={this.renderTextField} label="Password" />
            </div>
            <div className="button-line">
              <RaisedButton
                type="submit"
                label="Log in"
                labelStyle={{ fontFamily: 'Source Sans Pro' }}
                disabled={pristine || submitting}
              />
            </div>
            <a href="/auth/facebook">
              <RaisedButton labelStyle={{ fontFamily: 'Source Sans Pro' }} label="Login with Facebook" />
            </a>
            <CardText style={{ fontFamily: 'Source Sans Pro' }}>
              Don&apos;t have an account?<Link to={'/signup'}> Create one</Link>.
            </CardText>
          </form>
        </div>
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
