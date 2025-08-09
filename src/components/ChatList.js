import React from 'react';
import './ChatList.css';

function ChatList({ chats, messages, onSelect, selectedChatId }) {

  const getLastMessage = (wa_id) => {
    if (!messages || messages.length === 0) return '';
    const chatMessages = messages
      .filter((msg) => msg.wa_id === wa_id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return chatMessages.length > 0 ? chatMessages[0].message : '';
  };

  
  const getMessageType = (wa_id) => {
    const msg = messages
      ?.filter((m) => m.wa_id === wa_id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    return msg?.messageType || 'received';
  };

  return (
    <div className="chat-list">
      {chats.map((chat) => {
        const lastMessage = getLastMessage(chat.wa_id) || chat.lastMessage || '';
        const messageType = getMessageType(chat.wa_id);

        return (
          <div
            key={chat.wa_id}
            className={`chat-item ${selectedChatId === chat.wa_id ? 'active' : ''}`}
            onClick={() => onSelect(chat.wa_id)}
          >
            <img src={chat.avatar} alt={chat.name} className="avatar" />
            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-name">{chat.name}</span>
                <span className="chat-time">
                  {chat.time || (messages.find(m => m.wa_id === chat.wa_id)?.timestamp
                    ? new Date(messages.find(m => m.wa_id === chat.wa_id).timestamp).toLocaleTimeString()
                    : '')}
                </span>
              </div>
              <div className="chat-preview">
                {lastMessage}
                <span className={`message-type ${messageType}`}>
                  {messageType === 'sent' ? ' (Sent)' : ' (Received)'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
