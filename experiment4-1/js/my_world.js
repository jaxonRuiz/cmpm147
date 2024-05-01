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

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 64;
}
function p3_tileHeight() {
  return 32;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {
  let bg_color = color(255, 40, 60)
  background(bg_color)
}

// logic for drawing each individual tile
function p3_drawTile(i, j, cy, cx) {
  noStroke();

  let clickVal = (clicks[i, j] | 0);
  let hash = XXH.h32("tile:" + [i, j] + clickVal, worldSeed)
  if (hash % 4 == 0) {
    fill(20);
  } else {
    fill(20);
  }

  push();

  // tile
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);
  
  let alpha = 255;
  
  // if has been clicked
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    alpha = 100;
  }
  
  colorMode(HSB, 360, 100, 100, 255);
  let baseHue = hashedRandom(hash, 300, 360) //328;
  let baseSaturation = 61.2;
  let baseValue = 94.9;
  
  
  // building
  let bh;
  let baseHeight = hashedRandom(hash, 100, 150);
  let offset = 3//th/hashedRandom(hash, 2,4);
  let rightColor = color(baseHue, 61.2, 83.9)  //(214, 83, 153, alpha);
  let leftColor = color(baseHue-81, 64.6, 32.2)  //(35, 29, 82, alpha);
  let topColor = color(abs(baseHue-325), 53.7, 94.9)  //(242, 119, 122, alpha);
  // let rightColor = color(328, 61.2, 83.9, alpha)  //(214, 83, 153, alpha);
  // let leftColor = color(247, 64.6, 32.2, alpha)  //(35, 29, 82, alpha);
  // let topColor = color(3, 53.7, 94.9)  //(242, 119, 122, alpha);
  
  let distanceFromMouse = sqrt(sq(mouseX-cy) + sq(mouseY-cx));
  let mouseAdjust = map(distanceFromMouse, 0, sqrt(sq(width) + sq(height)), 2, 0.4)
  bh = baseHeight*mouseAdjust;
  
  let heightAdjust = map(mouseY-cx, 0, height, 1.2, 0.8);
  let widthAdjust = map(mouseX-cy, 0, width, 1.3, 0.7);
  

  let newWidth = tw * heightAdjust
  let newHeight = th * heightAdjust
  
  
  // left face
  fill(leftColor);
  beginShape();
  vertex(0, newHeight-offset); // 1
  vertex(0, newHeight-offset-bh); // 2
  vertex(-newWidth+2*offset, -bh); // 3
  vertex(-newWidth+2*offset, 0) // 7
  endShape();
  
  // right face
  fill(rightColor);
  beginShape();
  vertex(0, newHeight-offset); // 1
  vertex(0, newHeight-offset-bh); // 2
  vertex(newWidth-2*offset, -bh); // 5
  vertex(newWidth-2*offset, 0); // 6
  endShape();
  
  // top face;
  fill(topColor);
  beginShape();
  vertex(0, newHeight-offset-bh); // 2
  vertex(-newWidth+2*offset, -bh); // 3
  vertex(0, -bh-newHeight+offset); // 4
  vertex(newWidth-2*offset, -bh) // 5
  endShape();


  pop();
}


// tile that mouse is hovering over
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

}
