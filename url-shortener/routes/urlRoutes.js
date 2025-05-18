// routes/urlRoutes.js
const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Rota para encurtar uma URL
router.post('/shorten', (req, res) => {
  const { original_url } = req.body;
  const short_url = require('nanoid').nanoid(8);

  const query = 'INSERT INTO urls (short_url, original_url) VALUES (?, ?)';
  pool.query(query, [short_url, original_url], (err) => {
    if (err) {
      console.error('Erro ao inserir URL:', err.message);
      return res.status(500).json({ error: 'Erro ao encurtar a URL' });
    }
    res.json({ short_url });
  });
});

// Rota para redirecionar usando a URL curta
router.get('/:short_url', (req, res) => {
  const { short_url } = req.params;

  const query = 'SELECT original_url FROM urls WHERE short_url = ?';
  pool.query(query, [short_url], (err, results) => {
    if (err) {
      console.error('Erro ao buscar URL:', err.message);
      return res.status(500).json({ error: 'Erro ao buscar a URL' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'URL não encontrada' });
    }

    // Atualiza o contador de cliques
    const updateClicks = 'UPDATE urls SET clicks = clicks + 1 WHERE short_url = ?';
    pool.query(updateClicks, [short_url], (err) => {
      if (err) {
        console.error('Erro ao atualizar cliques:', err.message);
      }
    });

    // Redireciona para a URL original
    const original_url = results[0].original_url;
    res.redirect(original_url);
  });
});

module.exports = router;
