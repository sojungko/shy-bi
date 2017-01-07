import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isUserAuthenticated } from '../modules/auth';
import { getUser, likeUser } from '../actions/index';

class Profile extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
    profile: PropTypes.shape({
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

  constructor(props) {
    super(props);
    this.currentUser = localStorage.getItem('username');
    this.profilePageUser = this.props.params.username;
  }


  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else if (!this.props.params.username) {
      this.props.getUser(this.currentUser);
    } else {
      this.username = this.props.params.username;
      this.props.getUser(this.username);
    }
  }

  componentWillUpdate() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    }
  }

  componentDidUpdate(prevProps) {
  // respond to parameter change when navigating from other profiles to my profile
    const oldUser = prevProps.params.username;
    const newUser = this.props.params.username;
    if (newUser !== oldUser) {
      this.props.getUser(newUser);
    }
  }

  handleLikeButton = () => {
    this.props.likeUser(this.currentUser, this.profilePageUser);
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
    if (this.username && this.username !== this.currentUser) {
      return (
        <button onClick={this.handleLikeButton}>Like</button>
      );
    }
    return <div>Hi, {this.currentUser}!</div>;
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
