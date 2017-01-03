import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { isUserAuthenticated } from '../modules/auth';
import { getAllUsers } from '../actions/index';
import SearchBar from '../components/SearchBar';
import UserListItem from '../components/UserListItem';

console.log('CONTAINER/USERLIST | Exporting USERLIST...');
console.log('CONTAINER/USERLIST | IMPORTING Action: getAllUsers from ACTIONS');

class UserList extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.number.boolean,
    }),
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
    getAllUsers: PropTypes.func.isRequired,
  }

  componentWillMount() {
    console.log('    CONTAINER/USERLIST | Preparing to render USERLIST container');
    console.log('      CONTAINER/USERLIST | Checking if User is Authenticated');

    if (!isUserAuthenticated()) {
      console.log('      CONTAINER/USERLIST | User is not authenticated. Redirecting to LogIn');
      hashHistory.push('/login');
    } else {
      console.log('      CONTAINER/USERLIST | User is authenticated. Populating page with user data');
      this.props.getAllUsers();
    }
  }

  componentDidMount() {
    console.log('    CONTAINER/USERLIST | Complete Rendering USERLIST ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    CONTAINER/USERLIST | Receiving Props: ', nextProps);
    console.log('    CONTAINER/USERLIST | Receiving Props');
  }

  componentDidUpdate() {
    console.log('    CONTAINER/USERLIST | Complete Rendering USERLIST ');
  }

  handleClick(event) {
    console.log('      COMPONENT/USER |  Clicked', this.props.user);
  }

  renderList() {
    console.log('    CONTAINER/USERLIST | Mapping through User Data. Creating List...');
    return this.props.users.map((user, index) => (
      <UserListItem key={index} user={user} handleClick={this.handleClick} />
    ));
  }

  render() {
    console.log('    CONTAINER/USERLIST | Rendering USERLIST...');
    return (
      <div>
        <SearchBar />
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth, users }) {
  // console.log('    CONTAINER/USERLIST & REDUX | Mapping State to props: ', auth, users);
  console.log('    CONTAINER/USERLIST & REDUX | Mapping State to props: auth, users');
  return { auth, users };
}

// console.log('CONTAINER/USERLIST & REDUX | Mapping actions to props: ', getAllUsers);
console.log('CONTAINER/USERLIST & REDUX | Mapping actions to props: getAllUsers');
console.log('CONTAINER/USERLIST | Connecting USERLIST Container with REDUX STORE');
export default connect(mapStateToProps, { getAllUsers })(UserList);

console.log('CONTAINER/USERLIST | Exported USERLIST');
console.log(' ');
