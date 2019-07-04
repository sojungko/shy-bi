import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { getCurrentUser, editBio } from 'actions';
import { userPropType } from 'constants/prop-types';
import {
  email,
  required,
  mustBeShorterThan,
  mustBeLongerThan,
  mustContainNumber,
  mustContainLetter,
  composeValidators,
} from 'modules/validators';

import App from 'components/App';
import ProfileItem from 'components/ProfileItem';
import { renderField } from 'components/Form';

class Account extends Component {
  static propTypes = {
    currentUser: userPropType,
    getCurrentUser: func,
    editBio: func,
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if (!currentUser) {
      Router.replace('/');
    }
  }

  onSubmit = (inputs) => {
  }

  render() {
    const { currentUser } = this.props;
    if (currentUser) {
  
      return (
        <App>
          <div className="page__container">
            <div className="account">
              <ProfileItem
                data="password"
                label="Password"
                render={renderField}
                type="password"
                validate={
                  composeValidators(
                    required,
                    mustBeLongerThan(8),
                    mustBeShorterThan(16),
                    mustContainLetter,
                    mustContainNumber
                  )
                }
              />
              <ProfileItem
                data="email"
                label="Email"
                render={renderField}
                type="email"
                validate={
                  composeValidators(
                    required,
                    email,
                  )
                }
              />
            </div>
          </div>
        </App>
      );
    }
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});
export default connect(mapStateToProps, { getCurrentUser, editBio })(Account);
