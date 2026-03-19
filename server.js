const express = require('express');
const path = require('path');
const { scrapeData } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  try {
    const data = await scrapeData(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao processar a URL', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT}`);
});
