import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import { getCurrentUser, editBio } from 'actions';
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

import { genders, edLevels, days, months, years } from 'constants/form';

import App from 'components/App';
import ImageUpload from 'components/ImageUpload';
import {
  renderField,
  renderRadioGroup,
  renderSelect,
  renderSelectNumber,
  renderTextArea,
} from 'components/Form';

class Account extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      sex: PropTypes.string,
      // city: PropTypes.string,
      // job: PropTypes.string,
      edLevel: PropTypes.string,
      aboutMe: PropTypes.string,
      image_url: PropTypes.string,
    }),
    handleSubmit: PropTypes.func.isRequired,
    editBio: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    isEdited: PropTypes.bool,
  }
  constructor(props) {
    super(props);

    this.state = {
      birthDate: null,
      birthMonth: 1,
      birthYear: new Date().getFullYear(),
    }
  }

  onSubmit = (inputs) => {
    this.props.getCurrentUser(getUsername())
      .then(() => ({ ...this.props.profile, ...inputs }))
      .then(props => this.props.editBio(props));
  }

  render() {
    const { birthMonth, birthYear } = this.state;
    console.log('birthMonth', birthMonth);
    console.log('birthYear', birthYear);
    console.log('days(birthMonth, birthYear)', days(birthMonth, birthYear));
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
                  options={genders}
                  label="Sex"
                />
                <div className="form--group">
                  <label className="form--label">Birthday</label>
                  <Field
                    name="day"
                    label="Day"
                    component={renderSelectNumber}
                    options={days(birthMonth, birthYear)}
                  />
                  <Field
                    name="month"
                    label="Month"
                    component={renderSelectNumber}
                    options={months}
                    value={birthMonth}
                  />
                  <Field
                    name="year"
                    label="Year"
                    component={renderSelectNumber}
                    options={years}
                    value={birthYear}
                  />

                </div>
                <Field
                  name="edLevel"
                  component={renderSelect}
                  label="Education Level"
                  options={edLevels}
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
                        'button__flat': true,
                        'button__large': true,
                        'form--submit': true,
                        'button__disabled': invalid || pristine,
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
                        'button__flat': true,
                        'button__large': true,
                        'form--submit': true,
                        'button__disabled': invalid || pristine,
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
export default connect(mapStateToProps, { getCurrentUser, editBio })(Account);
