import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { loginUser } from '../actions/index';

console.log('CONTAINER/LOGIN | Exporting LOGIN...');

console.log('CONTAINER/LOGIN | IMPORTING Action: loginUser from ACTIONS');

class LogIn extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    console.log('    CONTAINER/LOGIN | Complete Rendering LOGIN ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    CONTAINER/LOGIN | Receiving Props: ', nextProps);
    console.log('    CONTAINER/LOGIN | Receiving Props');
  }

  componentDidUpdate() {
    console.log('    CONTAINER/LOGIN | Complete Rendering LOGIN ');
    console.log(' ');
  }

  onSubmit = (inputs) => {
    console.log(`    CONTAINER/LOGIN | Submitting Log In Form
      User: ${inputs.username}
      Password: ${inputs.password}`);
    this.props.loginUser(inputs);
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <Card className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2 className="card-heading">LogIn</h2>
          <div className="field-line">
            <Field name="username" type="text" component={this.renderTextField} label="Username" />
          </div>
          <div className="field-line">
            <Field name="password" type="password" component={this.renderTextField} label="Password" />
          </div>
          <div className="button-line">
            <RaisedButton type="submit" label="Log in" disabled={pristine || submitting} primary />
          </div>
          <CardText>
            Don&apos;t have an account?<Link to={'/signup'}> Create one</Link>.
          </CardText>
        </form>
      </Card>
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

// console.log('CONTAINER/LOGIN & REDUX | Mapping actions to props: loginUser');
console.log('CONTAINER/LOGIN & REDUX | Mapping actions to props: ', loginUser);
console.log('CONTAINER/LOGIN | Connecting LOGIN Container with REDUX STORE');

LogIn = reduxForm({
  form: 'LogIn',
  validate,
})(LogIn);

const selector = formValueSelector('myFormName');

export default connect(null, { loginUser })(LogIn);

console.log('CONTAINER/LOGIN | Exported LOGIN');
console.log(' ');
