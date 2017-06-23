
var b;
function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 100);
  background(0, 0, 100);
  b = new Ball();

}

function draw(){
  //background(0, 0, 100);
  translate(200, 200);
  b.move();
  b.check();
}

function keyPressed(){
  //translate(200, 200);
  fill(0, 0, 100);
  ellipse(0, 0, 220, 220);
  console.log("keypressed");
  noLoop();
}
class Ball{
  constructor(){
    this.position = createVector((Math.random() * 200)-100, (Math.random() * 200)-100);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(5);
    this.boarder = 100;
    colorMode(HSB, 100);
    this.color = color(0, 0, 80);
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
    }else{
      noStroke();
      fill(30, 10, 30);
      //ellipse(this.position.x, this.position.y, 20, 20);
    }
  }
  circles(h){
    var temp = Math.random() * 200;
    fill(h, 100, 100, (100-temp/2)/3);
    var xx = this.rr(this.position.x, 10);
    var yy = this.rr(this.position.y, 10);
    ellipse(xx, yy, temp, temp);
    ellipse(this.rr(xx, 10), yy*(Math.random()+1), temp/5, temp/5);

  }
  rr(a, b){
    return a + (Math.random()*b)-b/2;
  }
}
