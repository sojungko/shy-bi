import React, { Component, PropTypes } from 'react';

export default class UserListItem extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      image_url: PropTypes.string,
    }),
    handleClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { user, handleClick } = this.props;
    handleClick(user.username);
  }

  render() {
    const { name, sex, age, city, image_url } = this.props.user;

    return (
      <div onClick={this.onClick}>
        <img role="presentation" src={image_url} />
        <li>
          <h3>{name}</h3>
          <h5>Sex: {sex}</h5>
          <h5>Age: {age}</h5>
          <h5>City: {city}</h5>
        </li>
      </div>
    );
  }
}
