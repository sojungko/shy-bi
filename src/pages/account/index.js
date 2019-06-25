import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import { getUser, editBio } from 'actions';
import { getUsername } from 'modules/auth';
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
import ImageUpload from 'components/ImageUpload';
import {
  renderField,
  renderRadioGroup,
  renderSelect,
  renderTextArea,
} from 'components/Form';

class Account extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      sex: PropTypes.string,
      city: PropTypes.string,
      job: PropTypes.string,
      edLevel: PropTypes.string,
      aboutMe: PropTypes.string,
      image_url: PropTypes.string,
    }),
    handleSubmit: PropTypes.func.isRequired,
    editBio: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    reset: PropTypes.func,
    isEdited: PropTypes.bool,
  }

  onSubmit = (inputs) => {
    this.props.getUser(getUsername())
      .then(() => ({ ...this.props.profile, ...inputs }))
      .then(props => this.props.editBio(props));
  }

  render() {
    return (
      <App>
        <div className="page__container">
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit} className="form form__left">
                <h2 className="form--title">
                  Edit Profile
                </h2>
                <Field
                  render={renderField}
                  name="name"
                  label="Name"
                />
                <Field
                  component={renderField}
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
                <Field
                  name="email"
                  type="email"
                  component={renderField}
                  label="Email"
                />
                <Field
                  name="sex"
                  component={renderRadioGroup}
                  options={["Male", "Female", "Other"]}
                  label="Sex"
                />
                <Field
                  name="edLevel"
                  component={renderSelect}
                  label="Education Level"
                  options={["High School", "Some College", "Bachelor's", "Master's", "Ph.D.", "Other"]}
                />
                <Field
                  name="aboutMe"
                  component={renderTextArea}
                  label="About Me"
                />
                <ImageUpload />
                <div className="button-line">
                  <button
                    className={
                      classNames({
                        'button': true,
                        'button--flat': true,
                        'button--large': true,
                        'form--submit': true,
                        'button--disabled': invalid || pristine,
                      })
                    }
                    type="submit"
                    disabled={invalid || pristine}
                  >
                    Submit
                  </button>
                  <button
                    className={
                      classNames({
                        'button': true,
                        'button--flat': true,
                        'button--large': true,
                        'form--submit': true,
                        'button--disabled': invalid || pristine,
                      })
                    }
                    disabled={pristine}>
                    Clear Fields
                  </button>
                </div>
                {/*<div
                  open={this.props.isEdited || false}
                  message="Profile successfully updated!"
                  autoHideDuration={4000}
                />*/}
              </form>
            )}
          />
        </div>

      </App>
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  profile,
  isEdited: profile.isEdited,
});
export default connect(mapStateToProps, { getUser, editBio })(Account);
