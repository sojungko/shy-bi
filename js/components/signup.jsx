import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { signupUser } from '../actions/index';

class SignUp extends Component {

  onInputChange(event) {
    console.log(event.target.value);
  }

  render() {
    const { fields: { username, password, email, name, age, sex, city }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className="input-group">
        <h3>Sign up!</h3>
        <div>
          <label>Username</label>
          <input type="text" {...username} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...password} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...email} />
        </div>
        <div>
          <label>Name</label>
          <input type="text" {...name} />
        </div>
        <div>
          <label>Age</label>
          <input type="number" {...age} />
        </div>
        <div>
          <label>Sex</label>
          <input type="text" {...sex} />
        </div>
        <div>
          <label>City</label>
          <input type="text" {...city} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  signup: 'SignupForm',
  fields: ['username', 'password', 'email', 'name', 'age', 'sex', 'city']
}, null, { signupUser })(SignUp);
