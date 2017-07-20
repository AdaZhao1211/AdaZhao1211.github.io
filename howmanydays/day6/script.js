var RISE = 0;
var EXPLODE = 1;
var FALL = 2;
var BOUNCE = 3;
var test;
function setup(){
  createCanvas(400, 400);
  background(0);
  test = new Spark();
}
function draw(){
  background(0);
  test.move();
}
function mousePressed(){
  console.log("launch");
}
class Spark{
  constructor(){
    this.speed = random(2)+1;
    this.top = random(200);
    this.state = RISE;
    this.pos = createVector(200, 400);
    this.velocity = createVector(0, -this.speed);
    var temp = 2*(400-this.top)/this.speed;
    this.acc = createVector(0, this.speed/temp);
    this.stop = false;
    this.num = 0;
  }
  move(){
    if(this.state == EXPLODE) this.state = FALL;
    if(this.velocity.y >= 0 && this.state == RISE){
      this.state = EXPLODE;
    }

    switch(this.state){
      case RISE:
        this.rise();
        break;
      case EXPLODE:
        this.explode();
        break;
      case FALL:
        this.fall();
        break;
      case BOUNCE:
        this.bounce();
        break;
    }
    if(this.state == FALL && this.velocity.y > 1){
      this.acc = createVector(0, -0.01);
      this.state = BOUNCE;
    }
    if(this.state == BOUNCE && this.velocity.y <= 0){
      this.stop = true;
      console.log("stop");
    }
    if(!this.stop) this.draww();
  }
  rise(){
    this.velocity.add(this.acc);
    this.pos.add(this.velocity);
    this.num = 255-Math.abs(this.velocity.y)*10;
  }
  explode(){
    console.log("exlopde");
    var theta = random(TWO_PI);
    this.acc = createVector(sin(theta)*0.5, cos(theta)*0.5);
    this.velocity.add(this.acc);
    this.pos.add(this.velocity);
    this.acc = createVector(0, 0.05);
    this.num = Math.abs(this.velocity.y)*50;
  }
  fall(){
    this.velocity.add(this.acc);
    this.pos.add(this.velocity);
    this.num = 255-Math.abs(this.velocity.y)*10;
  }
  bounce(){
    this.velocity.add(this.acc);
    this.pos.add(this.velocity);
    this.num = Math.abs(this.velocity.y)*50;
  }
  draww(){
    strokeWeight(4);
    console.log(this.num);
    stroke(this.num);
    point(this.pos.x, this.pos.y);
  }
}
