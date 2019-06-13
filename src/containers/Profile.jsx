import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import { isUserAuthenticated, getUsername } from '../modules/auth';
import { getUser, likeUser } from '../actions/index';
import styles from '../styles/Profile';
import cardStyle from '../styles/CardHeader';

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
      online: PropTypes.bool,
      isMatch: PropTypes.bool,
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
      this.context.router.push('/home');
    } else if (!visitedUser) {
      this.props.getUser(getUsername());
    } else if (visitedUser !== username) {
      this.props.getUser(visitedUser);
    }
  }

  componentWillReceiveProps(nextProps) {
    const visitedUser = this.props.params.username;
    if (!isUserAuthenticated()) {
      this.context.router.push('/home');
    } else if (!visitedUser && getUsername() !== nextProps.profile.username) {
      this.props.getUser(getUsername());
    } else if (visitedUser === getUsername()) {
      this.context.router.push('/');
    }
  }

  handleLikeButton = () => {
    this.props.likeUser(getUsername(), this.props.params.username);
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

  renderProfile() {
    const { name, sex, age, city, job, edLevel, aboutMe, image_url, online, isMatch } = this.props.profile;
    return (
      <Card style={styles.card}>
        <CardText style={styles.cardText}>
          <img role="presentation" src={image_url} style={styles.image} />
          <div>
            {this.props.params.username ? this.renderOnlineMessage(online, isMatch, name, sex) : 'You are online.'}
          </div>
          <br />
          <table style={styles.table}>
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
        <Card>
          <CardHeader
            title={`${this.props.profile.name}`}
            titleStyle={cardStyle.title}
            subtitle={`Get to know ${this.props.profile.name}!`}
            subtitleStyle={cardStyle.subtitle}
          />
          <div>
            {this.renderProfile()}
            <Checkbox
              onClick={this.handleLikeButton}
              checkedIcon={<ActionFavorite />}
              uncheckedIcon={<ActionFavoriteBorder />}
              label="Like"
              style={styles.checkbox}
            />
          </div>
          <Snackbar
            open={this.props.open || false}
            message="You guys are a match!"
            autoHideDuration={4000}
          />
        </Card>
      );
    }
    return (
      <Card>
        <CardHeader
          title={`Hi, ${this.props.profile.name}`}
          titleStyle={cardStyle.title}
          subtitle="Good to have you back!"
          subtitleStyle={cardStyle.subtitle}
        />
        <div>
          {this.renderProfile()}
        </div>
      </Card>
    );
  }
}


const mapStateToProps = ({ profile }) => ({ profile, open: profile.isMatch });
export default connect(mapStateToProps, { getUser, likeUser })(Profile);
