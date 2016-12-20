import React, { Component } from 'react';

export default class UserListItem extends Component {
  constructor(props) {
    super();
  }

  render() {
    console.log('USERLISTITEM PROPS: ', this.props);
    return (
      <li className="list-group-item">
        <div className="details">
          <div>Name: {this.props.user.user.name}</div>
          <div>Sex: {this.props.user.sex}</div>
          <div>Age: {this.props.user.age}</div>
          <div>City: {this.props.user.city}</div>
        </div>
      </li>
    );
  }
}
