import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserList extends Component {
  renderList() {
    return this.props.users.map((user) => {
      return (
        <li key={user.name} className="list-group-item">{user.name}</li>
      );
    });
  }
  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(UserList);
