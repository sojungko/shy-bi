import React from 'react';
import PropTypes from 'prop-types';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/CardHeader';
// import CardTitle from '@material-ui/CardTitle';
// import CardText from '@material-ui/CardText';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import { getUsername } from 'modules/auth';

const style = {
  fontFamily: 'Source Sans Pro',
};

const Message = ({ message, handleExpand, expanded }) => {
  const { title, sentBy, senderID, receiverID, receivedBy, body, read } = message;

  const id = (senderID === getUsername()) ? receiverID : senderID;
  const name = (id === receiverID) ? receivedBy : sentBy;
  const prefix = (id === receiverID) ? 'from : ' : 'to : ';

  return (
    <div expanded={expanded} onExpandChange={() => handleExpand(message)}>
      <div>
      </div>
      {/* <CardHeader
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
      </CardText> */}
    </div>
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
