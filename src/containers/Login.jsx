import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Form, Field } from 'react-final-form';

import { loginUser } from '../actions/index';

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
      <div className="page__container">
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit} className="form">
              <h2 className="form__title">
                Log In
              </h2>
              <Field
                component={this.renderField}
                name="email"
                label="Email"
              />
              <Field
                component={this.renderField}
                name="password"
                type="password"
                label="Password"
              />
              <button
                className="button button--flat button--large form__submit"  
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
