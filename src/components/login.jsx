import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { loginUser } from '../actions/index';
import Auth from '../modules/auth';

console.log('COMPONENT/LOGIN | Exporting LOGIN...');

console.log('COMPONENT/LOGIN | IMPORTING Action: loginUser from ACTIONS');
console.log('COMPONENT/LOGIN | IMPORTING AUTH MODULES');

class LogIn extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

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

    console.log('    COMPONENT/LOGIN | Initializing State...', this.state);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentDidMount() {
    console.log('    COMPONENT/LOGIN | Complete Rendering LOGIN ');
  }

  componentWillReceiveProps(nextProps) {
    console.log('    COMPONENT/LOGIN | Receiving Props: ', nextProps);
  }

  componentDidUpdate() {
    console.log('    COMPONENT/LOGIN | Complete Rendering LOGIN ');
    console.log(' ');
  }

  onSubmit(event) {
    const resultObj = {
      username: this.state.username,
      password: this.state.password,
    };

    console.log('    COMPONENT/LOGIN | Submmiting Log In Form...', resultObj);

    event.preventDefault();
    this.props.loginUser(resultObj);
  }

  onUsernameChange(event) {
    console.log('    COMPONENT/LOGIN | Username: ', event.target.value);
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    console.log('    COMPONENT/LOGIN | Password: ', event.target.value);
    this.setState({ password: event.target.value });
  }

  render() {
    console.log('    COMPONENT/LOGIN | Rendering LOGIN... ');
    return (
      <MuiThemeProvider>
        <div>
          <Card className="container">
            <form action="/" onSubmit={this.onSubmit}>
              <h2 className="card-heading">Login</h2>

              {this.state.successMessage &&
                <p className="success-message">{this.state.successMessage}</p>}
              {this.state.errors.summary &&
                <p className="error-message">{this.state.errors.summary}</p>}

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

              <CardText>
                Don&apos;t have an account?<Link to={'/signup'}>Create one</Link>.
              </CardText>
            </form>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

console.log('COMPONENT/LOGIN & REDUX | Mapping actions to props: ', loginUser);
console.log('COMPONENT/LOGIN | Connecting LOGIN Container with REDUX STORE');
export default connect(null, { loginUser })(LogIn);
console.log('COMPONENT/LOGIN | Exported LOGIN');
console.log(' ');
