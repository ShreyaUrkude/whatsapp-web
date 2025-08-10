import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './App.css';

const dummyChats = [
  {
    wa_id: '1234567890',
    name: 'Alice',
    lastMessage: 'See you soon!',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    time: '12:30 PM',
  },
  {
    wa_id: '9876543210',
    name: 'Bob',
    lastMessage: '👍 Got it!',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    time: '11:12 AM',
  },
  {
    wa_id: '5678901234',
    name: 'Charlie',
    lastMessage: 'Let me check...',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    time: 'Yesterday',
  },
  {
    wa_id: '2223334445',
    name: 'Diana',
    lastMessage: 'I’m on the way!',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    time: '10:45 AM',
  },
  {
    wa_id: '3334445556',
    name: 'Ethan',
    lastMessage: 'Thanks!',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    time: '10:15 AM',
  },
  {
    wa_id: '4445556667',
    name: 'Fiona',
    lastMessage: 'Let’s catch up later.',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    time: '9:30 AM',
  },
  {
    wa_id: '5556667778',
    name: 'George',
    lastMessage: 'Cool 😎',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    time: '9:00 AM',
  },
  {
    wa_id: '6667778889',
    name: 'Hannah',
    lastMessage: 'Can you send the file?',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    time: '8:45 AM',
  },
  {
    wa_id: '7778889990',
    name: 'Ian',
    lastMessage: 'Meeting at 3 PM.',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    time: '8:30 AM',
  },
  {
    wa_id: '8889990001',
    name: 'Jasmine',
    lastMessage: 'Got your email!',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    time: '8:00 AM',
  },
  {
    wa_id: '9990001112',
    name: 'Kevin',
    lastMessage: 'Let’s discuss tomorrow.',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    time: '7:45 AM',
  },
  {
    wa_id: '0001112223',
    name: 'Luna',
    lastMessage: 'Sounds good!',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    time: '7:30 AM',
  },
  {
    wa_id: '1112223334',
    name: 'Max',
    lastMessage: 'I’ll be there soon.',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    time: '7:15 AM',
  },
  {
    wa_id: '2223334446',
    name: 'Nina',
    lastMessage: 'Thanks for the update.',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    time: '7:00 AM',
  },
];

const dummyMessages = {
  '1234567890': [{ message: 'Hi Alice', sender: 'agent', timestamp: 1691400000 }],
  '9876543210': [{ message: 'Hello Bob', sender: 'client', timestamp: 1691400500 }],
  '5678901234': [{ message: 'Hey Charlie', sender: 'agent', timestamp: 1691400800 }],
  '2223334445': [{ message: 'Hey Diana!', sender: 'agent', timestamp: 1691400900 }],
  '3334445556': [{ message: 'Hi Ethan', sender: 'client', timestamp: 1691400950 }],
  '4445556667': [{ message: 'Hello Fiona', sender: 'agent', timestamp: 1691401000 }],
  '5556667778': [{ message: 'Hey George', sender: 'client', timestamp: 1691401050 }],
  '6667778889': [{ message: 'Hi Hannah', sender: 'agent', timestamp: 1691401100 }],
  '7778889990': [{ message: 'Hello Ian', sender: 'client', timestamp: 1691401150 }],
  '8889990001': [{ message: 'Hey Jasmine', sender: 'agent', timestamp: 1691401200 }],
  '9990001112': [{ message: 'Hi Kevin', sender: 'client', timestamp: 1691401250 }],
  '0001112223': [{ message: 'Hello Luna', sender: 'agent', timestamp: 1691401300 }],
  '1112223334': [{ message: 'Hey Max', sender: 'client', timestamp: 1691401350 }],
  '2223334446': [{ message: 'Hi Nina', sender: 'agent', timestamp: 1691401400 }],
};

function App() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSelect = (id) => {
    setSelectedChatId(id);
    setMessages(dummyMessages[id] || []);
  };

  const handleSend = async (text) => {
    if (!selectedChatId || !text.trim()) return;

    const newMsg = {
      wa_id: selectedChatId,
      sender: 'agent',
      message: text,
      timestamp: Math.floor(Date.now() / 1000),
    };

    
    setMessages((prev) => [...prev, newMsg]);

    
    try {
      await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });
    } catch (err) {
      console.error('❌ Failed to save message:', err);
    }
  };

  const selectedUser = dummyChats.find((chat) => chat.wa_id === selectedChatId);

  return (
    <div className="app-container">
      <div className="chat-sidebar">
        <ChatList chats={dummyChats} onSelect={handleSelect} selectedChatId={selectedChatId} />
      </div>
      <div className="chat-main">
        <ChatWindow messages={messages} selectedUser={selectedUser} />
        {selectedUser && <MessageInput onSend={handleSend} />}
      </div>
    </div>
  );
}

export default App;
