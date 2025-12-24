const express = require('express');
const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');

const app = express();
const PORT = process.env.PORT || 80;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));
app.use(express.json());

// AWS Secrets Manager config
const secretsManager = new AWS.SecretsManager({
  region: 'us-east-1' // ⚠️ CHANGE TO YOUR REGION
});

let connectionPool;

// Fetch DB credentials and initialize pool
async function initDb() {
  try {
    console.log('Fetching DB credentials from Secrets Manager...');
    const secretValue = await secretsManager.getSecretValue({ SecretId: 'crud-db-credentials' }).promise();
    const { host, username, password } = JSON.parse(secretValue.SecretString);

    connectionPool = mysql.createPool({
      host,
      user: username,
      password,
      database: 'crud_app',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('✅ Database pool initialized');
  } catch (err) {
    console.error('❌ Failed to initialize DB:', err);
    process.exit(1);
  }
}

// --- API Routes ---
// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await connectionPool.execute('SELECT * FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  try {
    const [result] = await connectionPool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const [result] = await connectionPool.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ id, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connectionPool.execute('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Serve UI at root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// Start server
initDb().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start app:', err);
});