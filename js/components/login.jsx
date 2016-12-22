import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { logIn } from '../actions/index';

class LogIn extends Component {

  componentWillMount(props) {
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(logIn)} className="input-group">
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


export default reduxForm({ form: 'LoginForm' }, null, { logIn })(LogIn);
