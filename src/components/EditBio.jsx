import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ImageUpload from './ImageUpload';
import { editBio } from '../actions';

class EditBio extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    editBio: PropTypes.func.isRequired,
    pristine: PropTypes.boolean,
    submitting: PropTypes.func,
    reset: PropTypes.func,
  }

  onSubmit = (inputs) => {
    this.props.editBio(inputs)
      .then(() => {
        this.context.router.push('/profile');
      });
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
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <Card className="container">
        <form onSubmit={handleSubmit(this.onSubmit)} >
          <h2>Edit Profile</h2>
          <div>
            <Field
              name="name"
              type="text"
              component={this.renderTextField}
              label="Name"
            />
          </div>
          <div>
            <Field
              name="city"
              type="text"
              component={this.renderTextField}
              label="City"
            />
          </div>
          <div>
            <Field
              name="aboutMe"
              type="text"
              component={this.renderTextField}
              label="About Me"
              multiLine={true}
              fullWidth={true}
              rows={2}
              rowsMax={4}
            />
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

export default connect(null, { editBio })(EditBio);
