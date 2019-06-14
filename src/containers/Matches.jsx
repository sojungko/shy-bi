import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import Paper from '@material-ui/core/Paper';

import Navbar from '../components/Navbar';
import { getMatches, getLikedUsers, getUser, viewMatch } from '../actions';
import { isUserAuthenticated, getUsername } from '../modules/auth';
import styles from '../styles/CardHeader';

class Matches extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    children: PropTypes.node,
    getMatches: PropTypes.func,
    getLikedUsers: PropTypes.func,
    matches: PropTypes.arrayOf(PropTypes.object),
    likes: PropTypes.arrayOf(PropTypes.object),
    getUser: PropTypes.func,
    viewMatch: PropTypes.func,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/home');
    } else {
      const username = getUsername();
      this.props.getMatches(username);
      this.props.getLikedUsers(username);
    }
  }

  componentDidMount() {
    this.props.viewMatch(getUsername());
  }

  handleClick = (userName) => {
    this.props.getUser(userName)
      .then(() => {
        this.context.router.push(`/profile/${userName}`);
      });
  }

  render() {
    const username = getUsername();
    const matchesMenu = [
      { label: 'matches', path: `/matches/${username}` },
      { label: 'likes', path: `matches/likes/${username}` },
    ];

    const children = Children
      .map(this.props.children, child => React.cloneElement(child, {
        matches: this.props.matches,
        likes: this.props.likes,
        handleClick: this.handleClick,
      }));

    return (
      <div>
        {/* <div menus={matchesMenu} /> */}
        <div>
          Candidates
          {/* <CardHeader
            title="Candidates"
            titleStyle={styles.title}
          /> */}
        </div>
        <div style={{ marginTop: '50px' }}>
          {children}
        </div>
      </div>

    );
  }
}

const mapStateToProps = ({ users }) => ({
  matches: users.matches,
  likes: users.likes,
});

export default connect(mapStateToProps, { getMatches, getLikedUsers, getUser, viewMatch })(Matches);
