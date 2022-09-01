// the following function obtains current geolocation of the device
window.addEventListener('load', function() {
  console.log('Event DOM load effected...');
  // obtain coordinates
  /*
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (position)=> {
      const x = document.querySelector('.location');
      x.textContent = 
      `Latitude: ${position.coords.latitude}°, 
              Longitude: ${position.coords.longitude}°`;
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  */

  // obtain current time after every 1000 secs
  const currDateTime = new Date();
  currDateTimeStr= currDateTime.toString();
  currDate = currDateTimeStr.substr(0, 15);
  currTime = currDateTimeStr.substr(16, 12);

  y = document.querySelector('.date');
  y.textContent = currDate;

  z = document.querySelector('.time');
  z.textContent = currTime;
});

function showPosition(position) {
  const x = window.querySelector('.location');
  x.textContent = 
  `Lat: ${position.cords.longitude}, Lon: ${position.coords.longitude}`;

}

// sidebar menu animation
const closeButton = document.querySelector('.close-btn');
const sidebarMenu = document.querySelector('.sidebar');
const sidebarToggleButton = document.querySelector('.sidebar-toggle');

sidebarToggleButton.addEventListener('click', function () {

  if (sidebarMenu.classList.contains('show-sidebar')) {
      sidebarMenu.classList.remove('show-sidebar');
  } else {
      sidebarMenu.classList.add('show-sidebar');
  }
});

closeButton.addEventListener('click', function(){
  sidebarMenu.classList.remove('show-sidebar');
});

// nav bar animation when screen less than 850px 
const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function(){
  //if (links.classList.contains('show-links')) {
  //    links.classList.remove('show-links')
  //} else {
  //    links.classList.add('show-links');
  //}
  links.classList.toggle('show-links'); //this one line replaces all 4 above
});

// On form submit, this function will validate the data in the form fields
function validateForm() {
  alert("I do get into validateForm...");
  let x = document.forms["contactus-form"]["txt-fname"].value;
  alert("After evaluating x ...");
  if (x === "") {
    alert("Name must be filled out");
    return false;
  }
}