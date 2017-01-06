import React, { PropTypes } from 'react';
import renderMessages from '../modules/messages';

const ReceivedMessages = ({ received }) => (
  <div>
    {renderMessages(received)}
  </div>
);

ReceivedMessages.propTypes = {
  received: PropTypes.arrayOf(PropTypes.object),
};

export default ReceivedMessages;
