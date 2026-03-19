# MeuScrap 🕷️

**MeuScrap** é uma ferramenta open-source de web scraping moderna, construída com Node.js. 
Este projeto extrai de forma rápida dados de qualquer página da web e os estrutura diretamente em uma visualização JSON formatada através de uma interface web com design elegante em **Glassmorphism**.

## 🚀 Funcionalidades Principais

- **Visualização elegante**: Interface rica (Dark Mode + Glassmorphism) construída sem complicação de dependências de Front-end (Vanilla JS/CSS).
- **Extração de SEO e Metadados**: Extrai rapidamente `<title>`, `<meta name="description">` e textos da estrutura `<H1>` e `<H2>`.
- **Extração de Links e Mídias**: Puxa atalhos HTML para fotos (com texto alternativo) e os primeiros hiperlinks da página informada.
- **Syntax Highlighting Inteligente**: Exibe o JSON de retorno com formatação e cores sem a necessidade de uma pesada biblioteca importada.
- **Cópia Instantânea**: Botão útil de "Copiar para a área de transferência" o payload extraído no seu tamanho completo.

## 🛠️ Arquitetura e Bibliotecas

A aplicação utiliza as seguintes tecnologias sob o capô:

* **Backend / API Motor:**
  * [Node.js](https://nodejs.org/en/)
  * [Express.js](https://expressjs.com/) (Gerenciamento do Servidor HTTP)
  * [Axios](https://github.com/axios/axios) (Agente de Fetch seguro)
  * [Cheerio](https://cheerio.js.org/) (Interpretador de HTML em formato core jQuery)

* **Frontend:**
  * HTML5
  * CSS3 moderno (Variáveis UI, animações em Spinners e manipulação de backgrounds)
  * Javascript Vanilla (com uso de promises assíncronas padrão)

---

## 📦 Como Instalar e Rodar Localmente

**Requisito:** É necessário ter o **Node.js** instalado e um terminal à sua disposição.

1. **Clone este Repositório**
   ```bash
   git clone git@github.com:n8nfelipe/meuscrap.git
   cd meuscrap
   ```

2. **Instale as dependências package.json**
   ```bash
   npm install
   ```

3. **Suba seu Servidor Web**
   ```bash
   npm start
   # ou use:
   node server.js
   ```

4. **Acesse via Navegador:**
   Abra seu navegador em [http://localhost:3000](http://localhost:3000)

---

## 🕹️ Documentação da API

O projeto não se resume apenas à interface. Você também pode bater requisições diretamente na API HTTP POST a partir de ferramentas como **Postman**, **Insomnia** ou usar em outro servidor.

**POST** `/api/scrape`

### Request (JSON)
```json
{
  "url": "https://example.com"
}
```

### Response HTTP 200 (JSON)
```json
{
  "url": "https://example.com",
  "title": "Example Domain",
  "description": "Exemplo de metadados extraídos...",
  "headings": {
    "h1": ["Título primário"],
    "h2": ["Exemplo secundário"]
  },
  "links": [
    { "text": "Clique Aqui", "href": "https://exemplo.net" }
  ],
  "images": [
    { "src": "https://exemplo.jpg", "alt": "Descr. Img." }
  ]
}
```

---

## 🤝 Como Contribuir

Contribuições sempre são bem vindas. Adicione novas chaves de rastreio de seletores do Cheerio no `scraper.js` para aumentar as capacidades de raspar páginas de forma autônoma! 

1. Faça o Fork deste repositório
2. Crie a sua Feature Branch (`git checkout -b feature/minha-feature`)
3. Commit suas alterações (`git commit -m 'feat: adicionar nova lógica de scraping'`)
4. Faça o Push para a sua remota (`git push origin feature/minha-feature`)
5. Abra um Pull Request!

Licença: *Livre e Open Source.*
