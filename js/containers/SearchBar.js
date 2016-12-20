import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllUsers } from '../actions_test/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minAge: '',
      maxAge: '',
      sex: '',
      city: ''
    }

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ city: event.target.value });
  }

  onFormSubmit(event)  {
    event.preventDefault();
    this.props.fetchAllUsers();
    this.setState({ city: '' });
  }

  render() {
    return (
      <div>
        Search!
        <form onSubmit={this.onFormSubmit} className="input-group">
          City: <input value={this.state.city} onChange={this.onInputChange} />
        <span>
          <button type="submit">Submit</button>
        </span>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { fetchAllUsers }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
