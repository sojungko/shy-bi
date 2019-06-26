import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { isUserAuthenticated } from 'modules/auth';
import { getCurrentUser, getAllUsers } from 'actions';
import SearchBar from 'components/SearchBar';
import UserListItem from 'components/UserListItem';

class UserList extends Component {
  static propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
  }

  componentDidMount() {
    if (!isUserAuthenticated()) {
      Router.push('/');
    } else {
      this.props.getAllUsers();
    }
  }

  handleClick = (userName) => {
    this.props.getCurrentUser(userName)
      .then(() => {
        Router.push(`/profile/${userName}`);
      });
  }

  render() {
    return (
      <div>
        <div>
          {/* <CardHeader
            title="Explore"
            titleStyle={styles.title}
            subtitle="Take a look at our beautiful users. Like them to connect."
            subtitleStyle={styles.subtitle}
          /> */}
        </div>
        <SearchBar />
        <UserListItem users={this.props.users} handleClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users: users.users,
});

export default connect(mapStateToProps, { getCurrentUser, getAllUsers })(UserList);
