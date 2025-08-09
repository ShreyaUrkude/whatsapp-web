// processWebhook.js
const Message = require('./models/Message'); // same folder

async function saveMessage(payload) {
  try {
    const newMessage = new Message({
      wa_id: payload.wa_id,
      message: payload.message || '',
      timestamp: payload.timestamp || new Date(),
      status: payload.status || '',
      sender: payload.sender || ''
    });

    await newMessage.save();
    console.log('Message saved:', newMessage);
  } catch (err) {
    console.error('Error saving message:', err.message);
  }
}

module.exports = { saveMessage };
