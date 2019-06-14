import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

import { getUsername } from '../modules/auth';
import { sendMessage, getSentMessages, getMatches } from '../actions/index';

const { input, select, textarea } = ReactDOM;

const style = {
  fontFamily: 'Source Sans Pro',
};

class SendMessages extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    sendMessage: PropTypes.func.isRequired,
    getSentMessages: PropTypes.func.isRequired,
    getMatches: PropTypes.func.isRequired,
    matches: PropTypes.node,
  }

  componentWillMount() {
    console.log('Component Will Mount');
    this.props.getMatches(getUsername())
     .then(() => console.log('MATCHES : ', this.props.matches));
  }

  onSubmit = (inputs) => {
    const senderID = getUsername();
    const request = {
      senderID,
      receiverID: inputs.sendTo,
      title: inputs.title,
      body: inputs.message,
    };

    this.props.sendMessage(request)
      .then(() => {
        this.props.getSentMessages(senderID);
      })
      .then(() => {
        this.context.router.push('/messages');
      });
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      style={style}
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

  render() {
    const children = this.props.matches.map(match => (
      <MenuItem
        style={style}
        key={match.username}
        value={match.username}
        primaryText={match.username}
      />
      ));

    const renderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => (
      <Select
        style={style}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        {...custom}
      >
        {children}
      </Select>
  );

    const { handleSubmit, valid, pristine, submitting } = this.props;
    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2 style={style} className="card-heading">Send Message</h2>
          <div className="field-line">
            <Field name="sendTo" type="text" component={select} label="Send To" />
          </div>
          <div className="field-line">
            <Field name="title" type="text" component={input} label="Title" />
          </div>
          <div className="field-line">
            <Field name="message" type="text" component={textarea} label="Message" />
          </div>
          <div className="button-line">
            <button style={style} type="submit" label="Send" disabled={pristine || !valid || submitting} primary />
          </div>
        </form>
      </div>
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

SendMessages = reduxForm({
  form: 'SendMessages',
  validate,
})(SendMessages);

const mapStateToProps = ({ messages, users }) => ({
  sent: messages.sent,
  matches: users.matches,
});

export default connect(mapStateToProps, { sendMessage, getSentMessages, getMatches })(SendMessages);
