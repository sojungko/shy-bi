import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import { editBio } from 'actions';

import {
  required,
  mustBeShorterThan,
  mustBeLongerThan,
  noSpecialChars,
  mustContainNumber,
  mustContainLetter,
  composeValidators,
} from 'modules/validators';


class ProfileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
    };
  }

  onSubmit = (val) => {
    const { currentUser } = this.props;
    this.props.editBio({...currentUser, ...val});
  }

  toggleEditable = () => {
    this.setState({ isEditable: !this.state.isEditable });
  }

  renderItem = () => {
    const { isEditable } = this.state;
    const {
      currentUser,
      data,
      editBio,
      label,
      visitedUser,
    } = this.props;

    // if visited user's profile page
    if (visitedUser) {
      return <p>{visitedUser[data]}</p>
    }
    // if current user's profile page & not editable
    if (currentUser && !isEditable) {
      return (
        <Fragment>
          <p>{currentUser[data]}</p>
          <i
            className="material-icons md-18 md-dark md-clickable"
            onClick={this.toggleEditable}
          >
            create
          </i>
        </Fragment>
      )
    }
    // if current user's profile page & editable
    if (currentUser && isEditable) {
      return (
        <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, pristine, invalid, valid }) => {
          const doneClass = classNames({
            'material-icons': true,
            'md-18': true,
            'md-dark md-inactive': pristine || invalid,
            'md-dark md-clickable': valid,
          });
          return (
          <form onSubmit={handleSubmit}>
            <Field
              component="input"
              name={data}
              validate={
                composeValidators(
                  required,
                  noSpecialChars,
                  mustContainLetter,
                )
              }
            />
            <i
              className={doneClass}
              onClick={handleSubmit}
            >
              done
            </i>
            <i
              className="material-icons md-18 md-dark md-clickable"
              onClick={this.toggleEditable}
            >
              clear
            </i>
          </form>
        )
      }}
      />
      )
    }
  }

  render() {
    const {
      currentUser,
      label,
      visitedUser,
    } = this.props;

    const itemClass = classNames({
      'profile--row': true,
      'profile--row__item': true,
      'profile--row__no-edit': visitedUser,
      'profile--row__edit': currentUser,
    });

    return (
      <div className={itemClass}>
        <span className="profile--item-title">{label}</span>
        {this.renderItem()}
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

export default connect(mapStateToProps, { editBio })(ProfileItem);