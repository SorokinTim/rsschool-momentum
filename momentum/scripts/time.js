const timeOutput = document.querySelector('#time'),
      dateOutput = document.querySelector('#date'),
      welcomeOutput = document.querySelector('#welcome');

setInterval(() => {
  let date = new Date;
  timeOutput.innerText = `${date.getHours()}:${addZeroToDate(date.getMinutes())}`;
  dateOutput.innerText = `${getDay(date.getDay())}, ${date.getDate()} ${getMonth(date.getMonth())}`;
  getWelcomeText(date.getHours());
}, 1000);


function addZeroToDate(date) {
  let result;
  if(date < 10) {
    result = "0" + String(date);
  } else {
    result = date
  }
  return result
}

function getMonth(month) {
  switch (month) {
    case 0:
      return "January"
    case 1:
      return "February"
    case 2:
      return "March"
    case 3:
      return "April"
    case 4:
      return "May"
    case 5:
      return "June"
    case 6:
      return "July"
    case 7:
      return "August"
    case 8:
      return "September"
    case 9:
      return "October"
    case 10:
      return "November"
    case 11:
      return "December"
  }
}

function getDay(day) {
  switch (day) {
    case 1:
      return "Monday"
    case 2:
      return "Tuesday"
    case 3:
      return "Wednesday"
    case 4:
      return "Thursday"
    case 5:
      return "Friday"
    case 6:
      return "Saturday"
    case 0:
      return "Sunday"
  }
}

function getWelcomeText(hour) {
  let result;
  if (hour >= 6 && hour < 12) {
    result = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    result = "Good afternoon";
  } else if (hour >= 18 && hour < 24) {
    result = "Good evening";
  } else {
    result = "Good night";
  }
  return welcomeOutput.innerText = result;
}
