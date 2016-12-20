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
          Minimum Age : <input value={this.state.minAge} onChange={event => this.setState({ minAge: event.target.value })}/>
          Maximum Age : <input value={this.state.maxAge} onChange={event => this.setState({ maxAge: event.target.value })}/>
          Sex: <input />
          City: <input value={this.state.city} onChange={event => this.setState({ city: event.target.value })} />
        </form>
      </div>
    );
  }
}
