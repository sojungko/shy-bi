import React, { PropTypes } from 'react';
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
  },
};

const UserListItem = ({ users, handleClick }) => (
  <div style={styles.root}>
    <GridList
      cellHeight="auto"
      style={styles.gridList}
      cols={4}
      padding={5}
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
