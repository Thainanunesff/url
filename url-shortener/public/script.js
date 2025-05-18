// script.js
async function shortenURL() {
    const urlInput = document.getElementById('urlInput').value;
    const response = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_url: urlInput })
    });
    const data = await response.json();
    if (data.short_url) {
        const shortUrl = `http://localhost:3000/${data.short_url}`;
        const resultCard = document.getElementById('resultCard');
        const shortenedUrl = document.getElementById('shortenedUrl');
        shortenedUrl.value = shortUrl;
        resultCard.style.display = 'block';
    } else {
        showError('Erro ao encurtar a URL');
    }
}

document.getElementById('shortener-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await shortenURL();
});

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => errorMessage.style.display = 'none', 3000);
}

function copyToClipboard() {
    const shortenedUrl = document.getElementById('shortenedUrl');
    shortenedUrl.select();
    navigator.clipboard.writeText(shortenedUrl.value);
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2000);
}

document.getElementById('copyButton').addEventListener('click', copyToClipboard);
