// sketch.js
// Percolation Demonstration
// Mike Hallai
// 2/10/17


var boardsize = 602;    // board size in pixels
var rateSlider;         // slider to change rate/density of grid
var boardSizeSlider;    // slider to change num of cols and rows
var rateP;              // rate display paragraph
var sizeP;              // size display paragraph
var b;                  // 'generate' button


function setup() {
  // Create canvas, create grid object
  createCanvas(boardsize, boardsize);
  frameRate(20);
  g = new Grid();

  // Show statistics below grid
  rateP = createP();
  rateSlider = createSlider(0,100,50);
  sizeP = createP();
  boardSizeSlider = createSlider(3,100,24);
  percolatesP = createP();

  // Set up button
  b = document.createElement("button");
  b.innerHTML = "Generate";
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(b);
  b.addEventListener ("click", function() {g.update();});

  // Perform initial generation and draw
  background(0);
  g.update();
}


function draw() {
  // Update text value on sliders
  g.updateSliders();
}
