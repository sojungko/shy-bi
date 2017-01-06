import React, { Component, PropTypes } from 'react';
import connect from 'react-redux';
import UserListItem from '../components/UserListItem';
import { getUser, getLikedUsers } from '../actions';

import { isUserAuthenticated, getUsername } from '../modules/auth';

class Likes extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    getUser: PropTypes.func.isRequired,
    getLikedUsers: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else {
      this.props.getLikedUsers(getUsername());
    }
  }

  handleClick = userName => this.props.getUser(userName)
    .then(() => this.context.router.push(`/profile/${userName}`))

  renderList() {
    return this.props.users.map((user, idx) => (
      <UserListItem key={idx} user={user} handleClick={this.handleClick} />
    ));
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps, { getUser, getLikedUsers })(Likes);
