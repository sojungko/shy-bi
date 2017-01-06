import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';

const Message = (props) => {
  const { title, sentBy, senderID, body } = props.message;
  const messageMenu = ['received', 'sent', 'send'];
  return (
    <div>
      <Navbar menus={messageMenu} />
      <li>
        <h3>title: {title}</h3>
        <h5>
          <Link to={`/profile/${senderID}`}>Sent by: {sentBy}</Link>
        </h5>
        <p>body: {body}</p>
      </li>
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
};

export default Message;
