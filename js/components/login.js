import React, { Component } from 'react';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div>
        <h1> Login </h1>
        <form className="input-group">
          Username: <input />
          Password: <input />
        </form>
      </div>
    );
  }
}
