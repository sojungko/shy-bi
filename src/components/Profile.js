import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import ActionFavorite from '@material-ui/icons/Favorite';
import ActionFavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { isUserAuthenticated, getUsername } from 'modules/auth';
import { getCurrentUser, likeUser } from 'actions';

import ProfileItem from 'components/ProfileItem';

class Profile extends Component {
  static propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
    profile: PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
      age: PropTypes.string,
      sex: PropTypes.string,
      city: PropTypes.string,
      job: PropTypes.string,
      edLevel: PropTypes.string,
      aboutMe: PropTypes.string,
      image_url: PropTypes.string,
      online: PropTypes.bool,
      isMatch: PropTypes.bool,
    }),
    likeUser: PropTypes.func,
    open: PropTypes.bool,
  }

  // componentDidMount() {
  //   const visitedUser = this.props.params.username;
  //   const username = this.props.profile.username;

  //   console.log('CONTAINERS/PROFILE this.props.open : ', this.props.open);
  //   if (!isUserAuthenticated()) {
  //     Router.push('/home');
  //   } else if (!visitedUser) {
  //     this.props.getCurrentUser(getUsername());
  //   } else if (visitedUser !== username) {
  //     this.props.getCurrentUser(visitedUser);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   const visitedUser = this.props.params.username;
  //   if (!isUserAuthenticated()) {
  //     Router.push('/home');
  //   } else if (!visitedUser && getUsername() !== nextProps.profile.username) {
  //     this.props.getCurrentUser(getUsername());
  //   } else if (visitedUser === getUsername()) {
  //     Router.push('/');
  //   }
  // }

  handleLikeButton = () => {
    // this.props.likeUser(getUsername(), this.props.params.username);
  }

  renderOnlineMessage = (online, isMatch, name, sex) => {
    if (online && isMatch) {
      return (
        <p>
          {name} is online. Message {sex === 'Female' ? 'her' : 'him'} now! {' '}
          <a href="/#/messages/send"><i className="fa fa-arrow-right" aria-hidden="true" /></a>
        </p>
      );
    }
  }

  render() {
    const { visitedUser, currentUser } = this.props;
    var {
      image_url,
      name,
      online,
    } = visitedUser || currentUser;

    return (
      <div className="page__container">
        <div className="profile">
          <div className="profile--row">
            <img role="presentation" src={image_url} />
          </div>
          <div className="profile--row">
            {visitedUser ? this.renderOnlineMessage(online, isMatch, name) : 'You are online'}
          </div>
          <ProfileItem data="name" label="Name" />
          <ProfileItem data="sex" label="Sex"/>
          <ProfileItem data="birthday" label="Age" />
          <ProfileItem data="edLevel" label="Education" />
          <ProfileItem data="aboutMe" label="About Me"/>
          { visitedUser && 
          <Fragment>
            <Checkbox
              onClick={this.handleLikeButton}
              checkedIcon={<ActionFavorite />}
              uncheckedIcon={<ActionFavoriteBorder />}
              label="Like"
            />
            <Snackbar
            open={this.props.open || false}
            message="You guys are a match!"
            autoHideDuration={4000}
          />
          </Fragment>
          }
        </div>
      </div>

    );
  }
}


const mapStateToProps = ({ profile }) => ({
  profile,
  open: profile.isMatch,
});
export default connect(mapStateToProps, { getCurrentUser, likeUser })(Profile);
