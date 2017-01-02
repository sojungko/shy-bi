import React, { Component, PropTypes } from 'react';
import Auth from '../modules/auth';
import { loginUser } from '../actions/index'
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class LogIn extends Component {
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      username: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(event) {
    let resultObj = {
      username: this.state.username,
      password: this.state.password,
    }
    event.preventDefault();
    this.props.loginUser(resultObj)
    // browserHistory.push('/');
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Card className="container">
            <form action="/" onSubmit={this.onSubmit}>
              <h2 className="card-heading">Login</h2>

              {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
              {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

              <div className="field-line">
                <TextField
                  floatingLabelText="Username"
                  name="username"
                  errorText={this.state.errors.username}
                  onChange={this.onUsernameChange}
                  value={this.state.username}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Password"
                  type="password"
                  name="password"
                  onChange={this.onPasswordChange}
                  errorText={this.state.errors.password}
                  value={this.state.password}
                />
              </div>

              <div className="button-line">
                <RaisedButton type="submit" label="Log in" primary />
              </div>

              <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
            </form>
          </Card>
      </div>
    </MuiThemeProvider>
    );
  }

}

LogIn.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(null, { loginUser })(LogIn);
