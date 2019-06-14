import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

import { loginUser } from '../actions/index';
const  { input, select, textarea } = ReactDOM;

class LogIn extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  onSubmit = (inputs) => {
    // this.context.router.push('/home');
    this.props.loginUser(inputs)
      .then(() => this.context.router.push('/'));
  }

  // renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  //   <TextField
  //     hintText={label}
  //     floatingLabelText={label}
  //     errorText={touched && error}
  //     {...input}
  //     {...custom}
  //     style={{ fontFamily: 'Source Sans Pro' }}
  //   />
  // )
  renderInput = ({ input, label }) => (
    <Fragment>
      <label>{label}</label>
      <input />
    </Fragment>
  )

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            Log In
          </h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="card-text">
              <Field name="username" type="text" component={this.renderInput} label="Username" />
            </div>
            <div className="card-text">
              <Field name="password" type="password" component={this.renderInput} label="Password" />
            </div>
            <div>
              <button
                type="submit"
                className="button button--flat"
                disabled={pristine || submitting}
              >
                Log In
              </button>
            </div>
            {/*<a href="/auth/facebook">
              <button labelStyle={{ fontFamily: 'Source Sans Pro' }} label="Login with Facebook" />
            </a>*/}
             <div style={{ fontFamily: 'Source Sans Pro' }}>
              Don&apos;t have an account?<Link to={'/signup'}> Create one</Link>.
            </div> 
          </form>
        </div>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

LogIn = reduxForm({
  form: 'LogIn',
  validate,
})(LogIn);

export default connect(null, { loginUser })(LogIn);
