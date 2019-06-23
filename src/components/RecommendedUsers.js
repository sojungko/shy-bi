import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
import { getUsername, isUserAuthenticated } from 'modules/auth';
import RecommendedUserList from '../components/RecommendedUserList';
import { getRecommendedUsers, getUser } from 'actions';

class RecommendedUsers extends Component {
  static propTypes = {
    recommended: PropTypes.arrayOf(PropTypes.object.isRequired),
    getRecommendedUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    if (!isUserAuthenticated()) {
      Router.push('/home');
    } else {
      this.props.getRecommendedUsers(getUsername());
    }
  }

  handleClick = (userName) => {
    this.props.getUser(userName)
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
        <RecommendedUserList recommended={this.props.recommended} handleClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  recommended: users.recommended,
});

export default connect(mapStateToProps, { getUser, getRecommendedUsers })(RecommendedUsers);
