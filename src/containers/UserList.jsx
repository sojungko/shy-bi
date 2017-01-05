import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isUserAuthenticated } from '../modules/auth';
import { getUser, getAllUsers } from '../actions/index';
import SearchBar from '../components/SearchBar';
import UserListItem from '../components/UserListItem';

console.log('CONTAINER/USERLIST | Exporting USERLIST...');
console.log('CONTAINER/USERLIST | IMPORTING Action: getAllUsers from ACTIONS');

class UserList extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
    visibleUsers: PropTypes.arrayOf(PropTypes.object),
    getAllUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    console.log('    CONTAINER/USERLIST | Preparing to render USERLIST container');
    console.log('      CONTAINER/USERLIST | Checking if User is Authenticated');

    if (!isUserAuthenticated()) {
      console.log('      CONTAINER/USERLIST | User is not authenticated. Redirecting to LogIn');
      this.context.router.push('/login');
    } else {
      console.log('      CONTAINER/USERLIST | User is authenticated. Populating page with user data');
      this.props.getAllUsers();
    }
  }

  componentDidMount() {
    console.log('    CONTAINER/USERLIST | Complete Rendering USERLIST ');
  }

  componentWillReceiveProps(nextProps) {
    console.log('    CONTAINER/USERLIST | Receiving Props: ', this.props.users, nextProps.users);
    console.log('    CONTAINER/USERLIST | Receiving Props');
  }

  componentWillUpdate() {
    console.log('   CONTAINER/USERLIST | componentWillUpdate this.props.users : ', this.props.users);
  }

  componentDidUpdate() {
    console.log('    CONTAINER/USERLIST | Complete Rendering USERLIST this.props.users : ', this.props.users);
  }


  handleClick = (userName) => {
    console.log('      COMPONENT/USER | Clicked', userName);
    this.props.getUser(userName)
      .then(() => {
        console.log('      COMPONENT/USER | Fetched User rerouting...', userName);
        this.context.router.push(`/profile/${userName}`);
      });
  }

  renderList() {
    console.log('    CONTAINER/USERLIST | Mapping through User Data. Creating List...');
    console.log('   CONTAINER/USERLIST | this.props.users : ', this.props.users);
    return this.props.visibleUsers.map((user, index) => (
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
function mapStateToProps({ visibleUsers }) {
  // console.log('    CONTAINER/USERLIST & REDUX | Mapping State to props: ', auth, users);
  console.log('    CONTAINER/USERLIST & REDUX | Mapping State to props: users, this.props : ', this.props);
  return { visibleUsers };
}

// console.log('CONTAINER/USERLIST & REDUX | Mapping actions to props: ', getAllUsers);
console.log('CONTAINER/USERLIST & REDUX | Mapping actions to props: getUser, getAllUsers');
console.log('CONTAINER/USERLIST | Connecting USERLIST Container with REDUX STORE');
export default connect(mapStateToProps, { getUser, getAllUsers })(UserList);

console.log('CONTAINER/USERLIST | Exported USERLIST');
console.log(' ');
