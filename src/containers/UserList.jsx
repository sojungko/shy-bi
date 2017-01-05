import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isUserAuthenticated } from '../modules/auth';
import { getUser,
        getAllUsers,
        FILTER_USERS_BY_SEX,
        FILTER_USERS_BY_MIN_AGE,
        FILTER_USERS_BY_MAX_AGE,
        FILTER_USERS_BY_CITY } from '../actions';
// import SearchBar from '../components/SearchBar';
import SearchBar from '../components/SearchBar_redux_form';
import UserListItem from '../components/UserListItem';

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
    visibleUsers: PropTypes.arrayOf(PropTypes.object),
    getAllUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else {
      this.props.getAllUsers();
    }
  }

  handleClick = (userName) => {
    this.props.getUser(userName)
      .then(() => {
        this.context.router.push(`/profile/${userName}`);
      });
  }

  renderList() {
    return this.props.visibleUsers.map((user, index) => (
      <UserListItem key={index} user={user} handleClick={this.handleClick} />
    ));
  }

  render() {
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

const mapStateToProps = ({ visibleUsers, users, filter, actions }) =>
  ({ visibleUsers: getVisibleUsers(users, actions, filter) });

export default connect(mapStateToProps, { getUser, getAllUsers })(UserList);
