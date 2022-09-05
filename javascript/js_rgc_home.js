function showPosition(position) {
    const x = window.querySelector('.location');
    x.textContent = 
    `Lat: ${position.cords.longitude}, Lon: ${position.coords.longitude}`;
}

// the following function obtains current geolocation of the device
window.addEventListener('load', function() {
    console.log('Event DOM load effected...');
    // obtain coordinates
    if (navigator.geolocation) {
        console.log('navigator supported by this browser...');

        navigator.geolocation.getCurrentPosition( (position)=> {
            const x = document.querySelector('.location');
            x.textContent = 
                `Latitude: ${position.coords.latitude}°, 
                    Longitude: ${position.coords.longitude}°`;
        });

    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  
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