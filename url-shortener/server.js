// server.js
const express = require('express');
const pool = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Interpretar JSON
app.use(express.json());

// Rota da API
app.use('/api', urlRoutes);

// Arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para verificar o servidor
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para caminho nao definido
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Aqui inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT} 🚀`);
});
