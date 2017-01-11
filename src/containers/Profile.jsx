import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { Card, CardText } from 'material-ui/Card';

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
    open: PropTypes.bool,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }


  componentWillMount() {
    const visitedUser = this.props.params.username;
    const username = this.props.profile.username;

    console.log('CONTAINERS/PROFILE this.props.open : ', this.props.open);
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
    } else if (visitedUser === getUsername()) {
      this.context.router.push('/');
    }
  }

  handleLikeButton = () => {
    this.props.likeUser(getUsername(), this.props.params.username);
  }

  renderProfile() {
    const { name, sex, age, city, job, edLevel, aboutMe, image_url } = this.props.profile;
    return (
      <Card>
        <CardText style={{ fontFamily: 'Georgia', fontSize: '20px' }}>
          <img role="presentation" src={image_url} />
          <table style={{ width: '70%', textAlign: 'left' }}>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th>Sex</th>
                <td>{sex}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{age}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{city}</td>
              </tr>
              <tr>
                <th>Job</th>
                <td>{job}</td>
              </tr>
              <tr>
                <th>Education</th>
                <td>{edLevel}</td>
              </tr>
              <tr>
                <th>About Me</th>
                <td>{aboutMe}</td>
              </tr>
            </tbody>
          </table>
        </CardText>
      </Card>
    );
  }

  render() {
    if (this.props.params.username) {
      return (
        <div>
          {this.renderProfile()}
          <button onClick={this.handleLikeButton}>Like</button>
          <Snackbar
            open={this.props.open || false}
            message="You guys are a match!"
            autoHideDuration={4000}
          />
        </div>
      );
    }
    return (
      <div>
        <div>Hi, {this.props.profile.name}!</div>
        {this.renderProfile()}
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile, open: profile.isMatch });
export default connect(mapStateToProps, { getUser, likeUser })(Profile);
