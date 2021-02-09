const userNameInput = document.querySelector('#userName'),
      userCountryInput = document.querySelector('#country'),
      userFocusInput = document.querySelector('#userFocus');


// values to localStorage
let userName = '',
    userFocus = '',
    userCountryState = '';

// temp data
let tempInputNameData;
let tempInputFocusData;
let tempInputCountryData;

// constants for localStorage
const STORAGE_NAME = 'name';
const STORAGE_FOCUS = 'focus';


// init input state
updateInputState(userNameInput, STORAGE_NAME, '[sir]');
updateInputState(userFocusInput, STORAGE_FOCUS, '[Rest and chill]');
updateInputState(userCountryInput, STORAGE_COUNTRY, '[New York]');

// connect events to inputs
addEventsToInput(userNameInput, tempInputNameData, STORAGE_NAME, userName);
addEventsToInput(userFocusInput, tempInputFocusData, STORAGE_FOCUS, userFocus);
addEventsToInput(userCountryInput, tempInputCountryData, STORAGE_COUNTRY, userCountryState, 'weather');

function updateInputState(elem, storageKey, defaultText) {
  return localStorage.getItem(storageKey) ? elem.innerText = localStorage.getItem(storageKey) : elem.innerText = defaultText;
}

function addEventsToInput(input, tempData, storageKey, storageValue, type = undefined) {

  input.addEventListener('input', event => {
    storageValue = event.target.innerText.trim();
  });

  input.addEventListener('focus', () => {
    tempData = input.innerText;
    input.innerText = '';
    input.style.minWidth = "70px";
  })

  input.addEventListener('blur', () => {
    if (!input.innerText.trim()) {
      input.innerText = tempData;
    }
    input.style.minWidth = "0px";
  })

  input.onkeydown = event => {
    if (event.keyCode == 13) {
      if (storageValue.trim() !== '') {
        localStorage.setItem(storageKey, storageValue);
        input.innerText = storageValue.trim();
        switch (type) {
          case 'weather':
            getWeatherByCountryName(storageValue);
            break;
          default:
            return false;
        }
      }
      return false;
    }
  }
};
