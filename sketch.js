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
  g = new Grid();
  percolatesP = createP();

  

  // Perform initial board generation and show board.
  g.setRate();
  g.setWidth();
  g.update();

  // Set up button
  b = document.createElement("button");
  b.innerHTML = "Generate";
  document.getElementById("form").appendChild(b);
  b.addEventListener ("click", function() {g.update();});
}


function draw() {
  // Does not loop.
  noLoop();
}
