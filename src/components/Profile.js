import React, { Component, Fragment } from 'react';
import { func, oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import { unlikeUser, likeUser } from 'actions';
import { userPropType } from 'constants/prop-types';
import {
  required,
  noSpecialChars,
  mustContainLetter,
  mustBeLength,
  composeValidators,
  validateDate,
} from 'modules/validators';

import {
  formatDateForInput,
} from 'modules/formatters';

import { genders, edLevels } from 'constants/form';

import ProfileItem from 'components/ProfileItem';
import ImageUpload from 'components/ImageUpload';
import {
  renderField,
  renderSelect,
  renderTextArea,
} from 'components/Form';

class Profile extends Component {
  static propTypes = {
    likeUser: func,
    unlikeUser: func,
    currentUser: userPropType,
    visitedUser: oneOfType([ userPropType, null ])
  }

  constructor(props) {
    super(props);

    this.state = {
      imageEditing: false,
    }
  }
  
  unlike = () => {
    const { currentUser, visitedUser } = this.props;
    const { username: currentUsername } = currentUser;
    const { username: visitedUsername } = visitedUser;
    this.props.unlikeUser(currentUsername, visitedUsername);
  }
  
  like = () => {  
    const { currentUser, visitedUser } = this.props;
    const { username: currentUsername } = currentUser;
    const { username: visitedUsername } = visitedUser;
    this.props.likeUser(currentUsername, visitedUsername);
  }

  toggleImageEdit = () => {
    this.setState({ imageEditing: !this.state.imageEditing });
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
    const { imageEditing } = this.state;
    const { visitedUser, currentUser } = this.props;
    var {
      image_url,
      username,
      online,
    } = visitedUser || currentUser;

    if (!currentUser) { return null };

    const { liked } = currentUser;

    return (
      <div className="page__container">
        <div className="profile">
          <div className="profile--row profile--row__image">
            { visitedUser && <img role="presentation" src={image_url} />}
            { !visitedUser && currentUser && !imageEditing && (
              <Fragment>
                {image_url ? <img role="presentation" src={image_url} /> : <i className="material-icons md-48 md-dark">face</i>}
                <i
                  onClick={this.toggleImageEdit}
                  className="material-icons md-18 md-dark md-inactive md-clickable profile--row__image-edit"
                >
                  create
                </i>
              </Fragment>
            )}
            { !visitedUser && currentUser && imageEditing && <ImageUpload toggleImageEdit={this.toggleImageEdit}/>}
          </div>
          <div className="profile--row">
            You are online
          </div>
          { visitedUser && 
          <div className="profile--row">
            {!liked.has(visitedUser.username) ? (
              <i className="material-icons md-18 md-clickable" onClick={this.like}>favorite_border</i>
              )
              : (
                <i className="material-icons md-18 md-clickable" onClick={this.unlike}>favorite</i>
            )}
            <Snackbar
              open={this.props.isMatch || false}
              message="You guys are a match!"
              autoHideDuration={4000}
            />
          </div>
          }
          <ProfileItem
            data="name"
            label="Name"
            render={renderField}
            validate={
              composeValidators(
                required,
                noSpecialChars,
                mustContainLetter,
              )
            }
          />
          <ProfileItem
            data="sex"
            label="Sex"
            render={renderSelect}
            options={genders}
          />
          <ProfileItem
            data="age"
            format={formatDateForInput}
            label="Age"
            placeholder="DD/MM/YYYY"
            render={renderField}
            validate={
              composeValidators(
                validateDate,
                mustBeLength(10),
              )
            }
          />
          <ProfileItem
            data="edLevel"
            label="Education"
            render={renderSelect}
            options={edLevels}
          />
          <ProfileItem
            data="aboutMe"
            label="About Me"
            render={renderTextArea}
          />
        </div>
      </div>

    );
  }
}

function mapStateToProps ({ currentUser, visitedUser }) {
  return {
    currentUser,
    visitedUser,
    isMatch: visitedUser && visitedUser.isMatch,
  }
}


export default connect(mapStateToProps, { likeUser, unlikeUser })(Profile);
