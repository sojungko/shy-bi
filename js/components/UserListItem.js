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
          <div>{this.props.user.user.name}</div>
        </div>
      </li>
    );
  }
}
