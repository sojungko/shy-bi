import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUsername, isUserAuthenticated } from '../modules/auth';
import RecommendedUserList from '../components/RecommendedUserList';
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

  render() {
    return (
      <div>
        <RecommendedUserList recommended={this.props.recommended} handleClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  recommended: users.recommended,
});

export default connect(mapStateToProps, { getUser, getRecommendedUsers })(RecommendedUsers);
