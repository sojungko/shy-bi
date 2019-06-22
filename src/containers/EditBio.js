import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import ImageUpload from './ImageUpload';
import { getUser, editBio } from 'actions';
import { getUsername } from 'modules/auth';

const { input, select, textarea } = ReactDOM;
const style = {
  fontFamily: 'Source Sans Pro',
};

class EditBio extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

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

  renderInput = ({ input, label, ...rest }) => (
    <Fragment>
      <label>{label}</label>
      <input {...input} {...rest} />
    </Fragment>
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

//   renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
//     /*<Select
//       floatingLabelText={label}
//       errorText={touched && error}
//       {...input}
//       onChange={(event, index, value) => input.onChange(value)}
//       {...custom}
//       style={style}
//     >
//       {children}
//     </Select>*/
// )

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit(this.onSubmit)} >
            <div className="card-text">
              <div>
                {/*<Field
                  name="name"
                  type="text"
                  component={this.renderInput}
                  label="Name"
                />*/}
              </div>
            </div>
            <div className="card-text">
              <div>
                {/*<Field
                  name="password"
                  type="password"
                  component={this.renderInput}
                  label="Password"
                />*/}
              </div>
            </div>
            <div className="card-text">
              <div>
                {/*<Field
                  name="email"
                  type="email"
                  component={this.renderInput}
                  label="Email"
                />*/}
              </div>
            </div>
            <div className="card-text">
              <div style={style}>
                {/*<label><Field name="sex" component={this.renderRadioButton} type="radio" value="male"/> Male</label>*/}
                {/*<label><Field name="sex" component={this.renderRadioButton} type="radio" value="female"/> Female</label>*/}
              </div>
            </div>
            <div className="card-text">
              <div>
                {/*<Field
                  name="job"
                  type="text"
                  component={this.renderInput}
                  label="Job"
                />*/}
              </div>
            </div>
            {/*<div className="card-text">
              <div>
                <Field
                  name="edLevel"
                  type="text"
                  component={select}
                  label="Education Level"
                >
                  <option style={style} value={'highSchool'} primaryText="High School" />
                  <option style={style} value={'college'} primaryText="College" />
                  <option style={style} value={'graduate'} primaryText="Graduate" />
                </Field>
              </div>
            </div>*/}
            <div className="card-text">
              <div>
                {/*<Field
                  name="aboutMe"
                  type="text"
                  component={this.renderInput}
                  label="About Me"
                  multiLine
                  fullWidth
                  rows={2}
                  rowsMax={4}
                />*/}
              </div>
            </div>
            <ImageUpload />
            <div>
              <div className="button-line">
                <button type="submit">
                  Submit
                </button>
                <button disabled={pristine} onClick={reset}>
                  Clear Fields
                </button>
              </div>
            </div>
          </form>
        <div
          open={this.props.isEdited || false}
          message="Profile successfully updated!"
          autoHideDuration={4000}
        />
        </div>
      </div>

    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile, isEdited: profile.isEdited });
export default connect(mapStateToProps, { getUser, editBio })(EditBio);
