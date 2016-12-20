import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minAge: '',
      maxAge: '',
      sex: '',
      city: ''
    }

  }
  render() {
    return (
      <div>
        Search!
        <form className="input-group">
          Minimum Age : <input />
          Maximum Age : <input />
          Sex: <input />
          City: <input />
        </form>
      </div>
    );
  }
}
