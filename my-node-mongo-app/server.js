require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
// const MONGO_URI = 'mongodb://mongo:27017/myapp';

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
async function connectDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  console.log('✅ Connected to MongoDB');
  return client.db();
}

let db;
connectDB().then(database => {
  db = database;
}).catch(err => {
  console.error('❌ DB Connection Error:', err);
});

// API: Get messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await db.collection('messages').find().toArray();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// API: Add message (demo)
app.get('/api/add', async (req, res) => {
  try {
    const result = await db.collection('messages').insertOne({
      text: "Hello from Node.js!",
      timestamp: new Date()
    });
    res.json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
});