/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

/* globals MediaRecorder */

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

'use strict';

/* globals MediaRecorder */

var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;
var allVideoFiles = [];

var gumVideo = document.querySelector('video#gum');
var recordedVideo = document.querySelector('video#recorded');

var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
// var saveButton = document.querySelector('button#save');
var createVMessage = document.querySelector('button#createVMessage');
var sendInviteVMessage = document.querySelector('button#sendInviteVMessage');
playButton.onclick = play;
recordButton.onclick = toggleRecording;

createVMessage.onclick = blobtobase64;

//getVideosButton.onclick = getFiles;

// window.isSecureContext could be used for Chrome
var isSecureOrigin = location.protocol === 'https:' ||
location.host === 'localhost';
/* if (!isSecureOrigin) {
  alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' +
    '\n\nChanging protocol to HTTPS');
  location.protocol = 'HTTPS';
} */

// Use old-style gUM to avoid requirement to enable the
// Enable experimental Web Platform features flag in Chrome 49

var constraints = {
  audio: true,
  video: true
};

function handleSuccess(stream) {
  console.log('getUserMedia() got stream: ', stream);
  window.stream = stream;
  if (window.URL) {
    gumVideo.src = window.URL.createObjectURL(stream);
  } else {
    gumVideo.src = stream;
  }
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

recordedVideo.addEventListener('error', function(ev) {
  console.error('MediaRecording.recordedMedia.error()');
  alert('Your browser can not play\n\n' + recordedVideo.src
    + '\n\n media clip. event: ' + JSON.stringify(ev));
}, true);

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
}

function toggleRecording() {
  if (recordButton.textContent === 'Start Recording') {
  document.getElementById("gum").style.display = "block";  
  document.getElementById("recorded").style.display = "none";   
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    createVMessage.disabled = false;   
    playButton.disabled = false;
    //saveButton.disabled = false;
  }
}

// The nested try blocks will be simplified when Chrome 47 moves to Stable
function startRecording() {
  recordedBlobs = [];
  var options = {mimeType: 'video/webm;codecs=vp9'};
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.log(options.mimeType + ' is not Supported');
    options = {mimeType: 'video/webm;codecs=vp8'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
      options = {mimeType: 'video/webm'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = {mimeType: ''};
      }
    }
  }
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder: ' + e);
    alert('Exception while creating MediaRecorder: '
      + e + '. mimeType: ' + options.mimeType);
    return;
  }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  //saveButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
  document.getElementById("gum").style.display = "none";  
  document.getElementById("recorded").style.display = "block";    
  recordedVideo.controls = true;
  
  download();
}

function play() {
  var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  
  recordedVideo.src = window.URL.createObjectURL(superBuffer);    
}


function download() {
  var blob = new Blob(recordedBlobs, {type: 'video/webm'});
  console.log('from the download function');    
  console.log(blob);
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  //a.click();
  
    setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}


function postFiles() {
        // getting unique identifier for the file name
        var fileName;
        fileName = generateRandomString();

        // this object is used to allow submitting multiple recorded blobs
        var files = {};

        console.log('in postfiles');
      
       var blob = new Blob(recordedBlobs, {type: 'video/webm'});
       var url = window.URL.createObjectURL(blob);

        files.video = {
            name: fileName + '.' + 'webm',
            type: blob.type,
            size: blob.size,
            url : url,
            bdata: recordedBlobs
        };
        
      console.log(files);
      xhr('/upload', JSON.stringify(files));

    }

 function xhr(url, data) {
        console.log('in xhr')
        console.log(url);
        //console.log(data);
        var xmlhttp = new XMLHttpRequest();
     
        console.log(data);
        var blob = new Blob(recordedBlobs, {type: 'video/webm'});
     
     xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
     alert(xmlhttp.responseText);
      console.log(xmlhttp.responseText);
        }
                
     } 
        xmlhttp.open('POST', url);
        xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xmlhttp.send(recordedBlobs);
}


