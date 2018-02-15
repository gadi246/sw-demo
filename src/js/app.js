// SW registration
if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./service-worker.js', { scope: './' })
    .then(function(registration) {
      console.log("Service Worker Registered: ", registration);
    })
    .catch(function(err) {
      console.log("Service Worker Failed to Register", err);
    })

}

var API_TOKEN = 'TQLTyERYmbbgg866pPbuX3NSXvQb5V4H9behp2ou';
var root = document.getElementById('root');
initLoader();

// get remote data, fetch API

fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key='+ API_TOKEN)
  .then(function(response) {
   return response.json();
  })
  .then(loadImage)
  .catch(function(err) {
    console.log("Error", err);
  });

// UI stuff, vanilla rocks!!!

function loadImage(data) {
  var image  = new Image();
  image.onload = function () {
    root.innerHTML = '';
    root.appendChild(image);
  };
  image.src = data.photos[3].img_src;
  image.classList.add('targetImage');
}

function initLoader() {
  var loaderItems = new Array(12).fill(1)
    .map(function (value, i) {
      var className = "'sk-circle" + (i + 1) + " sk-circle'";
      return '  <div class=' + className + '></div>\n';
    }).join('');
  root.innerHTML = '<div class="sk-fading-circle">\n' + loaderItems + '</div>';
}
