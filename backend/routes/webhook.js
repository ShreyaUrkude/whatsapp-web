const express = require('express');
const bodyParser = require('body-parser');
const saveMessage = require('./processWebhook');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  try {
    const payload = req.body;

    // Example payload structure mapping
    await saveMessage({
      wa_id: payload.wa_id,
      message: payload.text || '',
      timestamp: payload.timestamp,
      status: payload.status || '',
      sender: payload.sender || '',
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Webhook listening on port 3000'));
