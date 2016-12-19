import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserDetail extends Component {
  render() {
    if (!this.props.user) {
      return <div>Select a user</div>
    }
    return (
      <div>{this.props.user.name}</div>
      <div>{this.props.user.age}</div>
      <div>{this.props.user.city}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.activeUser
  };
}

export default connect(mapStateToProps)(UserDetail);
