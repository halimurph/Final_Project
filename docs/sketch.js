var colorInc = 0.5;  // Color change speed
var sat = 100; // saturation max 100
var brt = 70; // brightness max 100
var alph = 15; // alpha max 100
var numbPart = 300; // number of particles
var partStroke = 1; // line width
var angMult = 25; // 0.1 = straighter lines; 25+ = sharp curves
var angTurn = 1; // adjust angle for straight lines (after adjusting angMult)
var zOffInc = 0.0003; // speed of vector changes
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
var hu = 0;
var p = 1;

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  colorMode(HSB,359,100,100,100);
  
  let l = 100;
  let j = 100;
  noStroke();
  fill(50);
background(0);
  
  beginShape();
        for (m = 0; m < PI * 2; m += 0.5) {
          let x = random(width);
          let y = random(height);
          vertex(x, y);
        }
        endShape(CLOSE);

  
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < numbPart; i++) {
    particles[i] = new Particle();
  }
 
}

function draw() {
  if (p>0){
    angMult = map(mouseX, 0, width, 5, 50);  // Adjust angMult dynamically
    for (let particle of particles) {
  particle.maxSpeed = map(mouseY, 0, height, 1, 10);  // Slower at the top, faster at the bottom
}
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff)*angMult+angTurn;  
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;

    zoff += zOffInc;
    
  }
    
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // fr.html(floor(frameRate()));
  hu +=colorInc; if (hu >359){hu=0}
}

  
}
function mouseDragged(){
  stroke(0);
  strokeWeight(50);
  line(pmouseX,pmouseY,mouseX,mouseY);
}