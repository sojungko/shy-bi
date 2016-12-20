import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../actions/index';
import { bindActionCreators } from 'redux';
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser: selectUser }, dispatch);
}

export default connect(mapStateToProps, { selectUser, fetchAllUsers })(UserList);
