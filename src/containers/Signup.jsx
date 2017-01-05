import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { signupUser } from '../actions/index';

console.log('CONTAINER/SIGN UP | Exporting SIGN UP...');

console.log('CONTAINER/SIGN UP | IMPORTING Action: signupUser from ACTIONS');

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
  }

  componentDidMount() {
    console.log('    CONTAINER/SIGN UP | Complete Rendering SIGN UP ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    CONTAINER/SIGN UP | Receiving Props: ', nextProps);
    console.log('    CONTAINER/SIGN UP | Receiving Props');
  }

  componentDidUpdate() {
    console.log('    CONTAINER/SIGN UP | Complete Rendering SIGN UP ');
    console.log(' ');
  }


  onSubmit = (inputs) => {
    console.log(`    CONTAINER/LOGIN | Submitting Sign Up Form
      User: ${inputs.username}
      Password: ${inputs.password}
      Name: ${inputs.name}
      Email: ${inputs.email}
      Age: ${inputs.age}
      Sex ${inputs.sex}
      City ${inputs.city}`);

    this.props.signupUser(inputs)
      .then(() => {
        console.log('    CONTAINER/LOGIN  | Success, Redirecting User to /profile');
        console.log(' ');
        this.context.router.push(`/profile/${inputs.username}`);
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

  renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup
      {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  )


  render() {
    console.log('    CONTAINER/SIGN UP | Rendering SIGN UP Container... ');
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <Card className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2 className="card-heading">Sign Up</h2>
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
            <Field name="city" type="text" component={this.renderTextField} label="City" />
          </div>
          <div className="button-line">
            <RaisedButton type="submit" label="Create New Account" primary />
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

// console.log('CONTAINER/SIGN UP & REDUX | Mapping actions to props: ', SignUp);
console.log('CONTAINER/SIGN UP & REDUX | Mapping actions to props: SignUp');
console.log('CONTAINER/SIGN UP | Connecting SIGN UP Container with REDUX STORE');

SignUp = reduxForm({
  form: 'SignUp',
  validate,
})(SignUp);

export default connect(null, { signupUser })(SignUp);
console.log('CONTAINER/SIGN UP | Exported SIGN UP');
console.log(' ');
