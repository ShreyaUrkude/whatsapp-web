const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient('mongodb://localhost:27017');
let db;

async function connectDB() {
  await client.connect();
  db = client.db('testcaseApp');
  console.log(' Connected to MongoDB');
}
connectDB();


app.get('/chats', async (req, res) => {
  try {
    const chats = await db.collection('messages').find().toArray();
    res.json(chats);
  } catch (err) {
    console.error(' Failed to fetch chats:', err);
    res.status(500).send('Server error');
  }
});


app.post('/chats', async (req, res) => {
  const { wa_id, sender, text } = req.body;
  if (!wa_id || !sender || !text) return res.status(400).send('Missing fields');

  const message = { wa_id, sender, text, timestamp: Date.now() };
  await db.collection('messages').insertOne(message);

  const updatedMessages = await db
    .collection('messages')
    .find({ wa_id })
    .sort({ timestamp: 1 })
    .toArray();

  res.json(updatedMessages);
});


app.get('/messages/:wa_id', async (req, res) => {
  try {
    const messages = await db
      .collection('messages')
      .find({ wa_id: req.params.wa_id })
      .sort({ timestamp: 1 })
      .toArray();

    res.json(messages);
  } catch (err) {
    console.error(' Failed to fetch messages:', err);
    res.status(500).send('Server error');
  }
});


app.post('/chat', async (req, res) => {
  const { wa_id, sender, message, timestamp } = req.body;

  if (!wa_id || !sender || !message || !timestamp) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await db.collection('messages').insertOne({ wa_id, sender, message, timestamp });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(' Failed to save demo message:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(5000, () => {
  console.log(' Server running on http://localhost:5000');
});

