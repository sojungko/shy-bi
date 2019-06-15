import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { Field, reduxForm } from 'redux-form';
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

  renderRadioButton = ({ input, label, ...rest }) => (
    <Fragment>
      <label>{label}</label>
      <input type="radio" {...input} {...rest} />
    </Fragment>
  );
  renderInput = ({ input, label, ...rest }) => {
    return (
    <Fragment>
      <label>{label}</label>
      <input {...input} {...rest}/>
    </Fragment>
  )
  }

  render() {
    const required = value => (value || typeof value === 'number' ? undefined : 'Required')
    const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="form-group">
              {/*<Field
                name="username"
                type="text"
                component={this.renderInput}
                label="Username"
                className="form-control"
                validate={[required]}
              />*/}
            </div>
            <div className="form-group">
              {/*<Field
                name="password"
                type="password"
                component={this.renderInput}
                label="Password"
                className="form-control"
                validate={[required]}
              />*/}
            </div>
            <div className="form-group">
              {/*<Field
                name="name"
                type="text"
                component={this.renderInput}
                label="Name"
                className="form-control"
                validate={[required]}
              />*/}
            </div>
            <div className="form-group">
              {/*<Field
                name="email"
                type="email"
                component={this.renderInput}
                label="Email"
                className="form-control"
                validate={[required]}
              />*/}
            </div>
            <div className="form-group">
              {/*<Field
                name="age"
                type="number"
                component={this.renderInput}
                label="Age"
                className="form-control"
                validate={[required, number]}
              />*/}
            </div>
            <div className="form-group">
              <div>
                {/*<label><Field name="sex" component={this.renderRadioButton} type="radio" value="male"/> Male</label>*/}
                {/*<label><Field name="sex" component={this.renderRadioButton} type="radio" value="female"/> Female</label>*/}
              </div>
            </div>
            <div className="button-line">
              <button
                type="submit"
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

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { signupUser, getLocations })(SignUp);
