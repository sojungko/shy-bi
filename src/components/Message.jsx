import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Message = (props) => {
  const { title, sentBy, senderID, body } = props.message;
  return (
    <li>
      <h3>{title}</h3>
      <h5>
        <Link to={`/profile/${senderID}`}>{sentBy}</Link>
      </h5>
      <p>{`${body.split('. ')[0].slice(0, 35)}...`}</p>
    </li>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sentBy: PropTypes.string.isRequired,
    senderID: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
};

export default Message;
