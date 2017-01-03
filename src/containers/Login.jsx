import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { loginUser } from '../actions/index';

console.log('CONTAINER/LOGIN | Exporting LOGIN...');

console.log('CONTAINER/LOGIN | IMPORTING Action: loginUser from ACTIONS');

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

    // console.log('    CONTAINER/LOGIN | Initializing State...', this.state);
    console.log('    CONTAINER/LOGIN | Initializing State...');
  }

  componentDidMount() {
    console.log('    CONTAINER/LOGIN | Complete Rendering LOGIN ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    CONTAINER/LOGIN | Receiving Props: ', nextProps);
    console.log('    CONTAINER/LOGIN | Receiving Props');
  }

  componentDidUpdate() {
    console.log('    CONTAINER/LOGIN | Complete Rendering LOGIN ');
    console.log(' ');
  }

  onSubmit = (event) => {
    const resultObj = {
      username: this.state.username,
      password: this.state.password,
    };

    // console.log('    CONTAINER/LOGIN | Submmiting Log In Form...', resultObj);
    console.log('    CONTAINER/LOGIN | Submmiting Log In Form...');

    event.preventDefault();
    this.props.loginUser(resultObj);
  }

  onUsernameChange = (event) => {
    console.log('    CONTAINER/LOGIN | Username: ', event.target.value);
    this.setState({ username: event.target.value });
  }

  onPasswordChange = (event) => {
    console.log('    CONTAINER/LOGIN | Password: ', event.target.value);
    this.setState({ password: event.target.value });
  }

  render() {
    console.log('    CONTAINER/LOGIN | Rendering LOGIN Container... ');
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

// console.log('CONTAINER/LOGIN & REDUX | Mapping actions to props: ', loginUser);
console.log('CONTAINER/LOGIN & REDUX | Mapping actions to props: loginUser');
console.log('CONTAINER/LOGIN | Connecting LOGIN Container with REDUX STORE');
export default connect(null, { loginUser })(LogIn);
console.log('CONTAINER/LOGIN | Exported LOGIN');
console.log(' ');
