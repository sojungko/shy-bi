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
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

const UserListItem = ({ users, handleClick }) => (
  <GridList
    cellHeight={180}
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
