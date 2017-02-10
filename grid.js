// grid.js
// Grid Class for Percolation Demonstration
// mch81
// 2/10/17


function Grid() {

  this.rate;          // percent chance of a block being open
  this.numblocks;     // number of blocks
  this.scl;           // block size
  this.values;        // array for 1s and 0s (zero = empty space)
  this.parents;       // array for parents
  this.percolates;    // bool


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
    this.parents = [this.numblocks*this.numblocks];
    this.percolates = false;

    // Fill array with random 1s and 0s according to rate.
    // Fill parents array with -1
    for(var i=0; i<this.numblocks*this.numblocks; i++) {
      this.values[i] = (random(1)>this.rate);
      this.parents[i] = -1;
    }

    // Show the board.
    this.show();

    // Test for percolation
    this.test();

    // Show result
    percolatesP.html("Percolates: " + this.percolates);
  }


  this.test = function() {
    for (var current=0; current<this.numblocks*this.numblocks; current++) {
      // if cell is open
      if (this.values[current] == 0) {

        // Initialize the cell's parent to be itself.
        this.parents[current] = current;

        // Check the cell above the current cell.
        // If it is a 0, union the two cells.
        var aboveIndex = current-this.numblocks;
        if (aboveIndex >= 0)
          if (this.values[aboveIndex] == 0)
            this.union(current, aboveIndex);

        // Check the cell to the left of current.
        // If it is a 0, union the two cells.
        if(current%this.numblocks != 0){
          var leftIndex = current-1;
          if (this.values[leftIndex] == 0)
            this.union(current, leftIndex);
        }
      }
    }

    // Returns true if the board percolates and false if it does not percolate.
    // Checks the parents of the bottom row of cells to see if the parents are
    // in the top row of cells, meaning a cluster spans from the top row to the
    // bottom row, allowing for percolation. 
    for(var i=0; i<this.numblocks; i++)
      if(this.values[this.numblocks*(this.numblocks-1)+i]==0)
        if(this.find((this.numblocks-1)*this.numblocks + i, this.parents)<this.numblocks)
          this.percolates = true;
  }


  this.union = function() {
    return 1;
  }


  this.find = function() {
    return 1;
  }


  this.updateSliders = function() {
    rateP.html("Rate: " + rateSlider.value() + "%");
    sizeP.html("Width: " + boardSizeSlider.value());
  }
}
