import React, { PropTypes } from 'react';
import {GridList} from 'material-ui/GridList';
import renderUserList from '../modules/users';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1000,
    height: 900,
    overflowY: 'auto',
  },
};

const UserListItem = ({ users, handleClick }) => (
  <GridList
    cellHeight="auto"
    style={styles.gridList}
  >
    {renderUserList(users, handleClick)}
  </GridList>
);

UserListItem.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default UserListItem;