function getFiles() {
console.log('getting all videos'); 
var xmlhttp = new XMLHttpRequest(); 

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        
        console.log(xmlhttp.responseText);
        allVideoFiles = xmlhttp.responseText;
    
        var href = location.href.substr(0, location.href.lastIndexOf('/') + 1);
        console.log(href);
        
       // recordedVideo.src = window.URL.createObjectURL(superBuffer);
        var i = 0;
        var jsonData = JSON.parse(xmlhttp.responseText);
        var mainCont = document.querySelector('container');    
        
        for (i in jsonData) { 
        console.log(jsonData[i]);
        var newLink = document.createElement('div');
        newLink.id = jsonData[i];
        newLink.innerHTML = '<h2> <a href="' + jsonData[i]+ '">' + jsonData[i] + '</a></h2>';
        document.body.appendChild(newLink);
           
        }
                
    }
}    
xmlhttp.open("GET", '/getAllVideos' ,true);
xmlhttp.send(null);    
    
}


function blobtobase64() {
var reader = new window.FileReader();
var blob = new Blob(recordedBlobs, {type: 'video/webm'}); 
    
    recordButton.disabled = true;
    playButton.disabled = true;
    //saveButton.disabled = true;    

reader.readAsDataURL(blob); 

    
reader.onloadend = function() {
        
        var dataUrl  = reader.result; 
        
        var base64data = dataUrl.split(',')[1]

        
        var request = new XMLHttpRequest();
        
         request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
              writeToCloudinary(request.responseText);
            }

         }
    
        request.open('POST', '/upload', true);
       
    
        var progressBar = document.querySelector('progress');
        progressBar.value = 0;
        progressBar.textContent = progressBar.value;
    
        request.upload.onprogress = function(e) {
        if (e.lengthComputable) {
        progressBar.value = (e.loaded / e.total) * 100;
        progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
        }
        }
        //request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        request.setRequestHeader('Content-Type', 'text/plain');
        request.send(base64data);
    
        
}    

}
             

 function writeToCloudinary(fileToWrite) {
     
    var fName;   
     
        
    var jsonString;
    var i;
    var s;    
    var selectedNames='';

      jsonString = JSON.parse(fileToWrite);
         for (i in jsonString) {
             fName = jsonString[i];
         }     
     
     
     var senderEmailid = document.querySelector('input#sender');
     var videoType = document.querySelector('videoType');
     
    
     var load = {'fName': fName , 'senderEmailid' : senderEmailid.value };
     
        var requestCloud = new XMLHttpRequest();
        console.log('now writing to cloud');
        var progressBar = document.querySelector('progress');
        
        progressBar.value = 1;
        progressBar.textCotent = progressBar.value;
        
        
         
        requestCloud.upload.onprogress = function(e) {
        
        if (e.lengthComputable) {
        progressBar.value = (e.loaded / e.total) * 100;
        progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
        
        }
        }
        
    
          requestCloud.onreadystatechange = function() {
        
            if (requestCloud.readyState == XMLHttpRequest.DONE) {
              alert('Your Video has been saved, will now be sending your invitation!');
            //recordButton.disabled = false;
            
                // sendInviteVMessage.click();
            var jsonData = JSON.parse(requestCloud.responseText) ;   
            angular.element(document.getElementById('container')).scope().sendInviteClick(jsonData.publicId);
            
            
            }

         }
        
        requestCloud.open('post', '/uploadCloud', true);
            // requestCloud.setRequestHeader('Content-Type', 'text/plain');
             requestCloud.setRequestHeader('Content-Type', 'text/plain');
             requestCloud.send(JSON.stringify(load));
              if(requestCloud.readyState == XMLHttpRequest.DONE ) {
                  console.log(requestCloud.responseText);
                  document.querySelector('input#vid').value = requestCloud.responseText 
        }
 
 }
     

// generating random string
    function generateRandomString() {
        if (window.crypto) {
            var a = window.crypto.getRandomValues(new Uint32Array(3)),
                token = '';
            for (var i = 0, l = a.length; i < l; i++) token += a[i].toString(36);
            return token;
        } else {
            return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
        }
    }


