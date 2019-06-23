import React from 'react';
import Message from 'components/Message';

export default function renderMessages(messages, handleExpand, expanded) {
  return messages.map((message, index) =>
    <Message key={index} message={message} handleExpand={handleExpand} expanded={expanded} />,
  );
}
