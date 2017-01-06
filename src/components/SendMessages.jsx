import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class LogIn extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  onSubmit = (inputs) => {
    console.log(inputs);
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
    const { handleSubmit, valid, pristine, submitting } = this.props;
    return (
      <Card className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2 className="card-heading">Send Message</h2>
          <div className="field-line">
            <Field name="sendTo" type="text" component={this.renderTextField} label="Send To" />
          </div>
          <div className="field-line">
            <Field name="title" type="text" component={this.renderTextField} label="Title" />
          </div>
          <div className="field-line">
            <Field name="message" type="text" component={this.renderTextField} label="Message" />
          </div>
          <div className="button-line">
            <RaisedButton type="submit" label="Send" disabled={pristine || !valid || submitting} primary />
          </div>
        </form>
      </Card>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ['sendTo', 'title', 'message'];
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

export default connect(null, null)(LogIn);
