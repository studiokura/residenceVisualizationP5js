var cities;
var artists;
var countryName;
var artist = [];
var origin = [];
var originX = [];
var originY = [];
var destinationX = [];
var destinationY = [];
var destination = [];
var country = [];
var geomap;
var city = [];
var latitude = [];
var longitude = [];
var artistCountry = [];
var cC = [];
var count = [0, 0];

function preload() {
  cities = loadTable("https://www.studiokura.com/p5/cities1.csv", "header");
  artists = loadTable("https://www.studiokura.com/p5/artists.csv", "header");
  countryName = loadTable("https://www.studiokura.com/p5/country.csv", "header")
  geomap = loadImage("https://www.studiokura.com/p5/world.png");
}

function setup() {
  createCanvas(600 * 2, 340 * 2);
  background(255);
  fill(255, 150);
  noStroke();
  image(geomap, 40, 9, 600 * 2, 340 * 2);
  for (var i = 0; i < cities.getRowCount(); i += 1) {
    for (var j = 0; j < artists.getRowCount(); j += 1) {
      city[i] = cities.getString(i, "realname");
      latitude[i] = cities.getNum(i, "lat");
      longitude[i] = cities.getNum(i, "lng");

      artist[j] = artists.getString(j, "artist");
      origin[j] = artists.getString(j, "origin_location");
      destination[j] = artists.getString(j, "destination_location");


      if (city[i] == origin[j]) {
        originX[j] = cities.getNum(i, "lat");
        originY[j] = cities.getNum(i, "lng");
      }
      if (city[i] == destination[j]) {
        destinationX[j] = cities.getNum(i, "lat");
        destinationY[j] = cities.getNum(i, "lng");
      }
      arcSetXY(originX[j], originY[j], destinationX[j], destinationY[j])

    }
    setXY(latitude[i], longitude[i], city[i])
  }
  for (var k = 0; k < artists.getRowCount(); k += 1) {
    artistCountry[k] = artists.getString(k, "country");

  }

  for (var l = 0; l < countryName.getRowCount(); l += 1) {
    country[l] = countryName.getString(l, "country");
    cC[l] = 0;
    countries(country[l], l, cC[l]);

  }



  // println(country[l]);

  /*
   for (var l = 0; l < countryName.getRowCount(); l += 1) {
     countryName[l]=countryName.getString(l,"country");
      //println(countryName[l]);
  }
  */
}






function draw() {

}

function setXY(lat, lng, realname) {
  var x = map(lng, -180, 180, 0, width);
  var y = map(lat, 90, -90, 0, height);
  fill(0);
  noStroke();
  ellipse(x, y, 3, 3);

  fill(0, 60);
  text(realname, x, y);
}


function arcSetXY(lat, lng, lat2, lng2) {
  var x = map(lng, -180, 180, 0, width);
  var y = map(lat, 90, -90, 0, height);
  var x2 = map(lng2, -180, 180, 0, width);
  var y2 = map(lat2, 90, -90, 0, height);
  var d = dist(x, y, x2, y2);
  beginShape();
  noFill();
  vertex(x, y);
  stroke(255, 0, 0, 50);
  bezierVertex(x, y - d / 2.1, x2, y2 - d / 2.1, x2, y2);
  endShape();
}


function countries(name, y, counter) {
  fill(0);
  text(name, 20, 370 + (13 * y));
 
  for (var i = 0; i < artists.getRowCount(); i += 1) {
    if (name == artistCountry[i]) {
      counter+=1;
      print(counter);
    }
  }
 text(counter, 110, 370 + (13 * y));
}
