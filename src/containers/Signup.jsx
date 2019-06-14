import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
// import AutoComplete from '../components/AutoComplete';
import { signupUser, getLocations } from '../actions/index';
const { input, select, textarea } = ReactDOM;
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

  /*renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
      style={font}
    />
  );*/

  /*renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
      {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );*/

  renderRadioButton = ({ input, label }) => (
    <Fragment>
      <label>{label}</label>
      <input type="radio" />
    </Fragment>
  );
  renderInput = ({ input, label }) => (
    <Fragment>
      <label>{label}</label>
      <input />
    </Fragment>
  )

  render() {
  //   const renderAutoComplete = () => (
  //     <AutoComplete
  //       style={font}
  //       location={this.props.location || []}
  //     />
  // );

    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="field-line">
              <Field name="username" type="text" component={this.renderInput} label="Username" />
            </div>
            <div className="field-line">
              <Field name="password" type="password" component={this.renderInput} label="Password" />
            </div>
            <div className="field-line">
              <Field name="name" type="text" component={this.renderInput} label="Name" />
            </div>
            <div className="field-line">
              <Field name="email" type="email" component={this.renderInput} label="Email" />
            </div>
            <div className="field-line">
              <Field name="age" type="number" component={this.renderInput} label="Age" />
            </div>
            <div className="field-line">
              <div>
                <label><Field name="sex" component={this.renderRadioButton} type="radio" value="male"/> Male</label>
                <label><Field name="sex" component={this.renderRadioButton} type="radio" value="female"/> Female</label>
              </div>
            </div>
            {/* <div className="field-line">
              <Field name="city" type="text" style={font} component={this.renderTextField} label="City" />
            </div> */}
            <div className="button-line">
              <button
                type="submit"
                className="button button--flat"
                disabled={pristine || submitting}
              >
                Create New Account
              </button>
            </div>
             <div style={font}>Already have an account? <Link to={'/login'}>Log in</Link></div> 
          </form>
        </div>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password', 'name', 'email', 'age', 'sex', 'city'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

SignUp = reduxForm({
  form: 'SignUp',
  validate,
})(SignUp);

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { signupUser, getLocations })(SignUp);
