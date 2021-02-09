// loader
const loadScreen = document.querySelector('#loader');



let loadChecker = setInterval(() => {
  // DOM elements from time.js and quotes.js
  if (timeOutput.innerText && quoteOutput.innerText && userCountryInput.innerText) {
      loadScreen.style.display = 'none';
      clearInterval(loadChecker);
  }
}, 10)
