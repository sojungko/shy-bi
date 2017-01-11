import React, { PropTypes } from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';

import { getUsername } from '../modules/auth';

const Message = ({ message, handleExpand, expanded }) => {
  const { title, sentBy, senderID, receiverID, receivedBy, body } = message;

  const id = (senderID === getUsername()) ? receiverID : senderID;
  const name = (id === receiverID) ? receivedBy : sentBy;
  const prefix = (id === receiverID) ? 'from : ' : 'to : ';

  return (
    <Card expanded={expanded} onExpandChange={() => handleExpand(message)}>
      <CardHeader
        title={<Link to={`/profile/${id}`}>{prefix}{name}</Link>}
        subtitle={title}
        avatar="http://www.color-hex.com/palettes/3899.png"
        actAsExpander
        showExpandableButton
      />
      <CardText>
        <p>{`${body.slice(0, 20)}...`}</p>
      </CardText>
      <CardTitle title={title} subtitle="Card subtitle" expandable />
      <CardText expandable>
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
