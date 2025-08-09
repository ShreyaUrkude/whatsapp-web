import React, { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-bar">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="message-input-field"
        placeholder="Type a message..."
        aria-label="Message input"
      />
      <button
        onClick={handleSend}
        className="message-send-button"
        disabled={!text.trim()}
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
