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
var cCity = [];
var count = [0, 0];
var circleSize = 3;
var ic = 0;
var cityLife = [];

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
  frameRate(3);
  image(geomap, 40, 9, 600 * 2, 340 * 2);
  for (var i = 0; i < cities.getRowCount(); i += 1) {
    for (var j = 0; j < artists.getRowCount(); j += 1) {
      city[i] = cities.getString(i, "realname");
      latitude[i] = cities.getNum(i, "lat");
      longitude[i] = cities.getNum(i, "lng");
      cityLife[j] = 40;
      artist[j] = artists.getString(j, "artist");
      origin[j] = artists.getString(j, "origin_location");
      destination[j] = artists.getString(j, "destination_location");
      artistCountry[j] = artists.getString(j, "country");

      if (city[i] == origin[j]) {
        originX[j] = cities.getNum(i, "lat");
        originY[j] = cities.getNum(i, "lng");
      }
      if (city[i] == destination[j]) {
        destinationX[j] = cities.getNum(i, "lat");
        destinationY[j] = cities.getNum(i, "lng");
      }

      // arcSetXY(originX[j], originY[j], destinationX[j], destinationY[j])

    }
    // setXY(latitude[i], longitude[i], city[i]);

  }
  /* for (var k = 0; k < artists.getRowCount(); k += 1) {
    artistCountry[k] = artists.getString(k, "country");
    
  }
*/
  for (var l = 0; l < countryName.getRowCount(); l += 1) {
    country[l] = countryName.getString(l, "country");
    cC[l] = 0;
    //countries(country[l], l, cC[l]);
    fill(0);
    text(country[l], 10, 400 + (l * 10));
    text(cC[l], 100, 400 + (l * 10));
  }
}

function mouseClicked() {
  // ic+=1;
}


function draw() {
  fill(255);
  rect(0, 0, 30, 200);
  ic += 1;
   if(ic>=artists.getRowCount()){
    ic=0;
     background(255);
     image(geomap, 40, 9, 600 * 2, 340 * 2);
     for (var l = 0; l < countryName.getRowCount(); l += 1) {
     cC[l]=0;
     }
  }
  fill(0);
  text(ic, 10, 10);
  text(cityLife[1], 20, 100);
  /*for (var i = 0; i < cities.getRowCount(); i += 1) {
   print(country[i]);
  }
  */
  //println(country[2]);

  arcSetXY(originX[ic], originY[ic], destinationX[ic], destinationY[ic])
  setXY(originX[ic], originY[ic], origin[ic]);
  fill(255);
  rect(0, 300, 300, 400);
  for (var l = 0; l < countryName.getRowCount(); l += 1) {
    // for (var j = 0; j < artists.getRowCount(); j += 1) {
    fill(0);
    text(country[l], 10, 400 + (l * 10));
    text(cC[l], 100, 400 + (l * 10));
    fill(100,60);
    rect(100, 390 + (l * 10), cC[l], 8);
   
    if (country[l] == artistCountry[ic]) {
      cC[l] += 1;
    }

  }

  //}
}

function setXY(lat, lng, realname) {
  var x = map(lng, -180, 180, 0, width);
  var y = map(lat, 90, -90, 0, height);
  fill(0, 50);
  noStroke();
  ellipse(x, y, circleSize, circleSize);
  fill(0, 50);

  text(realname, x, y);
}

function getCircle(lat, lng) {
  x = lat;
  y = lng;
  var d = dist(mouseX, mouseY, x, y);
  if (d < circleSize && mousePressed) {
    circleSize(199);
  }
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
      counter += 1;
    }
  }
  text(counter, 110, 370 + (13 * y));
}
