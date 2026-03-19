const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeData(targetUrl) {
  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const info = {
      url: targetUrl,
      title: $('title').text().trim(),
      description: $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || null,
      headings: { h1: [], h2: [] },
      links: [],
      images: []
    };

    $('h1').each((i, el) => {
      const text = $(el).text().trim();
      if (text) info.headings.h1.push(text);
    });

    $('h2').each((i, el) => {
      const text = $(el).text().trim();
      if (text) info.headings.h2.push(text);
    });

    $('a').each((i, el) => {
      if (i < 15) {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        if (href) info.links.push({ text, href });
      }
    });

    $('img').each((i, el) => {
      if (i < 5) {
        const src = $(el).attr('src');
        const alt = $(el).attr('alt') || '';
        if (src) info.images.push({ src, alt });
      }
    });

    return info;

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { scrapeData };
