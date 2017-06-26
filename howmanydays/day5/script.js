var total = 8;
var ts = [];
var accs = [];
var speed = 0.03;
function setup(){
  createCanvas(400, 400);
  for(var i = 0; i< total; i++){
    ts[i] = PI/total*i;
    accs[i] = speed;
  }


}
function draw(){
  background(210);
  noFill();
  strokeWeight(5);
  colorMode(HSB);
  for(var i = 0; i< total; i++){
    var col = map(ts[i], 0, PI, 0, 360);
    stroke(col, 50, 100);
    arc(200, 300, i*30, i*30, PI, PI+ts[i]);
    ts[i]+=accs[i];
    if(ts[i]> PI || ts[i]<0){
      ts[i]-=accs[i];
      accs[i]*= -1
    }
  }

}
