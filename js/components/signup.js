import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
    return (
      <form className="input-group">
        Username: <input />
        Password: <input />
        Email: <input />
        Name: <input />
        Age: <input />
        City: <input />
      </form>
    );
  }
}
