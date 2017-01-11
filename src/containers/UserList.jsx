import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isUserAuthenticated } from '../modules/auth';
import { getUser, getAllUsers } from '../actions';
import SearchBar from '../containers/SearchBar';
import UserListItem from '../components/UserListItem';

class UserList extends Component {
  static propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
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

  render() {
    return (
      <div>
        <SearchBar />
        <UserListItem users={this.props.users} handleClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users: users.users,
});

export default connect(mapStateToProps, { getUser, getAllUsers })(UserList);
