import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { signupUser } from '../actions/index';

console.log('CONTAINER/SIGN UP | Exporting SIGN UP...');

console.log('CONTAINER/SIGN UP | IMPORTING Action: signupUser from ACTIONS');

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      username: '',
      password: '',
      name: '',
      email: '',
      age: '',
      sex: '',
      city: '',
    };
  }

  onSubmit = (event) => {
    const resultObj = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      sex: this.state.sex,
      city: this.state.city,
    };
    event.preventDefault();
    this.props.signupUser(resultObj);
    hashHistory.push('/login');
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onAgeChange = (event) => {
    this.setState({ age: event.target.value });
  }

  onSexChange = (event) => {
    this.setState({ sex: event.target.value });
  }

  onCityChange = (event) => {
    this.setState({ city: event.target.value });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Card className="container">
            <form onSubmit={this.onSubmit}>
              <h2 className="card-heading">Sign Up</h2>

              {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

              <div className="field-line">
                <TextField
                  floatingLabelText="Username"
                  name="username"
                  type="text"
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
              <div className="field-line">
                <TextField
                  floatingLabelText="Name"
                  name="name"
                  type="text"
                  errorText={this.state.errors.name}
                  onChange={this.onNameChange}
                  value={this.state.name}
                />
              </div>
              <div className="field-line">
                <TextField
                  floatingLabelText="Email"
                  type="email"
                  name="email"
                  errorText={this.state.errors.email}
                  onChange={this.onEmailChange}
                  value={this.state.email}
                />
              </div>
              <div className="field-line">
                <TextField
                  floatingLabelText="Age"
                  type="number"
                  name="age"
                  errorText={this.state.errors.age}
                  onChange={this.onAgeChange}
                  value={this.state.age}
                />
              </div>
              <div className="field-line">
                <RadioButtonGroup
                  name="sex"
                  defaultSelected="male"
                  errorText={this.state.errors.sex}
                  onChange={this.onSexChange}
                  valueSelected={this.state.sex}
                >
                  <RadioButton
                    value="male"
                    label="Male"
                    style={styles.radioButton}
                  />
                  <RadioButton
                    value="female"
                    label="Female"
                    style={styles.radioButton}
                  />
                </RadioButtonGroup>
              </div>
              <div className="field-line">
                <TextField
                  floatingLabelText="City"
                  type="text"
                  name="city"
                  errorText={this.state.errors.city}
                  onChange={this.onCityChange}
                  value={this.state.city}
                />
              </div>
              <div className="button-line">
                <RaisedButton type="submit" label="Create New Account" primary />
              </div>

              <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
            </form>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }

}

SignUp.contextTypes = {
  router: PropTypes.object.isRequired,
  signupUser: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signupUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp);
