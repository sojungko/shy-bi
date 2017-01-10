import React, { PropTypes } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const NotificationBadge = ({ numberOfMatches, numberOfMessages }) => (
  <div>
    <Badge
      badgeContent={!numberOfMatches ? 0 : numberOfMatches}
      primary={true}
      badgeStyle={{ top: 12, right: 12 }}
    >
      <IconButton tooltip="Matches">
        <NotificationsIcon />
      </IconButton>
    </Badge>
    <Badge
      badgeContent={!numberOfMessages ? 0 : numberOfMessages}
      secondary={true}
      badgeStyle={{ top: 12, right: 12 }}
    >
      <IconButton tooltip="Messages">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  </div>
);

NotificationBadge.propTypes = {
  numberOfMatches: PropTypes.number,
  numberOfMessages: PropTypes.number,
};
export default NotificationBadge;
