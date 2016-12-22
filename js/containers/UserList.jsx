import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/index';
// import { bindActionCreators } from 'redux';
import UserListItem from '../containers/UserListItem.jsx';

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    this.props.getAllUsers();
  }

  renderList() {
    console.log('UserList.jsx this.props.users : ', this.props.users)
    return this.props.users.map((user, index) => {
      return (
        <li key={index} user={user}>{user.name}</li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, { getAllUsers })(UserList);
