import React from 'react';
import PropTypes from 'prop-types';
import { GridList } from 'material-ui/GridList';
import renderUserList from '../modules/users';

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
    <GridList
      cellHeight="auto"
      style={styles.gridList}
      cols={6}
      padding={30}
    >
      {renderUserList(users, handleClick)}
    </GridList>
  </div>
);

UserListItem.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default UserListItem;
