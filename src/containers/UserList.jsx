import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { getAllUsers } from '../actions/index';
import SearchBar from '../components/SearchBar';

class UserList extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.number.boolean,
    }),
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
    getAllUsers: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      hashHistory.push('/login');
    }

    this.props.getAllUsers();
  }

  renderList() {
    console.log('containers/UserList renderList this.props.users : ', this.props.users);
    return this.props.users.map((user, index) => (
      <li key={index}>{user.name}</li>
      ));
  }

  render() {
    return (
      <div>
        <SearchBar />
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth, users }) {
  return { auth, users };
}

export default connect(mapStateToProps, { getAllUsers })(UserList);
