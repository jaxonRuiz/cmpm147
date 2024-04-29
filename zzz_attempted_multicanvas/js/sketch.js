// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

var seedInput = function( p ) {
  p.setup = function() {
    p.createCanvas(0, 0);
    let label = p.createP();
    label.html("World key: ");
    // label.parent("container");

    let input = p.createInput("xyzzy");
    input.parent(label);
    input.input(() => {
      rebuildWorld(input.value());
    });

    p.createP("Arrow keys scroll. Clicking changes tiles.");
    rebuildWorld(input.value());
  }
}

var myp5 = new p5(seedInput, 'text_info');


// save this file as sketch.js
var world1 = function( p ) { // p could be any variable name
  var x = 100; 
  var y = 100;
  var speed = 2.5; 

  p.setup = function() {
    p.createCanvas(400, 200);  
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    x += speed;
    if(x > p.width){
      x = 0; 
    }
    p.ellipse(x,y,50,50);
  }
};
var myp5 = new p5(world1, 'world_canvas_1');

// Sketch Two
var world2 = function( p ) { 
  var x = 100.0; 
  var y = 100; 
  var speed = 3.5; 
  p.setup = function() {
    p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    x += speed; 
    if(x > p.width){
      x = 0; 
    }
    p.ellipse(x,y,50,50);

  };
};
var myp5 = new p5(world2, 'world_canvas_2');

// Sketch Three
var world3 = function( p ) { 
  var x = 100.0; 
  var y = 100; 
  var speed = 4.5; 
  p.setup = function() {
    p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    x += speed; 
    if(x > p.width){
      x = 0; 
    }
    p.ellipse(x,y,50,50);

  };
};
var myp5 = new p5(world3, 'world_canvas_3');

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}