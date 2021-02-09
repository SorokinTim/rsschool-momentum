// DOM Element
const bodyElement = document.querySelector('body'),
      nextArrow = document.querySelector('#next'),
      prevArrow = document.querySelector('#prev');


// forming array with bg
let backgroundsArray = createBackgroundsArray();

// create queue of bg
let queueBackgrounds = createQueue(backgroundsArray);

// get now hour and init background
let hour = new Date().getHours();
showBackground(queueBackgrounds[hour], getDayTime(hour));

// init sliders control
let sliderControl = hour;

setInterval(() => {
  let date = new Date;
  if(hour != date.getHours()) {
    hour = date.getHours();
    sliderControl = hour;
    showBackground(queueBackgrounds[hour], getDayTime(hour));
  }
}, 1000);


// onclick events (previous btn)
prevArrow.addEventListener('click', () => {
  changeSlideOnClick('prev');
  prevArrow.style.pointerEvents = 'none';
  setTimeout(() => {
    prevArrow.style.pointerEvents = 'auto';
  }, 1000)
});

// onclick events (next btn)
nextArrow.addEventListener('click', () => {
  changeSlideOnClick('next');
  nextArrow.style.pointerEvents = 'none';
  setTimeout(() => {
    nextArrow.style.pointerEvents = 'auto';
  }, 1000)
});

refresh.addEventListener('contextmenu', (ev) => {
  ev.preventDefault();
  refresh.style.pointerEvents = 'none';
  backgroundsArray = createBackgroundsArray();
  queueBackgrounds = createQueue(backgroundsArray);
  showBackground(queueBackgrounds[hour], getDayTime(hour));
  setTimeout(() => refresh.style.pointerEvents = 'auto', 1000);
  return false;
});

function createBackgroundsArray() {
  let result = {
    night: [],
    morning: [],
    day: [],
    evening: [],
  };

  for (let arr in result) {
    for (let i = 0; i < 6;) {
      let temp = Math.floor(Math.random() * 20);
      if(!result[arr].includes(temp)) {
        result[arr].push(temp);
        i++;
      }
    }
  }

  return result;
}

function createQueue(obj) {
  let result = [];

  for (var arr in obj) {
    for (let i = 0; i < obj[arr].length; i++) {
      result.push(obj[arr][i]);
    }
  }

  return result
}

function showBackground(background, dayTime) {
  const img = document.createElement('img');
  img.src = `./assets/backgrounds/${dayTime}/${background}.jpg`;
  img.onload = () => {
    bodyElement.style.backgroundImage = `url('./assets/backgrounds/${dayTime}/${background}.jpg')`;
  };

}

function getDayTime(hour) {
  if (hour >= 6 && hour < 12) {
    return "morning";
  } else if (hour >= 12 && hour < 18) {
    return "day";
  } else if (hour >= 18 && hour < 24) {
    return "evening";
  } else {
    return "night";
  }
}

function changeSlideOnClick(type) {
  let temp = hour;
  switch (type) {
    case 'next':
      showBackground(queueBackgrounds[sliderControl == 23 ? sliderControl -= 23 : ++sliderControl], getDayTime(sliderControl));
      break;
    case 'prev':
      showBackground(queueBackgrounds[sliderControl == 0 ? sliderControl += 23 : --sliderControl], getDayTime(sliderControl));
      break;
  }
}
