import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';

/* -- Authentication currently not working. Needs major work! -- */
class LogIn extends Component {

  handleFormSubmit({ username, password }) {
    loginUser({ username, password });
  }

  renderAlert() {
    console.log('components/login renderAlert this.props : ', this.props)
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops! </strong>{this.props.errorMessage}
        </div>
      )
    }
  }

  render() {

    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="input-group">
        <h1> Login </h1>
        <div>
          <label>Username: </label>
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label>Password: </label>
          <Field name="password" component="input" type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  console.log('components/login mapStateToProps state : ', state);
  return { errorMessage: state.auth.error };
}

export default reduxForm({ form: 'LoginForm' }, mapStateToProps, { loginUser })(LogIn);
