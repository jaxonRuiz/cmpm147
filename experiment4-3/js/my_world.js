"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {
  
}

function p3_setup() {
  
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 20;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};
let numClicks = 0;

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  numClicks++;
}

function p3_drawBefore() {}

function p3_drawTile(i, j, cy, cx) {
  //noStroke();
  
  let hash = XXH.h32("tile:" + [i, j], worldSeed)
  // if (hash % 4 == 0) {
  //   fill(240, 200);
  // } else {
  //   fill(255, 200);
  // }
  push();
  
  
  
  // using noise to seed tiles
  let scale = 0.2;
  let v = noise((1000+i)*scale, abs(1000+j)*scale);
  v += noise(i*scale, j*scale)/10;
  let blockHeight = floor(map(v, 0, 1, 1, 6)); // int of number of blocks high it is
  let bh = blockHeight * tw // used to actually draw blocks
  let depthScaler = map(blockHeight, 1, 6, 0.4, 1.5)
  let offset = 0// th/hashedRandom(hash, 2,4);

  
  let distanceFromMouse = sqrt(sq(mouseX-cy) + 1.5*sq(mouseY-(cx-bh)));
  let brightnessAdjust = map(distanceFromMouse, 0, sqrt(sq(width) + sq(height)), 1.2, 0.5)
  let leftColor = color(101*depthScaler, 71*depthScaler*brightnessAdjust*0.8, 47*depthScaler, alpha);
  let rightColor = color(156*depthScaler, 112*depthScaler*brightnessAdjust*0.8, 75*depthScaler, alpha);
  let topColor = color(96*depthScaler, 151*depthScaler*brightnessAdjust*0.9, 58*depthScaler*(1/brightnessAdjust), alpha); 
  
  // left face
  fill(leftColor);
  beginShape();
  vertex(0, th-offset); // 1
  vertex(0, th-offset-bh); // 2
  vertex(-tw+2*offset, -bh); // 3
  vertex(-tw+2*offset, 0) // 7
  endShape();
  
  // right face
  fill(rightColor);
  beginShape();
  vertex(0, th-offset); // 1
  vertex(0, th-offset-bh); // 2
  vertex(tw-2*offset, -bh); // 5
  vertex(tw-2*offset, 0); // 6
  endShape();
  
  // top face;
  fill(topColor);
  beginShape();
  vertex(0, th-offset-bh); // 2
  vertex(-tw+2*offset, -bh); // 3
  vertex(0, -bh-th+offset); // 4
  vertex(tw-2*offset, -bh) // 5
  endShape();
  
  //let freqAdjust = map(distanceFromMouse, 0, sqrt(sq(width) + sq(height)), 2.2, -1)
  // flowers
  if ((hash+numClicks)%8 < 2){
    colorMode(HSB, 360, 100, 100);
    // randomize flower color between warm colors (0, 70) degree hue
    let flowerColor = hashedRandom(hash, 0, 70);
    
    // changing flower size and scale based on height to simulate perspective
    let flowerScale = map(blockHeight, 1, 6, 0.6, 1.2);
    let flowerValue = map(blockHeight, 1, 6, 30, 100)
    
    // randomize flower position
    let flowerX = hashedRandom(hash, -tw/2, tw/2);
    let flowerY = hashedRandom(hash, -th/2, th/2);
    
    // draw flower
    fill(flowerColor, 80, flowerValue);
    ellipse(flowerX, -flowerY-bh, 10*flowerScale, 5*flowerScale);
    colorMode(RGB);
  }
  
  

  // beginShape();
  // vertex(-tw, 0);
  // vertex(0, th);
  // vertex(tw, 0);
  // vertex(0, -th);
  // endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, 0, 10, 10);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
//   stroke(0, 255, 0, 128);

//   beginShape();
//   vertex(-tw, 0);
//   vertex(0, th);
//   vertex(tw, 0);
//   vertex(0, -th);
//   endShape(CLOSE);

//   noStroke();
//   fill(0);
//   text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {
  // colorMode(HSB, 360, 100, 100, 100);
  
  //let distanceFromMouse = sqrt(sq(mouseX-cy) + 1.5*sq(mouseY-cx));
  
  
}
