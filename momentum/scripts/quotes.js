const quoteOutput = document.querySelector('#quote'),
      refresh = document.querySelector('#refresh');

// quoteOutput.style.transition = "opacity 0.3s ease-in";

async function getQuotes(callback) {
  let quotes = await fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return callback(data)
    });
}

function getRandomQuote() {
  const callback = result => {
    quoteOutput.style.opacity = "1";
    quoteOutput.innerText = `"${result[Math.floor(Math.random() * result.length)].text}"`;
  }

  getQuotes(callback)
}

getRandomQuote();

refresh.addEventListener('click', () => {
  refresh.style.pointerEvents = 'none';
  quoteOutput.style.opacity = "0";
  getRandomQuote();
  setTimeout(() => refresh.style.pointerEvents = 'auto', 1500);
});
