import React from 'react';
import PropTypes from 'prop-types';
// import GridList from '@material-ui/core/GridList';
import renderUserList from 'modules/users';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '50%',
    overflowY: 'auto',
    margin: '80px 0',
  },
  paper: {
    height: '300px',
    width: '200px',
  },
};

const UserListItem = ({ users, handleClick }) => (
  <div style={styles.root}>
    <ul
      cellHeight="auto"
      style={styles.gridList}
      cols={6}
      padding={30}
    >
      {/* {renderUserList(users, handleClick)} */}
    </ul>
  </div>
);

UserListItem.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default UserListItem;
