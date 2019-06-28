import React, { Component } from 'react';
import classNames from 'classnames';

class ProfileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
    };
  }

  toggleEditable = (e) => {

  }

  render() {
    const {
      currentUser,
      visitedUser,
      type,
    } = this.props;

    const itemClass = classNames({
      'profile--row': true,
      'profile--row__item': true,
      'profile--row__no-edit': visitedUser,
      'profile--row__edit': currentUser,
    });

    return (
      <div className={itemClass}>
        <span className="profile--item-title">{type}</span>
        <p>{visitedUser ? visitedUser[type] : currentUser[type]}</p>
        {currentUser && <i className="material-icons md-18 md-dark">create</i>}
      </div>
    );
  }
}

export default ProfileItem;