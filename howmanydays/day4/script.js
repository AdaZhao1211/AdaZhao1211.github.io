var col;
var np = 300;
function setup(){
  createCanvas(600, 600);
  col = Math.random()*360;
  background(255, 255, 255);
  noiseSeed(Math.random()*100);
  noFill();
}
function draw(){
  beginShape();
  var posx = width/2;
  var posy = height - frameCount;
  var sx, sy;
  for(var i = 0; i < np; i++){
    var theta = map(i, 0, np, 0, TWO_PI);
    var xx = frameCount*cos(theta)/2;
    var yy = frameCount*sin(theta)/2;
    var v = createVector(xx, yy);
		xx = (xx + posy) / 150; yy = (yy + posy) / 150;
		v.mult(1+1.5 * noise(xx, yy));
		vertex(posx + v.x, posy + v.y);
    if(i == 0) {
			sx = posx + v.x;
			sy = posy + v.y;
		}
  }
  colorMode(HSB);
	var hue = frameCount%360;
	stroke(hue, 50, 100, 80);
	strokeWeight(0.1);
  vertex(sx, sy);
  endShape();
  if(frameCount > 600){
    noLoop();
  }
}
function keyPressed(){
  console.log(frameCount);
}
