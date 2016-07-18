var formData;
function getFaceData(img){
	//console.log(img);

	var baseUrl = 'http://apicn.faceplusplus.com/v2/detection/detect?api_key=f86294cf8a8dbaaa17d34cc01c9e4a7f&api_secret=fCDagfl9sT5KuaTpKeofkez7KD4XEzxV';
	var attribute = '&attribute=age';

	var resulturl = baseUrl + attribute;

	//Make the blob
	var theBlob = window.dataURLtoBlob(img.src);

	//Make a form and attach the blob
	formData = new FormData();
	formData.append("filename", "my-image.png");
	formData.append("img", theBlob);


	//Post the data
	$.ajax({
		url: resulturl,
		type: 'POST',
		dataType: 'json',
		data: formData,
		processData: false,
		contentType: false,
		success: function(result){
			$("#info").empty();
			result = result.face[0].attribute
			var age = result.age.value
			var range = result.age.range
			var markup = '<p>Your Age: ' + (age-range/2) + '~' + (age+range/2) +'</p>'
			console.log("?");
			$("#info").append(markup)
		},
		error: function (err) {
			console.log(err);
    }
	});
}

window.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: ", error.code);
		};

	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}

	document.getElementById("snap").addEventListener("click", function() {
		context.drawImage(video, 0, 0, 400, 300);
		var img = new Image();
		img.src = canvas.toDataURL("image/png");
		getFaceData(img);
  });
}, false);

$(document).ready(function(){
	$("#flickr").click(function(){
		console.log("clicked");
		$.ajax({
			url: 'https://up.flickr.com/services/upload/',
			type: 'POST',
			dataType: 'json',
			data: formData,
			processData: false,
			contentType: false,
		}).done(function(){
			console.log('yeah');
		}).fail(function(err){
			console.log(err);
		});
	})
})
