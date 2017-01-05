import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isUserAuthenticated } from '../modules/auth';
import { getUser,
        getAllUsers,
        FILTER_USERS_BY_SEX,
        FILTER_USERS_BY_MIN_AGE,
        FILTER_USERS_BY_MAX_AGE,
        FILTER_USERS_BY_CITY } from '../actions';
import SearchBar from '../components/SearchBar';
import UserListItem from '../components/UserListItem';

console.log('CONTAINER/USERLIST | Exporting USERLIST...');
console.log('CONTAINER/USERLIST | IMPORTING Action: getAllUsers from ACTIONS');


const getVisibleUsers = (users = [], actions, filter) => {
  switch (actions) {
    case FILTER_USERS_BY_SEX:
      console.log('REDUCER/VISIBLEUSERS FILTER_USERS_BY_SEX : ', users.filter(user => user.sex === filter));
      return users.filter(user => user.sex === filter);
    case FILTER_USERS_BY_MIN_AGE:
      return users.filter(user => user.age >= filter);
    case FILTER_USERS_BY_MAX_AGE:
      return users.filter(user => user.age <= filter);
    case FILTER_USERS_BY_CITY:
      return users.filter(user => user.city === filter);
    default:
      return users;
  }
};

class UserList extends Component {
  static propTypes = {
    // users: PropTypes.arrayOf(PropTypes.object.isRequired),
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
    // console.log('    CONTAINER/USERLIST | Receiving Props: ', this.props.users, nextProps.users);
    console.log('    CONTAINER/USERLIST | Receiving Props');
  }

  componentWillUpdate() {
    // console.log('   CONTAINER/USERLIST | componentWillUpdate this.props.users : ', this.props.users);
  }

  componentDidUpdate() {
    // console.log('    CONTAINER/USERLIST | Complete Rendering USERLIST this.props.users : ', this.props.users);
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
    console.log(' CONTAINER/USERLIST | mapStateToProps being called : ', this.props);
    console.log('    CONTAINER/USERLIST | Mapping through User Data. Creating List...');
    console.log('   CONTAINER/USERLIST | this.props.users : ', this.props.visibleUsers);
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
function mapStateToProps({ visibleUsers, users, filter, actions }) {
  console.log('    CONTAINER/USERLIST & REDUX | Mapping State to props: ', visibleUsers);
  return { visibleUsers: getVisibleUsers(users, actions, filter) };
}

// console.log('CONTAINER/USERLIST & REDUX | Mapping actions to props: ', getAllUsers);
console.log('CONTAINER/USERLIST & REDUX | Mapping actions to props: getUser, getAllUsers');
console.log('CONTAINER/USERLIST | Connecting USERLIST Container with REDUX STORE');
export default connect(mapStateToProps, { getUser, getAllUsers })(UserList);

console.log('CONTAINER/USERLIST | Exported USERLIST');
console.log(' ');
