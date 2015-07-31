$('#scanit').click(initVideoCapture);

function initVideoCapture() {

var video = document.getElementById('webcam');
var canvas = document.getElementById('capture');
var preview = document.getElementById('preview');

var ctx = canvas.getContext('2d');
var localMediaStream = null;

function snapshot() {
 if (localMediaStream) {
   ctx.drawImage(video, 0, 0);
   // "image/webp" works in Chrome.
   // Other browsers will fall back to image/png.
   preview.src = canvas.toDataURL('image/webp');
   preview.style.display = "";
   video.style.display = "none";
 }
}

function resett() {
  preview.style.display = "none";
  video.style.display = "";
}

video.addEventListener('click', snapshot, false);
preview.addEventListener('click', resett, false);

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var errorCallback = function(e) {
  console.log('Oops!', e);
};

// Not showing vendor prefixes or code that works cross-browser.
navigator.getUserMedia({video: true}, function(stream) {
 video.src = window.URL.createObjectURL(stream);
 localMediaStream = stream;
}, errorCallback);

}