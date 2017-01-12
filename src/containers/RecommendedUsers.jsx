import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
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
      <Card>
        <CardHeader
          title="Recommended For You"
          titleStyle={{ fontFamily: 'PT Sans', fontSize: '30px' }}
          subtitle="Based on our special algorithm"
          subtitleStyle={{ fontFamily: 'PT Sans' }}
        />
        <RecommendedUserList recommended={this.props.recommended} handleClick={this.handleClick} />
      </Card>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  recommended: users.recommended,
});

export default connect(mapStateToProps, { getUser, getRecommendedUsers })(RecommendedUsers);
