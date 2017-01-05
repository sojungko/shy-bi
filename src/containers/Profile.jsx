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
    }),
    likeUser: PropTypes.func.isRequired,
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
      const username = this.props.params.username;
      this.props.getUser(username);
    }
  }

  componentWillUpdate() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    }
  }

  handleLikeButton = () => {
    this.props.likeUser(this.currentUser, this.profilePageUser);
  }

  renderProfile() {
    const { name, sex, age, city } = this.props.profile;
    return (
      <ul>
        <li>Name: {name}</li>
        <li>Sex: {sex}</li>
        <li>Age: {age}</li>
        <li>City: {city}</li>
      </ul>
    );
  }

  renderLikeButton() {
    if (this.profilePageUser) {
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
