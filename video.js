$('#scanit').click(initVideoCapture);

function initVideoCapture() {

var haveCapture = false;

var video = document.getElementById('webcam');
var canvas = document.getElementById('capture');
var preview = document.getElementById('preview');

var ctx = canvas.getContext('2d');
var localMediaStream = null;

function snapshot() {
 if (localMediaStream) {
   ctx.drawImage(video, 0, 0);
   // Some image processing
   var proc = Caman("#capture", function() {
     this.greyscale()
         .brightness(20)
         .contrast(30)
         .render(function () {
            var image = this.toBase64();
            preview.src = image; // your ajax function

            // Hide the other image
            preview.style.display = "";
            video.style.display = "none";

            haveCapture = true;
          });
   });
 }
}

function resett() {
  preview.style.display = "none";
  video.style.display = "";
}


function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}


$('#sendcard').click(function() {
  if (!haveCapture) {
    alert('Please tap on the preview to freeze the frame');
    return false;
  }

  var data = new FormData();
  data.append('file', dataURItoBlob(preview.src));

  $.ajax('/instructions', {
    method: 'POST',
    cache: false,
    contentType: false,
    processData: false,
    data: data,
    success: function(response) {
      console.log(response);
    }
  });
});

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
