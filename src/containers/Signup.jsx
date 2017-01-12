import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import AutoComplete from '../components/AutoComplete';
import { signupUser, getLocations } from '../actions/index';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class SignUp extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    signupUser: PropTypes.func,
    getLocations: PropTypes.func,
    location: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }

  shouldComponentUpdate = (nextProps) => {
    return !nextProps.location;
  }


  onSubmit = (inputs) => {
    this.props.signupUser(inputs)
      .then(() => {
        this.context.router.push('/');
      });
  }

  handleUpdateInput = (inputs) => {
    this.props.getLocations(inputs);
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup
      {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );


  render() {
    const renderAutoComplete = () => (
      <AutoComplete
        location={this.props.location || []}
        handleUpdateInput={this.handleUpdateInput}
      />
  );

    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <Card className="container" style={{ textAlign: 'center', display: 'block' }}>
        <CardHeader
          title="Sign Up"
          titleStyle={{ fontFamily: 'PT Sans', fontSize: '30px' }}
          titleColor="black"
        />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="field-line">
            <Field name="username" type="text" component={this.renderTextField} label="Username" />
          </div>
          <div className="field-line">
            <Field name="password" type="password" component={this.renderTextField} label="Password" />
          </div>
          <div className="field-line">
            <Field name="name" type="text" component={this.renderTextField} label="Name" />
          </div>
          <div className="field-line">
            <Field name="email" type="email" component={this.renderTextField} label="Email" />
          </div>
          <div className="field-line">
            <Field name="age" type="number" component={this.renderTextField} label="Age" />
          </div>
          <div className="field-line">
            <div>
              <Field name="sex" component={this.renderRadioGroup}>
                <RadioButton value="male" label="male" style={styles.RadioButton} />
                <RadioButton value="female" label="female" style={styles.RadioButton} />
              </Field>
            </div>
          </div>
          <div className="field-line">
            <Field name="city" type="text" component={renderAutoComplete} label="City" />
          </div>
          <div className="button-line">
            <RaisedButton type="submit" label="Create New Account" disabledBackgroundColor="#FCE4EC" />
          </div>

          <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
        </form>
      </Card>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password', 'name', 'email', 'age', 'sex', 'city'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

SignUp = reduxForm({
  form: 'SignUp',
  validate,
})(SignUp);

const mapStateToProps = ({ location }) => ({ location })

export default connect(mapStateToProps, { signupUser, getLocations })(SignUp);
