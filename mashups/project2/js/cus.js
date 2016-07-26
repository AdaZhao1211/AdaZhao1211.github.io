$(document).ready(function(){
	$.ajax({
		url: 'http://api.population.io/1.0/population/United%20States/today-and-tomorrow/',
		dataType: 'json',
		type: 'GET',
	}).done(function(result){
		console.log(result.total_population[0].population);
		console.log(result.total_population[1].population);
	}).fail(function(err){
		console.log(err);
	});
})

var x = 0;
var y = 0;
var z = 0;
var width;
var height;
function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
	width = windowWidth;
	height = windowHeight;
}


function draw(){
	camera(0, 0, 0);
  background(0);
	translate(0, 0, -500);
	box(width, height, 500);
	translate(-width, 0, 500);
	box(width, height, 500);
	translate(2*width, 0, 0);
	box(width, height, 500);
	translate(-width, height, 0);
	box(width, height, 500);
	translate(0, -2*height, 0);
	box(width, height, 500);
	translate(0, height, 0);


  ambientLight(50);
  //directionalLight(255,, 0, 0.25, 0.25, 0.25);
  //directionalLight(255,255, 255, -0.8, 0.8, 0);
  pointLight(250, 250, 250, -0.8, 0.8, 0);

	x --;
	y --;
	z --;
  translate(x, y, z);
  ambientMaterial(250);
  sphere();


	translate(-500, 0, -100);
	var ball = sphere();
	translate(-100, 0, -200);
	sphere();
}
