import React, { PropTypes } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const NotificationBadge = ({ handleClick, numberOfMatches, numberOfMessages }) => (
  <div>
    <Badge
      badgeContent={!numberOfMatches ? 0 : numberOfMatches}
      primary
      badgeStyle={{ top: 12, right: 12 }}
      onClick={() => handleClick('/matches')}
    >
      <IconButton tooltip="Matches">
        <NotificationsIcon />
      </IconButton>
    </Badge>
    <Badge
      badgeContent={!numberOfMessages ? 0 : numberOfMessages}
      secondary
      badgeStyle={{ top: 12, right: 12 }}
      onClick={() => handleClick('/messages')}
    >
      <IconButton tooltip="Messages">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  </div>
  );

NotificationBadge.propTypes = {
  handleClick: PropTypes.func,
  numberOfMatches: PropTypes.number,
  numberOfMessages: PropTypes.number,
};
export default NotificationBadge;
