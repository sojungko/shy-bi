import React, { PropTypes } from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';

import { getUsername } from '../modules/auth';

const style = {
  fontFamily: 'Source Sans Pro',
};

const Message = ({ message, handleExpand, expanded }) => {
  const { title, sentBy, senderID, receiverID, receivedBy, body, read } = message;

  const id = (senderID === getUsername()) ? receiverID : senderID;
  const name = (id === receiverID) ? receivedBy : sentBy;
  const prefix = (id === receiverID) ? 'from : ' : 'to : ';

  return (
    <Card expanded={expanded} onExpandChange={() => handleExpand(message)}>
      <CardHeader
        style={style}
        title={<Link to={`/profile/${id}`}>{prefix}{name}</Link>}
        subtitle={title}
        avatar="http://www.color-hex.com/palettes/3899.png"
        actAsExpander
        showExpandableButton
      />
      <CardText style={style}>
        { !read && <p>Unread</p>}
        <p>{`${body.slice(0, 20)}...`}</p>
      </CardText>
      <CardTitle style={style} title={title} expandable />
      <CardText style={style} expandable>
        {body}
      </CardText>
    </Card>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sentBy: PropTypes.string.isRequired,
    senderID: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  handleExpand: PropTypes.func,
  expanded: PropTypes.bool,
};

export default Message;
