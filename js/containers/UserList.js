import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../actions_test/index';
import { bindActionCreators } from 'redux';
import UserListItem from '../containers/UserListItem';

class UserList extends Component {
  renderList() {
    return this.props.users.map((user, index) => {
      return(
        <li
          key={index}
          onClick={() => this.props.selectUser(user)}>{user.user.name}</li>
      )
    });
  }

  render() {
    console.log('USERLIST THIS.PROPS:', this.props)
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps({ users }) {
  return { users };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser: selectUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
