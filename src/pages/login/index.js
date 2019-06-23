import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import { loginUser } from 'actions';
import {
  required,
  mustBeShorterThan,
  mustBeLongerThan,
  noSpecialChars,
  mustContainNumber,
  mustContainLetter,
  composeValidators,
} from 'modules/validators';

import App from 'components/App';

class LogIn extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  }

  onSubmit = (inputs) => {
    this.props.loginUser(inputs)
      .then(() => Router.push('/'));
  }

  renderField = ({ input, label, meta: { touched, error, warning } }) => (
    <div className="form__group">
      <label className="form__label">{label}</label>
      <input {...input} className="form__input" />
      {
        touched && error && <span className="form__warning">{error}</span>
      }
    </div>
  )

  render() {

    return (
      <App>
        <div className="page__container">
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit} className="form">
                <h2 className="form__title">
                  Log In
                </h2>
                <Field
                  render={this.renderField}
                  name="username"
                  label="Username"
                  validate={
                    composeValidators(
                      required,
                      noSpecialChars,
                      mustContainLetter,
                      mustBeLongerThan(6),
                      mustBeShorterThan(12)
                    )}
                />
                <Field
                  render={this.renderField}
                  name="password"
                  type="password"
                  label="Password"
                  validate={
                    composeValidators(
                      required,
                      mustBeLongerThan(8),
                      mustBeShorterThan(16),
                      mustContainLetter,
                      mustContainNumber
                    )
                  }
                />
                <button
                  className={
                    classNames({
                      'button': true,
                      'button--flat': true,
                      'button--large': true,
                      'form__submit': true,
                      'button--disabled': invalid || pristine,
                    })
                  }
                  type="submit"
                  disabled={invalid || pristine}
                >
                  Log In
                </button>
                <div className="form__text">
                  Don&apos;t have an account?<Link><a href="/signup"> Create one</a></Link>.
                </div>
              </form>
            )}
          />
        </div>
      </App>  
    );
  }
}

export default connect(null, { loginUser })(withRouter(LogIn));
