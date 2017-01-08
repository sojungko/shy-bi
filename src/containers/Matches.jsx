import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';
import { getMatches, getLikedUsers } from '../actions';
import { isUserAuthenticated, getUsername } from '../modules/auth';


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
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else {
      const username = getUsername();
      this.props.getMatches(username);
      this.props.getLikedUsers(username);
    }
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

    console.log('likes :', this.props.likes);

    const children = Children
      .map(this.props.children, child => React.cloneElement(child, {
        mutualLikes: this.props.matches,
        likes: this.props.likes,
        handleClick: this.handleClick,
      }));

    return (
      <div>
        <Navbar menus={matchesMenu} />
        {children}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  matches: users.matches,
  likes: users.likes,
});

export default connect(mapStateToProps, { getMatches, getLikedUsers })(Matches);
