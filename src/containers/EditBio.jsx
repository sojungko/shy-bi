import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import TextField from '@material-ui/core/TextField';
// import Checkbox from '@material-ui/core/Checkbox';
// import Select from '@material-ui/core/Select';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
// import Snackbar from '@material-ui/core/Snackbar';
import ImageUpload from './ImageUpload';
import { getUser, editBio } from '../actions';
import { getUsername } from '../modules/auth';

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

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
      hintStyle={style}
      style={style}
    />
  )

  renderCheckbox = ({ input, label }) => (
    <Checkbox
      label={label}
      checked={!!input.value}
      onCheck={input.onChange}
    />
  )

  renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
      {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  )

  renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <Select
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      {...custom}
      style={style}
    >
      {children}
    </Select>
)

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div style={{ padding: '50px' }}>
        {/* <CardHeader
          title="Edit Profile"
          titleStyle={{ fontFamily: 'Source Sans Pro', fontSize: '30px' }}
          titleColor="black"
        /> */}
        <form style={style} onSubmit={handleSubmit(this.onSubmit)} >
          <div className="field-line">
            <div>
              <Field
                name="name"
                type="text"
                component={input}
                label="Name"
              />
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field
                name="password"
                type="password"
                component={input}
                label="Password"
              />
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field
                name="email"
                type="email"
                component={input}
                label="Email"
              />
            </div>
          </div>
          <div className="field-line">
            <div style={style}>
              <label><Field name="sex" component={input} type="radio" value="male"/> Male</label>
              <label><Field name="sex" component={input} type="radio" value="female"/> Female</label>
            </div>
          </div>
          {/* <div className="field-line">
            <div>
              <Field
                name="city"
                type="text"
                component={this.renderTextField}
                label="City"
              />
            </div>
          </div> */}
          <div className="field-line">
            <div>
              <Field
                name="job"
                type="text"
                component={input}
                label="Job"
              />
            </div>
          </div>
          <div className="field-line">
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
          </div>
          <div className="field-line">
            <div>
              <Field
                name="aboutMe"
                type="text"
                component={textarea}
                label="About Me"
                multiLine
                fullWidth
                rows={2}
                rowsMax={4}
              />
            </div>
          </div>
          <ImageUpload />
          <div>
            <div className="button-line">
              <button labelStyle={style} type="submit" label="Submit" disabled={pristine || submitting} />
              <button labelStyle={style} label="Clear Fields" disabled={pristine} onClick={reset} />
            </div>
          </div>
        </form>
        <div
          open={this.props.isEdited || false}
          message="Profile successfully updated!"
          autoHideDuration={4000}
        />
      </div>

    );
  }
}

EditBio = reduxForm({
  form: 'EditBioForm',
})(EditBio);

const mapStateToProps = ({ profile }) => ({ profile, isEdited: profile.isEdited });
export default connect(mapStateToProps, { getUser, editBio })(EditBio);
