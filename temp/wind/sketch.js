var api_key = '5ca92dceefd25032d317c6e460c1f71a';
var thisInput;
var windSpeed;
var windDegree;
var city;
var num = 3;
var Bobs = new Array(num);
var Springs= new Array(num-1);
var ball;
var g = 0.01;
var start = false;
var pin;
function preload(){
  city = "New York";
  //pin???
  pin = loadImage("pin.svg");
  thisInput = createInput();

  thisInput.value("New York");

  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key,
    type: 'GET',
    dataType: 'json',
    success: function(result){
      temp = result.wind;
      windSpeed = temp.speed;
      windDegree = temp.deg;
      console.log(windSpeed);
      console.log(windDegree);
      start = true;
    },
    error: function (err) {
      console.log(err);
    }
  });
}
function setup(){
  createCanvas(800, 600);
  background(210);
  thisInput.position(660, 580);
  thisInput.changed(newText);
  ball = new Bob(30, 200, 200);
  image(pin, 630, 570, 20, 20);
}
function draw(){
  if(start){
    background(210);
    ball.addGravity();
    ball.applyForce(createVector(windSpeed/10000, 0));
    ball.display();
  }

}

function newText(){
  city = thisInput.value();
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key,
    type: 'GET',
    dataType: 'json',
    success: function(result){
      temp = result.wind;
      windSpeed = temp.speed;
      windDegree = temp.deg;
      thisInput.value("");
      console.log(windSpeed);
      console.log(windDegree);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function Bob(m, x, y){
  this.m = m;
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.display = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    ellipse(this.pos.x, this.pos.y, this.m, this.m);
  }
  this.applyForce = function(force){
    this.acc.add(force);
  }
  this.addGravity = function(){
    if(this.pos.y < 580){
      this.acc.add(createVector(0, g));
    }else{
      this.vel.y = 0;
      //?
      this.pos.y = 580;
    }
  }
}

function Spring(b1, b2, k, l){
  this.b1 = b1;
  this.b2 = b2;
  this.k = k;
  this.l = l;
  this.display = function(){
    line(this.b1.pos.x, this.b1.pos.y, this.b2.pos.x, this.b2.pos.y);
  }
  this.connect = function(){

  }
}
