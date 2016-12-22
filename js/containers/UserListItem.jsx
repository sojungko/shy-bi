import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.user) {
      return <div>Select user to see profile</div>;
    }

    return (
      <div>
        <li className="list-group-item">
          <div className="details">
            <div>Name: {this.props.user.name}</div>
            <div>Sex: {this.props.user.sex}</div>
            <div>Age: {this.props.user.age}</div>
            <div>City: {this.props.user.city}</div>
          </div>
        </li>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.selectedUser
  };
}

export default connect(mapStateToProps)(UserListItem);
