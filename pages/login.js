import React, { Component } from 'react';
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
import {
  renderField,
} from 'components/Form';

class LogIn extends Component {
  static getInitialProps = ({ asPath }) => {
    return { asPath };
  }
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  }

  onSubmit = (inputs) => {
    console.log('hello world');
    // console.log('this.props.loginUser', this.props.loginUser);
    console.log('this.props in onSubmit', this.props);
    this.props.loginUser(inputs)
      .then(() => Router.push('/'));
  }

  render() {
    const { asPath } = this.props;

    return (
      <App asPath={asPath}>
        <div className="page__container">
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit} className="form form__login">
                <h2 className="form--title">
                  Log In
                </h2>
                <Field
                  render={renderField}
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
                  render={renderField}
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
                      'button__flat': true,
                      'button__large': true,
                      'form--submit': true,
                      'button__disabled': invalid || pristine,
                    })
                  }
                  type="submit"
                  disabled={invalid || pristine}
                >
                  Log In
                </button>
                <div className="form--text">
                  Don&apos;t have an account?<Link><a href="/signup" className="form--link"> Create one</a></Link>.
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
