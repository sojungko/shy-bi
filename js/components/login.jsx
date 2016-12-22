import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';

/* -- Authentication currently not working. Needs major work! -- */
class LogIn extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(loginUser)} className="input-group">
        <h1> Login </h1>
        <div>
          <label>Username: </label>
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label>Password: </label>
          <Field name="password" component="input" type="password" />
        </div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Reset Form</button>
      </form>
    );
  }
}

function mapStateToProps({ login }) {
  return { login };
}

export default reduxForm({ form: 'LoginForm' }, mapStateToProps, { loginUser })(LogIn);
