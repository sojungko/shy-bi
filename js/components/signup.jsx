import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../actions/index';

class SignUp extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(signupUser)} className="input-group">
        <h3>Sign up!</h3>
        <div>
          <label>Username</label>
          <Field name="username" component="input" type="text"/>
        </div>
        <div>
          <label>Password</label>
          <Field name="password" component="input" type="password"/>
        </div>
        <div>
          <label>Email</label>
          <Field name="email" component="input" type="text" />
        </div>
        <div>
          <label>Name</label>
          <Field name="name" component="input" type="text" />
        </div>
        <div>
          <label>Age</label>
          <Field name="age" component="input" type="number" />
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
            <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
          </div>
        </div>
        <div>
          <label>City</label>
          <Field name="city" component="input" type="text" />
        </div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
      </form>
    );
  }
}

export default reduxForm({ form: 'SignupForm' }, null, { signupUser })(SignUp);
