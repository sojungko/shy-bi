import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ImageUpload from './ImageUpload';
import { getUser, editBio } from '../actions';
import { getUsername } from '../modules/auth';

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
    />
  )

  renderCheckbox = ({ input, label }) => (
    <Checkbox
      label={label}
      checked={input.value ? true : false}
      onCheck={input.onChange}
    />
  )

  renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup
      {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  )

  renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
)

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <Card style={{ padding: '50px' }}>
        <CardHeader
          title="Edit Profile"
          titleStyle={{ fontFamily: 'PT Sans', fontSize: '30px' }}
          titleColor="black"
        />
        <form onSubmit={handleSubmit(this.onSubmit)} >
          <div className="field-line">
            <div>
              <Field
                name="name"
                type="text"
                component={this.renderTextField}
                label="Name"
              />
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field
                name="password"
                type="password"
                component={this.renderTextField}
                label="Password"
              />
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field
                name="email"
                type="email"
                component={this.renderTextField}
                label="Email"
              />
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field name="sex" component={this.renderRadioGroup}>
                <RadioButton value="Male" label="Male" />
                <RadioButton value="Female" label="Female" />
              </Field>
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field
                name="city"
                type="text"
                component={this.renderTextField}
                label="City"
              />
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field
                name="job"
                type="text"
                component={this.renderTextField}
                label="Job"
              />
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field
                name="edLevel"
                type="text"
                component={this.renderSelectField}
                label="Education Level"
              >
                <MenuItem value={'highSchool'} primaryText="High School" />
                <MenuItem value={'college'} primaryText="College" />
                <MenuItem value={'graduate'} primaryText="Graduate" />
              </Field>
            </div>
          </div>
          <div className="field-line">
            <div>
              <Field
                name="aboutMe"
                type="text"
                component={this.renderTextField}
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
              <RaisedButton type="submit" label="Submit" disabled={pristine || submitting} />
              <RaisedButton label="Clear Fields" disabled={pristine} onClick={reset} />
            </div>
          </div>
        </form>
      </Card>

    );
  }
}

EditBio = reduxForm({
  form: 'EditBioForm',
})(EditBio);

const mapStateToProps = ({ profile }) => ({ profile });
export default connect(mapStateToProps, { getUser, editBio })(EditBio);
