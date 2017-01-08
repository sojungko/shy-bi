import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isUserAuthenticated, getUsername } from '../modules/auth';
import { getUser, likeUser } from '../actions/index';

class Profile extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
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
    }),
    likeUser: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }


  componentWillMount() {
    const visitedUser = this.props.params.username;
    const username = this.props.profile.username;

    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else if (!visitedUser) {
      this.props.getUser(getUsername());
    } else if (visitedUser !== username) {
      this.props.getUser(visitedUser);
    }
  }

  componentWillReceiveProps(nextProps) {
    const visitedUser = this.props.params.username;
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else if (!visitedUser && getUsername() !== nextProps.profile.username) {
      this.props.getUser(getUsername());
    }
  }

  handleLikeButton = () => {
    this.props.likeUser(getUsername(), this.visitedUser);
  }

  renderProfile() {
    const { name, sex, age, city, job, edLevel, aboutMe, image_url } = this.props.profile;
    return (
      <ul>
        <li>Name: {name}</li>
        <li>Sex: {sex}</li>
        <li>Age: {age}</li>
        <li>City: {city}</li>
        <li>Job: {job}</li>
        <li>Education Level: {edLevel}</li>
        <li>About Me: {aboutMe}</li>
        <img role="presentation" src={image_url} />
      </ul>
    );
  }

  renderLikeButton() {
    if (this.props.params.username) {
      return (
        <button onClick={this.handleLikeButton}>Like</button>
      );
    }
    return <div>Hi, {this.props.profile.name}!</div>;
  }

  render() {
    return (
      <div>
        {this.renderProfile()}
        {this.renderLikeButton()}
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile });
export default connect(mapStateToProps, { getUser, likeUser })(Profile);
