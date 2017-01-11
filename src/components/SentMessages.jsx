import React, { PropTypes } from 'react';
import renderMessages from '../modules/messages';

const SentMessages = ({ sent, handleExpand, expanded }) => (
  <div>
    {renderMessages(sent, handleExpand, expanded)}
  </div>
);

SentMessages.propTypes = {
  sent: PropTypes.arrayOf(PropTypes.object),
  handleExpand: PropTypes.func,
  expanded: PropTypes.bool,
};

export default SentMessages;
