require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sendEvent, receiveEvents } = require('./eventHandler'); 
const app = express();


// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});


// Endpoint to trigger sending of cloud events
app.post('/sendEvent', async (req, res) => {
    try {
      await sendEvent();
      res.status(200).send('Event sent successfully');
    } catch (error) {
      console.error('Error sending event:', error);
      res.status(500).send('Error sending event');
    }
  });
  
  // Endpoint to trigger receiving of cloud events
  app.post('/receiveEvents', async (req, res) => {
    try {
      await receiveEvents();
      res.status(200).send('Events received successfully');
    } catch (error) {
      console.error('Error receiving events:', error);
      res.status(500).send('Error receiving events');
    }
  });



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  