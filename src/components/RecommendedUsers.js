import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
import { getUsername, isUserAuthenticated } from 'modules/auth';
// import RecommendedUserList from 'components/RecommendedUserList';
import { getRecommendedUsers, getCurrentUser } from 'actions';

class RecommendedUsers extends Component {
  static propTypes = {
    recommended: PropTypes.arrayOf(PropTypes.object.isRequired),
    getRecommendedUsers: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!isUserAuthenticated()) {
      Router.push('/home');
    } else {
      this.props.getRecommendedUsers(getUsername());
    }
  }

  handleClick = (userName) => {
    this.props.getCurrentUser(userName)
      .then(() => Router.push(`/profile/${userName}`));
  }

  render() {
    return (
      <div>
        {/* <CardHeader
          title="Recommended for You"
          titleStyle={styles.title}
          subtitle="Based on our special algorithm"
          subtitleStyle={styles.subtitle}
        /> */}
        {/* <RecommendedUserList recommended={this.props.recommended} handleClick={this.handleClick} /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  recommended: users.recommended,
});

export default connect(mapStateToProps, { getCurrentUser, getRecommendedUsers })(RecommendedUsers);
