import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import ActionFavorite from '@material-ui/icons/Favorite';
import ActionFavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { getCurrentUser, likeUser } from 'actions';
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
import {
  renderField,
  renderSelect,
  renderTextArea,
} from 'components/Form';

class Profile extends Component {
  static propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    likeUser: PropTypes.func,
    open: PropTypes.bool,
  }
  
  unlike = () => {
    this.props.unlikedUser(this.props.currentUser, this.props.visitedUser);
  }
    
  like = () => {  
    this.props.likeUser(this.props.currentUser, this.props.visitedUser);
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
            You are online
          </div>
          { visitedUser && 
          <div className="profile--row">
            <i className="material-icons md-18 md-clickable" onClick={this.like}>favorite_border</i>
            {/* <Snackbar
              open={this.props.open || false}
              message="You guys are a match!"
              autoHideDuration={4000}
            /> */}
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
  }
}


export default connect(mapStateToProps, { getCurrentUser, likeUser })(Profile);
