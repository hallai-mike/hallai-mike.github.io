// grid.js
// Grid Class for Percolation Demonstration
// mch81
// 2/10/17


function Grid() {

  this.rate;          // percent chance of a block being open
  this.numblocks;     // number of blocks
  this.scl;           // block size
  this.values;        // array for 1s and 0s (zero = empty space)


  this.show = function() {
    background(255);
    for(var i=0; i<this.numblocks; i++)
    {
      for(var j=0; j<this.numblocks; j++)
      {
        (this.values[i*this.numblocks+j]) ? fill(50) : fill(255);
        rect(i*this.scl, j*this.scl, this.scl, this.scl);
      }
    }
    this.updateSliders();
  }


  this.update = function() {
    // Get input values from sliders. 
    this.numblocks = boardSizeSlider.value()
    this.rate = (rateSlider.value()/100.0);
    this.scl = floor((boardsize-2)/this.numblocks);
    this.values = [this.numblocks*this.numblocks];

    // Fill array with random 1s and 0s according to rate.
    for(var i=0; i<this.numblocks*this.numblocks; i++) {
      this.values[i]= (random(1)>this.rate);
    }

    // Show the board.
    this.show();
  }


  this.updateSliders = function() {
    rateP.html("Rate: " + rateSlider.value() + "%");
    sizeP.html("Width: " + boardSizeSlider.value());
  }
}
