import React from 'react';
import './ChatWindow.css';

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function ChatWindow({ messages, selectedUser }) {
  if (!selectedUser) {
    return <div className="chat-window empty">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={selectedUser.avatar} alt={selectedUser.name} className="chat-avatar" />
        <div className="chat-user-info">
          <strong>{selectedUser.name}</strong>
          <span className="wa-id">+{selectedUser.wa_id}</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === 'agent' ? 'sent' : 'received'}`}
          >
            <span className="message-text">{msg.message}</span>
            <span className="message-meta">
              {formatTime(msg.timestamp)}
              {msg.sender === 'agent' && <span className="message-status">✓</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
