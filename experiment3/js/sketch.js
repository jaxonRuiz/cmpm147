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

let seed = 0;
let tilesetImage;
let currentGridTop = [];
let currentGridBot = [];
let numRows, numCols;
let mapWidth, mapHeight;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  // resizeCanvas(canvasContainer.width(), canvasContainer.height());


  numCols = floor(canvasContainer.width() / 2 / 16); //Math.floor(canvasContainer.width()/55);
  numRows = floor(canvasContainer.height() / 2 / 16); //Math.floor(canvasContainer.height()/30);
  mapWidth = numCols * 16;
  mapHeight = numRows * 16//canvasContainer.height() / 2;
  
  console.log("canvas container: ", canvasContainer.width(), canvasContainer.height())
  resizeCanvas(mapWidth, mapHeight * 2); // multiply height by 2 to account for 2nd map

  resizeAsciiBox();
  regenerateGrids();
  // redrawCanvas(); // Redraw everything based on new size
}

// helper functions from glitch.com


function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 42;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrids();
}

function regenerateGrids() {
  select("#asciiBoxTop").value(gridToString(generateTopGrid(numCols, numRows)));
  select("#asciiBoxBot").value(gridToString(generateBotGrid(numCols, numRows)));
  reparseGrids();
}

function reparseGrids() {
  currentGridTop = stringToGrid(select("#asciiBoxTop").value());
  currentGridBot = stringToGrid(select("#asciiBoxBot").value());
}
function reparseTopGrid() {
  currentGridTop = stringToGrid(select("#asciiBoxTop").value());
}

function reparseBotGrid() {
  currentGridBot = stringToGrid(select("#asciiBoxBot").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}
function resizeAsciiBox() {
  //numCols = 20;
  //numRows = 20;
  // numCols = Math.floor(canvasContainer.width()/55);
  // numRows = Math.floor(canvasContainer.height()/30);
  console.log("resize map to: ", numCols, numRows);
  
  // sets asciibox to size of map canvas
  $(".asciiBox").height(($('canvas').height() - parseInt($(".asciiBox").css("padding"))*2) / 2 );
  $(".asciiBox").width($('canvas').width() - parseInt($(".asciiBox").css("padding"))*2);
}
// end glitch.com helper functions 


// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  
  numCols = Math.floor(canvasContainer.width()/55);
  numRows = Math.floor(canvasContainer.height()/30);

  // canvas for the generated map
  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  resizeScreen();
  reseed();
  
  select("#reseedButton").mousePressed(reseed);
  select("#asciiBoxTop").input(reparseTopGrid);
  select("#asciiBoxBot").input(reparseBotGrid);

  
  // resize canvas if the page is resized
  $(window).resize(function() {
    resizeScreen();
  });



}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);    

  // copied glitch.com code
  randomSeed(seed);
  regenerateGrids();
  drawTopGrid(currentGridTop);
  drawBotGrid(currentGridBot);
  drawBorders();
  
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}