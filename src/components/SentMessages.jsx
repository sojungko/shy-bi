import React, { PropTypes } from 'react';
import renderMessages from '../modules/messages';

const SentMessages = ({ sent }) => (
  <div>
    {renderMessages(sent)}
  </div>
);

SentMessages.propTypes = {
  sent: PropTypes.arrayOf(PropTypes.object),
};

export default SentMessages;
