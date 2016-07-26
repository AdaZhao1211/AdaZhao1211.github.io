var more;
var thecountry;
var total = 9;
function popdata(country){
  thecountry = country;
  $.ajax({
    url: 'http://api.population.io/1.0/population/'+ country +'/today-and-tomorrow/',
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
    start = false;
    var today = Math.floor(result.total_population[0].population / 1000);
    var tom = Math.floor(result.total_population[1].population / 1000);
    more = tom - today;
    console.log(more);
    getdata = true;
  }).fail(function(err){
    console.log(err);
  });
}

var width;
var height;
var start = false;
var getdata = false;
var balls;

function setup(){
  width = windowWidth;
  height = windowHeight;
  var ccc = createCanvas(width, height);
  ccc.parent('pong');
}

function draw(){
  if (start == false){
    if(getdata == true){
      console.log("new");
      balls = new Group();
      var oldSprites = getSprites();
      for(var j = 0; j < oldSprites.length; j++){
        oldSprites[j].remove();
      }
      for(var i = 0; i < more; i++){
        createBall(random(width/4, 3*width/4), random(height/4, 3*height/4), i);
      }
      getdata = false;
      start = true;
    }
  }else{
    clear();
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text("There will be " + more + "K more people in "+thecountry+" tomorrow", width/2, 100);
    balls.bounce(balls);
    for(var i = 0; i < more; i++){
      var obj = balls[i]
      if(obj.position.x < 0 || obj.position.x > width){
        var direction = atan2(obj.velocity.y, -obj.velocity.x);
        direction = degrees(direction);
        obj.setSpeed(random(1, 5), direction)
      }
      if(obj.position.y < 0 || obj.position.y > height){
        var direction = atan2(-obj.velocity.y, obj.velocity.x);
        direction = degrees(direction);
        obj.setSpeed(random(1, 5), direction)
      }
    }
    drawSprites();
  }
}

function createBall(xx, yy, index){
  var a = createSprite(xx, yy);
  var num = index%total
  var img  = loadImage("asset/"+ num +".png");
  a.addImage(img);
  a.setSpeed(random(1, 5), random(360));
  a.rotationSpeed = random(0, 1);
  //a.debug = true;
  a.setCollider("circle", 0, 0, 40);
  balls.add(a);
}

function drawmap(countires){
    //Clone the world map that uses ISO-2 keys
  var countriesByName = $.extend(true, {}, jvm.Map.maps['world_mill_en']);

  countriesByName.paths = {}; //clear the paths

  $.each(jvm.Map.maps['world_mill_en'].paths, function(key, obj){
     //create new path entries, keyed by the country name
     countriesByName.paths[obj.name] = obj;
  });

  //Add this new data map, to be loaded
  $.fn.vectorMap('addMap', 'world_mill_en_byName',countriesByName);
  var vv = {};
  for(var i = 0; i < countries.length; i++){
    vv[countries[i]] = 0;
  }
  var _map = $("#world-map");
  _map.width($(window).width());
  _map.height($(window).height());
  var mapp = new jvm.Map({
    container: _map,
    map: 'world_mill_en_byName',
    series: {
        regions: [{
          scale: ['#86a4d8'],
          attribute: 'fill',
          values: vv,
        }]
    },
    onRegionClick: function(e, code){
      thecountry = code;
      popdata(thecountry);
    },
  });
}

var countries = [];
$(document).ready(function(){
  popdata('China');
  $.ajax({
    url: 'http://api.population.io:80/1.0/countries',
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
    countries = result.countries;
    drawmap(countries);
  }).fail(function(err){
    console.log(err);
  })

})

$( window ).resize(function() {
  width = windowWidth;
  height = windowHeight;
  drawmap();
});
