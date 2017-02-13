// grid.js
// Grid Class for Percolation Demonstration
// Mike Hallai
// 2/10/17


function Grid() {

  this.rate;          // percent chance of a block being open
  this.numblocks;     // number of blocks
  this.scl;           // block size
  this.values;        // array for 1s and 0s (zero = empty space)
  this.parents;       // array for parents
  this.percolates;    // bool

  this.colors = [[255,0,0], [0,255,0], [0,0,255], [255,255,0], [0,255,255], 
    [255,0,255], [128,0,0], [128,128,0], [0,128,0], [128,0,128], [0,128,128], 
    [0,0,128], [220,20,60]];
  this.numcolors = this.colors.length;


  this.setRate = function() {
    var value = document.getElementById("rateSlider").value;
    this.rate = value/100;
    document.getElementById("rateP").innerHTML = "Rate: "+value+"%";
  }

  this.setWidth = function() {
    this.numblocks = document.getElementById("widthSlider").value;
    document.getElementById("widthP").innerHTML = "Size: "+this.numblocks;
  }


  // Shows the board.
  this.show = function() {
    background(0);

    // Color each cell in the grid.
    for(var i=0; i<this.numblocks; i++) {
      for(var j=0; j<this.numblocks; j++) {
        var index = i*this.numblocks+j;
        (this.values[index]) ? fill(50) : fill(this.fillcolor(index));
        rect(j*this.scl, i*this.scl, this.scl, this.scl);
      }
    }

    // Show if the grid percolates or not.
    percolatesP.html("Percolates: " + this.percolates);
  }


  // Creates a new board based on slider values.
  this.update = function(rate) {
    // Set up the board scale. 
    this.scl = (boardsize-2)/this.numblocks;
    this.values = [this.numblocks*this.numblocks];
    this.parents = [this.numblocks*this.numblocks];
    this.percolates = false;

    // Fill array with random 1s and 0s according to rate.
    // Fill parents array with -1s.
    for(var i=0; i<this.numblocks*this.numblocks; i++) {
      this.values[i] = (random(1)>this.rate);
      this.parents[i] = -1;
    }

    // Test for percolation.
    this.test();

    // Show the board.
    this.show();
  }


  // Test the board for percolation.
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

    // Checks the parents of the bottom row of cells to see if the parents are
    // in the top row of cells, meaning a cluster spans from the top row to the
    // bottom row, allowing for percolation. 
    for(var i=0; i<this.numblocks; i++){
      var loc = this.numblocks*(this.numblocks-1)+i;
      if(this.values[loc]==0)
        if(this.parents[loc]<this.numblocks)
          this.percolates = true;
    }
  }


  // Merges two clusters.
  this.union = function(a, b) {
    // Find the roots of a and b.
    var aroot = this.rootfind(a);
    var broot = this.rootfind(b);

    // Make the lesser root the parent.
    if (this.parents[aroot] < this.parents[broot])
      this.parents[broot] = aroot;
    else
      this.parents[aroot] = broot;
  }


  // Find the original root of the cluster.
  this.rootfind = function(rroot) {
    var r = rroot;
    while(this.parents[r] != r)
      r = this.parents[r];
    // return the root
    return r;
  }


  // Returns a color based on which cluster a cell belongs to. 
  this.fillcolor = function(cell) {
    var index = cell;
    var r = this.rootfind(index);
    var c = r%this.numcolors;
    return this.colors[c];
  }
}
