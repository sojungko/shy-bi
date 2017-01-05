import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isUserAuthenticated } from '../modules/auth';
import UserListItem from '../components/UserListItem';
import { getRecommendedUsers, getUser } from '../actions';

class RecommendedUsers extends Component {
  static propTypes = {
    visibleUsers: PropTypes.arrayOf(PropTypes.object),
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
      this.props.getRecommendedUsers();
    }
  }

  handleClick = (userName) => {
    this.props.getUser(userName)
      .then(() => this.context.router.push(`/profile/${userName}`));
  }

  renderList() {
    return this.props.visibleUsers.map((user, index) => (
      <UserListItem key={index} user={user} handleClick={this.handleClick} />
    ));
  }

  render() {
    console.log('RENDERING Recommended users.....');
    return (
      <div>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ visibleUsers, actions }) {
  return { visibleUsers: getRecommendedUsers(actions) };
}

export default connect(mapStateToProps, { getUser, getRecommendedUsers, RecommendedUsers })(RecommendedUsers);
