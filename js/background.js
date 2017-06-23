var canvas;
var b;
var radius;
var count;
function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  if(window.innerWidth > window.innerHeight){
    radius = window.innerHeight/3;
  }else{
    radius = window.innerWidth/3;
  }
  canvas.position(0, 0);
  canvas.style('z-index', '-1')
  colorMode(HSB, 100);
  background(0, 0, 100);
  b = new Ball();
  count = 0;
}

function draw(){
  //background(0, 0, 100);
  translate(window.innerWidth/2, window.innerHeight/2);
  b.move();
  b.check();
}

class Ball{
  constructor(){
    this.position = p5.Vector.random2D().mult(radius);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(10);
    this.boarder = radius;
  }
  move(){
    this.position.add(this.velocity);
  }
  check(){
    var dist = this.position.mag();
    if(dist > this.boarder){
      this.position.sub(this.velocity);
      var angle = this.position.heading();
      var vangle = this.velocity.heading();
      this.velocity.mult(-1);
      vangle = angle -vangle;
      this.velocity.rotate(2*vangle);
      var h = (angle+PI)/PI/2*100;
      noStroke()
      fill(30, 80, 100);
      //ellipse(this.position.x, this.position.y, 20, 20);
      this.circles(h);
    }
  }
  circles(h){
    var temp = Math.random() * 100;
    fill(h, 100, 100, (100-temp)/3);
    var xx = this.rr(this.position.x, 10);
    var yy = this.rr(this.position.y, 10);
    temp = map(temp, 0, 100, 0, radius);
    ellipse(xx, yy, temp, temp);
    ellipse(this.rr(xx, 10), yy*(Math.random()+1), temp/5, temp/5);
    count ++;
    if(count > 50) noLoop();
  }
  rr(a, b){
    return a + (Math.random()*b)-b/2;
  }
}
