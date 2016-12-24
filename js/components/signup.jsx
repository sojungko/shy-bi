import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../actions/index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class SignUp extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <MuiThemeProvider>
        <Card className="container">
          <form onSubmit={handleSubmit(signupUser)} className="input-group">
            <h2 className="card-heading">Sign up</h2>
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
            <div className="button-line">
              <RaisedButton type="submit" label="Sign up" disabled={pristine || submitting} primary />
              <RaisedButton type="button" label="Undo Changes" disabled={pristine || submitting} onClick={reset} default />
            </div>
          </form>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default reduxForm({ form: 'SignupForm' }, null, { signupUser })(SignUp);
