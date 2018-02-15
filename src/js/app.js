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



// Function to perform HTTP request
var get = function(url) {
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var result = xhr.responseText
                result = JSON.parse(result);
                resolve(result);
            } else {
                reject(xhr);
            }
        }
    };
    
    xhr.open("GET", url, true);
    xhr.send();

  }); 
};

var root = document.getElementById('root');
root.innerHTML = '<div class="sk-fading-circle">\n' +
  '  <div class="sk-circle1 sk-circle"></div>\n' +
  '  <div class="sk-circle2 sk-circle"></div>\n' +
  '  <div class="sk-circle3 sk-circle"></div>\n' +
  '  <div class="sk-circle4 sk-circle"></div>\n' +
  '  <div class="sk-circle5 sk-circle"></div>\n' +
  '  <div class="sk-circle6 sk-circle"></div>\n' +
  '  <div class="sk-circle7 sk-circle"></div>\n' +
  '  <div class="sk-circle8 sk-circle"></div>\n' +
  '  <div class="sk-circle9 sk-circle"></div>\n' +
  '  <div class="sk-circle10 sk-circle"></div>\n' +
  '  <div class="sk-circle11 sk-circle"></div>\n' +
  '  <div class="sk-circle12 sk-circle"></div>\n' +
  '</div>';

get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=TQLTyERYmbbgg866pPbuX3NSXvQb5V4H9behp2ou')
  .then(function(response) {
    var image  = new Image();
    image.onload = function () {
      root.innerHTML = '';
      root.appendChild(image);
    };
    image.src = response.photos[3].img_src;
    image.classList.add('targetImage');
  })
  .catch(function(err) {
    console.log("Error", err);
  })



