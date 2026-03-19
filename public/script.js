document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scrape-form');
  const urlInput = document.getElementById('url-input');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = document.getElementById('spinner');
  const resultContainer = document.getElementById('result-container');
  const jsonOutput = document.getElementById('json-output');
  const copyBtn = document.getElementById('copy-btn');

  function syntaxHighlight(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    btnText.style.display = 'none';
    spinner.style.display = 'block';
    submitBtn.disabled = true;
    resultContainer.classList.remove('visible');

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro desconhecido');
      }

      jsonOutput.innerHTML = syntaxHighlight(data);
      
      setTimeout(() => {
        resultContainer.classList.add('visible');
      }, 100);

    } catch (error) {
      jsonOutput.innerHTML = `<span style="color:#ff7b72">Erro ao se conectar com o servidor: ${error.message}</span>`;
      resultContainer.classList.add('visible');
    } finally {
      btnText.style.display = 'block';
      spinner.style.display = 'none';
      submitBtn.disabled = false;
    }
  });

  copyBtn.addEventListener('click', () => {
    const text = jsonOutput.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '✅ Copiado!';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    });
  });
});
