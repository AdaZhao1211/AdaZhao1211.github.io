var cs;
var first = [[0, 1, 1, 1, 0],
             [0, 0, 0, 1, 0],
             [0, 0, 1, 1, 0],
             [0, 0, 0, 0, 0],
             [0, 0, 1, 0, 0]]
var second = [[0, 0, 1, 0, 0],
              [1, 0, 1, 1, 0],
              [1, 1, 1, 1, 1],
              [1, 0, 1, 1, 0],
              [0, 0, 1, 0, 0]]
var dic = {0: first, 1:second}
var diclength = 2;
function preload() {
}
function setup() {
  createCanvas(400, 400);
  cs = new cubee();
  cs.nextstate();
}

function draw() {
  background(255);
  for(var i = 0; i < 25; i++){
    var c = cs.s[i];
    c.move();
    c.drawcube();
  }
}

class cube{
  constructor(w, h, x){
    this.target = createVector(w, h);
    this.x = x;
    this.current = createVector(Math.floor((Math.random() * 400)),Math.floor((Math.random() * 400)));
  }
  move(){
    this.velocity = createVector(this.target.x - this.current.x, this.target.y - this.current.y).limit(10);
    this.current.add(this.velocity);
  }
  drawcube(){
    fill(0);
    rect(this.current.x, this.current.y, this.x, this.x);
  }

}
function keyPressed(){
  cs.nextstate();
}
class cubee{
  constructor(){
    this.s = [];
    for(var i = 0; i < 25; i++){
      this.s.push(new cube(0, 0, 80));
    }
    this.state = 0;
  }
  nextstate(){
    var temp = dic[this.state];
    var xindex = [];
    var yindex = [];
    var total = 0;
    for(var y = 0; y < 5; y++){
      for(var x = 0; x < 5; x++){
        if(temp[y][x]==1){
          xindex.push(x);
          yindex.push(y);
          this.s[total] = new cube(x*80, y*80, 80);
          total ++;
        }
      }
    }
    for(var i = total; i < 25; i++){
      var ind = Math.floor((Math.random() * total));
      this.s[i] = new cube(xindex[ind]*80, yindex[ind]*80, 80);
    }
    this.state++;
    if(this.state == diclength) this.state = 0;
    //console.log(this.state);

  }
}
