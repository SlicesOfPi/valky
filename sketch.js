// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/ZjVyKXp9hec

// Keep track of our socket connection
var socket;

var blob;

var blobs = [];

var foods = [];

var zoom = 1;

function setup() {
  createCanvas(600, 600);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://142.161.99.191:2030');


  //blob = new Blob(random(width), random(height), random(8, 24));
  blob = new Blob(1, 1, 3);
  // Make a little object with  and y

  for (var i = 0; i < 1000; i++) {
    var x = random(-width,width);
    var y = random(-height,height);
    foods[i] = new Blob(x, y, 4);
  }

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };
  socket.emit('start', data);

  socket.on('heartbeat',
    function(data) {
      //console.log(data);
      blobs = data;
    }
  );
}

function draw() {
  background(60,60,60);
  //console.log(blob.pos.x, blob.pos.y);
  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);
  //display the food
  for (var i = foods.length-1; i >=0; i--) {
    foods[i].show();
    if (blob.eats(foods[i])) {
      foods.splice(i, 1);
    }
  }

  for (var i = blobs.length - 1; i >= 0; i--) {
    var id = blobs[i].id;
    if (id.substring(2, id.length) !== socket.id) {
      fill(0, 0, 255);
      ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);

      fill(255);
      textAlign(CENTER);
      textSize(4);
      text(blobs[i].id, blobs[i].x, blobs[i].y + blobs[i].r);
    }
  }




  blob.show();
  blob.update();
  blob.constrain();

  var data = {
    x: Math.round(blob.pos.x),
    y: Math.round(blob.pos.y),
    r: Math.round(blob.r)
  };
  socket.emit('update', data);


}
