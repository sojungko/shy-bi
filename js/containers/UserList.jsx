import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/index';
<<<<<<< HEAD
import { bindActionCreators } from 'redux';
import SearchBar from './SearchBar';
// import UserListItem from '../containers/UserListItem.jsx';

class UserList extends Component {
  componentWillMount() {
=======
<<<<<<< HEAD
<<<<<<< HEAD
import { bindActionCreators } from 'redux';
import SearchBar from './SearchBar';
// import UserListItem from '../containers/UserListItem.jsx';

class UserList extends Component {
  componentWillMount() {
=======
=======
>>>>>>> 696bfd3b1930af53f13b636b40048877bea8281f
// import { bindActionCreators } from 'redux';
import UserListItem from '../containers/UserListItem.jsx';

class UserList extends Component {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 696bfd3b1930af53f13b636b40048877bea8281f
  constructor(props) {
    super(props);
  }

<<<<<<< HEAD
=======
>>>>>>> display-profile-1
>>>>>>> 696bfd3b1930af53f13b636b40048877bea8281f
  componentWillReceiveProps() {
>>>>>>> style: fix style issues
>>>>>>> refactor: style
    this.props.getAllUsers();
  }

  renderList() {
    return this.props.users.map((user, index) => {
      return (
        <li key={index}>{user.name}</li>
      );
    });
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <SearchBar></SearchBar>
=======
<<<<<<< HEAD
<<<<<<< HEAD
        <SearchBar></SearchBar>
=======
>>>>>>> style: fix style issues
=======
>>>>>>> 696bfd3b1930af53f13b636b40048877bea8281f
>>>>>>> refactor: style
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, { getAllUsers })(UserList);
