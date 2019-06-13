import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardText from '@material-ui/core/CardText';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import TextField from '@material-ui/core/TextField';
// import AutoComplete from '../components/AutoComplete';
import { signupUser, getLocations } from '../actions/index';
const { input, select, textarea } = ReactDOM;
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const font = {
  fontFamily: 'Source Sans Pro',
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

  shouldComponentUpdate = nextProps => !nextProps.location


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
      style={font}
    />
  );

  renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
      {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );


  render() {
  //   const renderAutoComplete = () => (
  //     <AutoComplete
  //       style={font}
  //       location={this.props.location || []}
  //     />
  // );

    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <Card className="container" style={{ display: 'block' }}>
        <div style={{ margin: '0 auto', padding: '81px 0', width: '300px' }}>
          {/* <CardHeader
            title="Sign Up"
            titleStyle={{ fontFamily: 'Source Sans Pro', fontSize: '30px' }}
            titleColor="black"
          /> */}
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="field-line">
              <Field name="username" type="text" component={input} label="Username" />
            </div>
            <div className="field-line">
              <Field name="password" type="password" component={input} label="Password" />
            </div>
            <div className="field-line">
              <Field name="name" type="text" component={input} label="Name" />
            </div>
            <div className="field-line">
              <Field name="email" type="email" component={input} label="Email" />
            </div>
            <div className="field-line">
              <Field name="age" type="number" component={input} label="Age" />
            </div>
            <div className="field-line">
              <div>
                <label><Field name="sex" component={input} type="radio" value="male"/> Male</label>
                <label><Field name="sex" component={input} type="radio" value="female"/> Female</label>
              </div>
            </div>
            {/* <div className="field-line">
              <Field name="city" type="text" style={font} component={this.renderTextField} label="City" />
            </div> */}
            <div className="button-line">
              <button type="submit" labelStyle={font} label="Create New Account" disabledBackgroundColor="#FCE4EC" />
            </div>
            {/* <CardText style={font}>Already have an account? <Link to={'/login'}>Log in</Link></CardText> */}
          </form>
        </div>
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

const mapStateToProps = ({ location }) => ({ location });

export default connect(mapStateToProps, { signupUser, getLocations })(SignUp);
