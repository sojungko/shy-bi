import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class UserList extends Component {
  renderList() {
    return this.props.users.map((user) => {
      return (
        <li
          key={user.name}
          onClick={() => this.props.selectUser()}
          className="list-group-item">
          {user.name}
        </li>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser: selectUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
