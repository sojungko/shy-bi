import React from 'react';
import Message from '../components/Message';

export default function renderMessages(messages) {
  return messages.map((message, index) =>
    <Message key={index} message={message} />,
  );
}
