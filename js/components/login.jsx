import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/index';

function signinUser(props) {
  axios.post('/api/users/signin', props)
    .then(response => {
      // localStorage.setItem('token', response.data.token);
      browserHistory.push('/search');
      return { type: 'LOGIN_USER_SUCCESS' };
  })
}

/* -- Authentication currently not working. Needs major work! -- */
class LogIn extends Component {

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops! </strong>{this.props.errorMessage}
        </div>
      )
    }
  }

  handleFormSubmit ({ username, password }) {
    console.log(username, password);
    signinUser({ username, password });
  }

  render() {
    const { handleSubmit, fields: { username, password } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="input-group">
        <h1> Login </h1>
        <div>
          <label>Username: </label>
          <input {...username} type="text" />
        </div>
        <div>
          <label>Password: </label>
          <input {...password} type="password" />
        </div>
        <button action="submit">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({ form: 'LoginForm', fields: ['username', 'password']}, mapStateToProps, actions)(LogIn);
