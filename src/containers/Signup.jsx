import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Form, Field } from 'react-final-form';

import { signupUser, getLocations } from '../actions/index';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const font = {
  fontFamily: 'Source Sans Pro',
};

class SignUp extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

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
        this.context.router.push('/');
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
      <div className="page__container page__container--centered">
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit} className="form">
              <h2 className="form__title">
                Sign Up
              </h2>
              <Field
                component={this.renderField}
                name="username"
                type="text"
                label="Username"
              />
              <Field
                component={this.renderField}
                name="password"
                type="password"
                label="Password"
              />
              <Field
                component={this.renderField}
                name="name"
                type="text"
                label="Name"
              />
              <Field
                component={this.renderField}
                name="email"
                type="email"
                label="Email"
              />
              {/*<Field
                component={this.renderField}
                name="age"
                type="number"
                label="Age"
              />*/}
              {/*<div>*/}
                {/*<label><Field name="sex" component={this.renderRadioButton} type="radio" value="male"/> Male</label>*/}
                {/*<label><Field name="sex" component={this.renderRadioButton} type="radio" value="female"/> Female</label>*/}
              {/*</div>*/}
              <button
                className="button button--flat button--large form__submit"  
                type="submit"
              >
                Create New Account
              </button>
             <div className="form__text">Already have an account? <Link to={'/login'}>Log in</Link></div> 
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { signupUser, getLocations })(SignUp);
