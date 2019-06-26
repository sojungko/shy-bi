import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import { signupUser, getLocations } from 'actions';
import {
  email,
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

class SignUp extends Component {
  static getInitialProps = ({ asPath }) => {
    return { asPath };
  }
  static propTypes = {
    signupUser: PropTypes.func,
    getLocations: PropTypes.func,
    location: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  shouldComponentUpdate = nextProps => !nextProps.location

  onSubmit = (inputs) => {
    this.props.signupUser(inputs)
      .then(() => {
        Router.push('/');
      });
  }

  handleUpdateInput = (inputs) => {
    this.props.getLocations(inputs);
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
                  Sign Up
              </h2>
                <Field
                  render={renderField}
                  name="email"
                  label="Email"
                  validate={
                    composeValidators(
                      email,
                      required,
                      mustContainLetter,
                    )}
                />
                <Field
                  render={renderField}
                  name="username"
                  type="username"
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
                >
                  Create New Account
              </button>
                <div className="form--text">Already have an account? <Link><a href='/login' className="form--link">Log in</a></Link></div>
              </form>
            )}
          />
        </div>
      </App>
    );
  }
}

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { signupUser, getLocations })(withRouter(SignUp));
