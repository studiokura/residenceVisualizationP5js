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
// country + cC で一組のJSONを作って、配列になっています
var countryObj = [];
var year = [];
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

var cS=1;
var svg;
function preload() {
  cities = loadTable("https://www.studiokura.com/p5/cities1.csv", "header");
  artists = loadTable("https://www.studiokura.com/p5/artists.csv", "header");
  countryName = loadTable("https://www.studiokura.com/p5/country.csv", "header")
  geomap = loadImage("https://www.studiokura.com/p5/world.png");
  svg = loadImage("https://www.studiokura.com/p5/BlankMap.svg");
}

function setup() {
 createCanvas(600 * cS, 340 * cS);
  background(255);
  fill(255, 150);
  noStroke();
  frameRate(3);
  image(svg, 36/2, 6/2, 600 * cS, 340 * cS);
  
  for (var i = 0; i < cities.getRowCount(); i += 1) {
    for (var j = 0; j < artists.getRowCount(); j += 1) {
      city[i] = cities.getString(i, "realname");
      latitude[i] = cities.getNum(i, "lat");
      longitude[i] = cities.getNum(i, "lng");
      cityLife[j] = 200;
      artist[j] = artists.getString(j, "artist");
      origin[j] = artists.getString(j, "origin_location");
      destination[j] = artists.getString(j, "destination_location");
      artistCountry[j] = artists.getString(j, "country");
      year[j] = artists.getString(j, "year");
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
  for (var l = 0; l < countryName.getRowCount(); l += 1) {
    country[l] = countryName.getString(l, "country");
    cC[l] = 0;
    //以上をJSON配列にも追加します
    countryObj[l] = {
      "country": country[l],
      "cC": cC[l]
    };
    //countries(country[l], l, cC[l]);
    fill(0);
    text(country[l], 10, 400 + (l * 10));
    text(cC[l], 100, 400 + (l * 10));
  }
}



function draw() {

  ic += 1;
  if (ic >= artists.getRowCount()) {
    ic = 0;
    background(255);
   // image(geomap, 40/2, 9/2, 600 * cS, 340 * cS);
    
    image(svg, 36/2, 6/2, 600 * cS, 340 * cS);
    for (var l = 0; l < countryName.getRowCount(); l += 1) {
      cC[l] = 0;
      countryObj[l].cC = 0;
    }
  }
  fill(255);
  rect(0, 0, 60, 20);
  fill(0);
  text(year[ic], 10, 10);
  arcSetXY(originX[ic], originY[ic], destinationX[ic], destinationY[ic]);
  for (var i = 0; i < artist.length; i += 1) {
    distXY(originX[i], originY[i], origin[i]);
  }

  fill(255);
  rect(0, 90, 110, 500);
  textSize(4);
  //countryObjをJSONの内容によって並べ替えるのに使う関数
  function compareObj (a, b) {
    //cCは多いものが先
    if (a.cC < b.cC) {
      return 1;
    }
    if (a.cC > b.cC) {
      return -1;
    }
    //country名はabc順で
    if (a.country < b.country) {
      return -1;
    }
    if (a.country > b.country) {
      return 1;
    }
    return 0;
  }
  //countryObjを並べ替えます
  countryObj.sort(compareObj);
  for (var l = 0; l < countryName.getRowCount(); l += 1) {
    fill(0);
    //誰も来ていない国
    if(countryObj[l].cC>0){
      //text(country[l], 10, 100 + (l * 10));
      text(countryObj[l].country, 10, 100 + (l * 10));
      //text(cC[l], 100, 100 + (l * 10));
      var textX = 100;
      if(countryObj[l].cC >= 10) {
        textX = textX - 7;
      }
      text(countryObj[l].cC, textX, 100 + (l * 10));

    }

    if (country[l] == artistCountry[ic]) {
      cC[l] += 1;
    }
    if (countryObj[l].country == artistCountry[ic]) {
      countryObj[l].cC += 1;
    }

  }


}

function reset(){
  
}


function distXY(lat, lng, realname) {
  var x = map(lng, -180, 180, 0, width);
  var y = map(lat, 90, -90, 0, height);
  var d = dist(mouseX, mouseY, x, y);
  if (d < circleSize*1.5 && mouseIsPressed) {
    fill(0);
    text(realname, x, y);
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
  fill(0, 30);
  noStroke();

  ellipse(x, y, circleSize, circleSize);
  ellipse(x2, y2, circleSize, circleSize);
}


function countries(name, y, counter) {
  fill(0);
  text(name, 20, 370 + (13 * y));

  for (var i = 0; i < artists.getRowCount(); i += 1) {
    if (name == artistCountry[i]) {
      counter += 1;
    }
  }
  text(counter, 100, 370 + (13 * y));
}
