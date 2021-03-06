import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { array, func, oneOfType } from 'prop-types';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import { editBio } from 'actions';
import { parseDate } from 'modules/formatters';
import { userPropType } from 'constants/prop-types';

import Loader from '../../styles/svgs/loader.svg';

class ProfileItem extends Component {
  static propTypes = {
    currentUser: userPropType,
    data: string,
    editBio: func,
    format: func,
    options: array,
    parse: func,
    placeholder: string,
    render: func,
    visitedUser: oneOfType([userPropType, null]),
    validate: func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      isSubmitting: false,
    };
  }

  onSubmit = async val => {
    if (val.birthday) {
      val.birthday = parseDate(val.birthday);
    }
    const { currentUser } = this.props;
    this.setState({ isSubmitting: true });
    await this.props.editBio({ ...currentUser, ...val });
    this.setState({ isSubmitting: false, isEditable: false });
  };

  toggleEditable = () => {
    this.setState({ isEditable: !this.state.isEditable });
  };

  renderItem = () => {
    const { isEditable, isSubmitting } = this.state;
    const {
      currentUser,
      data,
      format,
      options,
      parse,
      placeholder,
      render,
      visitedUser,
      validate,
    } = this.props;

    // if visited user's profile page
    if (visitedUser) {
      return <p>{visitedUser[data]}</p>;
    }
    // if current user's profile page & not editable
    if (currentUser && !isEditable) {
      return (
        <Fragment>
          <p>{currentUser[data]}</p>
          <i
            className="material-icons md-18 md-dark md-inactive md-clickable"
            onClick={this.toggleEditable}
          >
            create
          </i>
        </Fragment>
      );
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
                  disabled={isSubmitting}
                  format={format}
                  name={data}
                  options={options}
                  parse={parse}
                  placeholder={placeholder}
                  render={render}
                  validate={validate}
                />
                {isSubmitting ? (
                  <Loader className="svg-loader" />
                ) : (
                  <Fragment>
                    <i className={doneClass} onClick={handleSubmit}>
                      done
                    </i>
                    <i
                      className="material-icons md-18 md-dark md-clickable"
                      onClick={this.toggleEditable}
                    >
                      clear
                    </i>
                  </Fragment>
                )}
              </form>
            );
          }}
        />
      );
    }
  };

  render() {
    const { currentUser, label, visitedUser } = this.props;

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

function mapStateToProps({ currentUser, visitedUser }) {
  return {
    currentUser,
    visitedUser,
  };
}

export default connect(
  mapStateToProps,
  { editBio }
)(ProfileItem);
