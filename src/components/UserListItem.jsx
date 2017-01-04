import React, { Component, PropTypes } from 'react';

console.log('COMPONENT/USER | Exporting USER...');

export default class UserListItem extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    handleClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('      COMPONENT/USER | Complete Rendering USER ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    COMPONENT/USER | Receiving Props: ', nextProps);
    console.log('      COMPONENT/USER | Receiving Props');
  }

  componentDidUpdate() {
    console.log('      COMPONENT/USER | Complete Rendering USER ');
  }

  onClick = () => {
    const { user, handleClick } = this.props;
    handleClick(user.username);
  }

  render() {
    console.log('      COMPONENT/USER | Rendering USER Component...');

    const { name, sex, age, city } = this.props.user;

    return (
      <li onClick={this.onClick}>
        <h3>Name: {name}</h3>
        <h5>Sex: {sex}</h5>
        <h5>Age: {age}</h5>
        <h5>City: {city}</h5>
      </li>
    );
  }
}

console.log('COMPONENT/USER | Exported USER ');
console.log(' ');
