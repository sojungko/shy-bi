import React, { PropTypes } from 'react';
import renderMessages from '../modules/messages';

const ReceivedMessages = ({ received, handleExpand, expanded }) => (
  <div>
    {renderMessages(received, handleExpand, expanded)}
  </div>
);

ReceivedMessages.propTypes = {
  received: PropTypes.arrayOf(PropTypes.object),
  handleExpand: PropTypes.func,
  expanded: PropTypes.bool,
};

export default ReceivedMessages;
