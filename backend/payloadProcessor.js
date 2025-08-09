// processPayloads.js
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Message = require('./models/Message');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/testcaseApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// 2. Read payload files
const payloadDir = path.join(__dirname, 'payloads');

fs.readdirSync(payloadDir).forEach(file => {
  const filePath = path.join(payloadDir, file);
  const rawData = fs.readFileSync(filePath, 'utf8');

  try {
    const payload = JSON.parse(rawData);

    // Process message payload
    if (payload.type === 'message') {
      const newMsg = new Message({
        wa_id: payload.wa_id,
        message: payload.message || '',
        timestamp: payload.timestamp,
        status: 'sent',
        sender: payload.sender || ''
      });

      newMsg.save().then(() => {
        console.log(` Message saved from ${file}`);
      }).catch(err => console.error(err));

    }

    
    else if (payload.type === 'status') {
      Message.findOneAndUpdate(
        { wa_id: payload.wa_id }, // match by wa_id
        { status: payload.status }, // update status
        { new: true }
      ).then(updated => {
        if (updated) {
          console.log(`📌 Status updated to '${payload.status}' for wa_id ${payload.wa_id}`);
        }
      }).catch(err => console.error(err));
    }

  } catch (err) {
    console.error(`❌ Error parsing ${file}:`, err);
  }
});
