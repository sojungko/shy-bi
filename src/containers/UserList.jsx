import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { isUserAuthenticated } from '../modules/auth';
import { getUser, getAllUsers } from '../actions';
import SearchBar from '../containers/SearchBar';
import UserListItem from '../components/UserListItem';
import styles from '../styles/CardHeader';

class UserList extends Component {
  static propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/');
    } else {
      this.props.getAllUsers();
    }
  }

  handleClick = (userName) => {
    this.props.getUser(userName)
      .then(() => {
        this.context.router.push(`/profile/${userName}`);
      });
  }

  render() {
    return (
      <Paper>
        <Card style={{ position: 'fixed', width: '100%' }}>
          <CardHeader
            title="Explore"
            titleStyle={styles.title}
            subtitle="Take a look at our beautiful users. Like them to connect."
            subtitleStyle={styles.subtitle}
          />
        </Card>
        <SearchBar />
        <UserListItem users={this.props.users} handleClick={this.handleClick} />
      </Paper>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users: users.users,
});

export default connect(mapStateToProps, { getUser, getAllUsers })(UserList);
