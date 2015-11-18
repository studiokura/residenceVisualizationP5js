var cities;
var geomap;
function preload(){
  cities=loadTable("https://www.studiokura.com/p5/cities2.csv","header");
  geomap=loadImage("https://www.studiokura.com/p5/world.png");
}

function setup(){
  createCanvas(600,340);
  fill(255,150);
 noStroke();
}

function draw(){
  background(255);
 // var xoffset=map(mouseX,0,width,-width*3,-width);
 // translate(xoffset,-600);
 // scale(8);
  image(geomap,20,10,600,330);
  for(var i=0; i<cities.getRowCount();i+=1){
    var city = cities.getString(i,"realname");
    var latitude=cities.getNum(i,"lat");
    var longitude=cities.getNum(i,"lng");
    
    fill(255);
    setXY(latitude,longitude,city);
  }
  
}

function setXY(lat,lng,realname){
  var x=map(lng,-180,180,0,width);
  var y=map(lat,90,-90,0,height);
  fill(0);
  ellipse(x,y,3,3);
  //text(realname,x,y);
  

}
