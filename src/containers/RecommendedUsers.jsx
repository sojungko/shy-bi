import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUsername, isUserAuthenticated } from '../modules/auth';
import UserListItem from '../components/UserListItem';
import { getRecommendedUsers, getUser } from '../actions';

class RecommendedUsers extends Component {
  static propTypes = {
    recommended: PropTypes.arrayOf(PropTypes.object.isRequired),
    getRecommendedUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else {
      this.props.getRecommendedUsers(getUsername());
    }
  }

  handleClick = (userName) => {
    this.props.getUser(userName)
      .then(() => this.context.router.push(`/profile/${userName}`));
  }

  renderRecommendedUsersList() {
    return this.props.recommended.map((user, index) => (
      <UserListItem key={index} user={user} handleClick={this.handleClick} />
    ));
  }

  render() {
    console.log('RENDERING Recommended users.....');
    return (
      <div>
        <ul>
          {this.renderRecommendedUsersList()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  recommended: users.recommended,
});

export default connect(mapStateToProps, { getUser, getRecommendedUsers })(RecommendedUsers);
