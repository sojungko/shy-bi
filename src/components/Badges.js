import React from 'react';
import PropTypes from 'prop-types';
// import Badge from '@material-ui/core/Badge';
// import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';

const NotificationBadge = ({
  handleClick,
  numberOfMatches,
  numberOfMessages,
}) => (
  <div>
    <div
      style={{ padding: '13px 24px 0px 0px' }}
      badgeContent={!numberOfMatches ? 0 : numberOfMatches}
      badgeStyle={{
        backgroundColor: '#04284a',
        top: 12,
        right: 12,
        fontFamily: 'Source Sans Pro',
        color: '#FFFFFF',
      }}
      onClick={() => handleClick('/matches')}
    >
      <NotificationsIcon />
    </div>
    <div
      style={{ padding: '13px 24px 0px 0px' }}
      badgeContent={!numberOfMessages ? 0 : numberOfMessages}
      secondary
      badgeStyle={{
        backgroundColor: '#04284a',
        top: 12,
        right: 12,
        fontFamily: 'Source Sans Pro',
        color: '#FFFFFF',
      }}
      onClick={() => handleClick('/messages')}
    >
      <NotificationsIcon />
    </div>
  </div>
);

NotificationBadge.propTypes = {
  handleClick: PropTypes.func,
  numberOfMatches: PropTypes.number,
  numberOfMessages: PropTypes.number,
};
export default NotificationBadge;
