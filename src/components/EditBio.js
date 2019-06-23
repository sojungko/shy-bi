import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
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

import ImageUpload from './ImageUpload';

class EditBio extends Component {
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

  renderField = ({ input, label, meta: { touched, error, warning } }) => (
    <div className="form__group">
      <label className="form__label">{label}</label>
      <input {...input} className="form__input" />
      {
        touched && error && <span className="form__warning">{error}</span>
      }
    </div>
  )

  // renderCheckbox = ({ input, label }) => (
    /*<Checkbox
      label={label}
      checked={!!input.value}
      onCheck={input.onChange}
    />*/
  // )

  renderRadioButton = ({ input, label, ...rest }) => (
    <Fragment>
      <label>{label}</label>
      <input type="radio" {...input} {...rest} />
    </Fragment>
  )

  // renderSelectField = ({ input, label, ...rest }) => (
  //   /*<Select
  //     floatingLabelText={label}
  //     errorText={touched && error}
  //     {...input}
  //     onChange={(event, index, value) => input.onChange(value)}
  //     {...custom}
  //     style={style}
  //   >
  //     {children}
  //   </Select>*/
  // )

  render() {
    return (
      <div className="page__container">
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit} className="form">
              <h2 className="form__title">
                Edit Profile
              </h2>
              <Field
                render={this.renderField}
                name="name"
                label="Name"
              />
              <Field
                component={this.renderField}
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
                component={this.renderField}
                label="Email"
              />
                <label><Field name="sex" component={this.renderRadioButton} type="radio" value="male"/> Male</label>
                <label><Field name="sex" component={this.renderRadioButton} type="radio" value="female"/> Female</label>
                {/*<Field
                  name="job"
                  type="text"
                  component={this.renderInput}
                  label="Job"
                />*/}
                <label>Education Level</label>
                <Field
                  name="edLevel"
                  component="select"
                  label="Education Leve"
                >
                  <option value={'highSchool'}>High School</option>
                  <option value={'college'}>College</option>
                  <option value={'graduate'}>Graduate</option>
                </Field>
                <label>About Me</label>
                <Field
                  name="aboutMe"
                  component="textarea"
                />
              <ImageUpload />
              <div className="button-line">
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
                  disabled={invalid || pristine}
                >
                  Submit
                </button>
                <button disabled={pristine}>
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
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  profile,
  isEdited: profile.isEdited,
});
export default connect(mapStateToProps, { getUser, editBio })(EditBio);
