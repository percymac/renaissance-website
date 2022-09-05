// sidebar menu animation
const closeButton = document.querySelector('.close-btn');
const sidebarMenu = document.querySelector('.sidebar');
const sidebarToggleButton = document.querySelector('.sidebar-toggle');

sidebarToggleButton.addEventListener('click', function () {
  
  console.log("Detected click event side Toggle Button ...");

  if (sidebarMenu.classList.contains('show-sidebar')) {
      sidebarMenu.classList.remove('show-sidebar');
  } else {
      sidebarMenu.classList.add('show-sidebar');
  }
});

closeButton.addEventListener('click', function(){
  sidebarMenu.classList.remove('show-sidebar');
});