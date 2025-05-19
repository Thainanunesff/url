const express = require('express');
const serverless = require('serverless-http'); 
const pool = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Interpretar JSON
app.use(express.json());

// Rota da API
app.use('/api', urlRoutes);

// Arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
module.exports.handler = serverless(app);