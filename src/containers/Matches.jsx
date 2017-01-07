import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMatches, getLikedUsers } from '../actions';

import { isUserAuthenticated, getUsername } from '../modules/auth';

import Navbar from '../components/Navbar';

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

  render() {
    const matchesMenu = [
      { label: 'matches', path: 'matches/' },
      { label: 'likes', path: 'matches/likes/:username' },
    ];

    const children = Children
      .map(this.props.children, child => React.cloneElement(child, {
        mutualLikes: this.props.matches,
        likes: this.props.likes,
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
