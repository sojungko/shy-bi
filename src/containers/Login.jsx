import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Form, Field } from 'react-final-form';

import { loginUser } from '../actions/index';
const  { input, select, textarea } = ReactDOM;

class LogIn extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  }

  onSubmit = (inputs) => {
    this.props.loginUser(inputs)
      .then(() => this.context.router.push('/'));
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="form__group">
      <label className="form__label">{label}</label>
      <input {...input} type={type} className="form__input" />
      {
        touched && error && <span className="form__warning">{error}</span>
      }
    </div>
  )

  render() {
    return (
      <div className="page__container page__container--spaced">
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit} className="form">
              <h2 className="form__title">
                Log In
              </h2>
              <Field
                component={this.renderField}
                name="username"
                label="Username"
              />
              <Field
                component={this.renderField}
                name="password"
                type="password"
                label="Password"
              />
              <button
                class="button button--flat"  
                type="submit"
                disabled={invalid || pristine}
              >
                Log In
              </button>
              <div className="form__text">
                Don&apos;t have an account?<Link to={'/signup'}> Create one</Link>.
              </div> 
            </form>
          )}
        />
      </div>
    );
  }
}

export default connect(null, { loginUser })(LogIn);
