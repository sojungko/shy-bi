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

  renderRadioButton = ({ input, label, ...rest }) => (
    <Fragment>
      <label>{label}</label>
      <input type="radio" {...input} {...rest} />
    </Fragment>
  );

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
    const { asPath } = this.props;
    return (
      <App asPath={asPath}>
        <div className="page__container">
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit} className="form">
                <h2 className="form__title">
                  Sign Up
              </h2>
                <Field
                  render={this.renderField}
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
                  render={this.renderField}
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
                >
                  Create New Account
              </button>
                <div className="form__text">Already have an account? <Link><a href='/login' className="form__link">Log in</a></Link></div>
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
