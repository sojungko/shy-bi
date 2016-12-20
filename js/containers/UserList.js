import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../actions_test/index';
import { fetchAllUsers } from '../actions_test/index';
import UserListItem from '../containers/UserListItem';

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllUsers();
  }

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
    console.log('USERLIST THIS.PROPS.USERS:', this.props.users);
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

export default connect(mapStateToProps, { selectUser, fetchAllUsers })(UserList);
