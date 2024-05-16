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

function p3_setup() {
  background(255)
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 40;
}
function p3_tileHeight() {
  return 32;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let score = 0;
let num_misses = 0;
let clicks = {};
let clearedTiles = {}
let selectedTiles = {}
let openTile1 = {color: undefined, i:undefined, j:undefined}
let openTile2 = {color: undefined, i:undefined, j:undefined}
let reveal_tiles = false;
let waveOffset = 0;

function p3_tileClicked(i, j) {
  let key = [i, j];  
  
  if (reveal_tiles) {
    return; 
  }
  
  // skip if tile already cleared
  if (clearedTiles[key] == 1) {
    return;
  }
  
  selectedTiles[key] = 1 + (selectedTiles[key] | 0);
  let st = (selectedTiles[key] | 0);
  
  
  if (st%2 == 1) { // if tile is now selected
    // get color of selected tile
    let hash = XXH.h32("tile:" + [i, j], worldSeed);
    colorMode(HSB, 360, 100, 100);
    let selectedColor = getHue(i, j);
      
    
    if (openTile1.color == undefined) {// if no tile is currently selected
      openTile1.color = selectedColor;
      openTile1.i = i;
      openTile1.j = j;
    } else if (openTile2.color == undefined) { // if only 1 tile is selected
      
      Object.assign(openTile2, openTile1);
      
      openTile1.color = selectedColor;
      openTile1.i = i;
      openTile1.j = j;
    } else { // 2 tiles already selected
      
      // deselect oldest tile
      let deselectedKey = [openTile2.i, openTile2.j];
      selectedTiles[deselectedKey] = 1 + (selectedTiles[deselectedKey] | 0);
      
      // overwrite openTile2 with openTile1
      Object.assign(openTile2, openTile1)
      
      // saving new tile info
      openTile1.color = selectedColor;
      openTile1.i = i;
      openTile1.j = j;
    }
    
    // if matching pair found
    if (openTile1.color == openTile2.color) {
      let tile1key = [openTile1.i, openTile1.j];
      let tile2key = [openTile2.i, openTile2.j];
      
      score++;
      // maybe screen effect
      clearedTiles[tile1key] = 1;
      clearedTiles[tile2key] = 1;
      
      // deselecting both tiles
      openTile1.color = undefined;
      openTile1.i = undefined;
      openTile1.j = undefined;
      openTile2.color = undefined;
      openTile2.i = undefined;
      openTile2.j = undefined;
      
      selectedTiles[tile1key]++;
      selectedTiles[tile2key]++;
    } else {
      if (openTile1.color != undefined && openTile2.color != undefined) {
        num_misses++;          
      }
    }
    
    
    colorMode(RGB);
  } else { // when a tile is deselected
    if (openTile1.i == i && openTile1.j == j) {
      // clear openTile1
      if (openTile2.color == undefined) {
        openTile1.color = undefined;
        openTile1.i = undefined;
        openTile1.j = undefined;
      } else {
        // reassign tile2 to tile 1
        Object.assign(openTile1, openTile2);
        // clearing openTile2
        openTile2.color = undefined;
        openTile2.i = undefined;
        openTile2.j = undefined;
      }
    } else if (openTile2.i == i && openTile2.j == j) {
      
      openTile2.color = undefined;
      openTile2.i = undefined;
      openTile2.j = undefined;
    } else {
      console.log("!!! error deselecting colors");
    }
  }
  // console.log("openTile1", openTile1);
  // console.log("openTile2", openTile2);
  // console.log("selectedTiles", selectedTiles);
}
let timer;

function p3_drawBefore() {
  // shift key to reveal
  if (keyIsDown(16)) { 
    if (!reveal_tiles) {
      score--;
      timer = millis();
    }
    if (timer+1100 < millis()) { // technically get 1.1 second, but it felt better
      score--;
      timer = millis();
    }
    reveal_tiles = true;
  } else {
    reveal_tiles = false;
  }
}

let testRand = {};

function getHue(i, j) {
  let hash = XXH.h32("tile:" + [i, j], worldSeed);
  let hue = map(hash%12, 0, 12, 0, 360);

  // manually reshuffling hues 150 and 90, which both look WAY too similar to 120
  if (hue == 150) {
    let hueOffset = floor(hashedRandom(hash +abs(i*j), -1, 10)) * 30;
    if (hueOffset == 0) hueOffset = -30;
    hue = hue + hueOffset;
    if (hue >=360) hue -=360;
  }
  if (hue == 90) {
    let hueOffset = floor(hashedRandom(hash +abs(i*j), -1, 10)) * 30;
    if (hueOffset == 0) hueOffset = -30;
    hue = hue - hueOffset;
    if (hue < 0) hue += 360;
  }

  return hue;
}

function p3_drawTile(i, j, selected=false) {
  // noStroke();
  push();
  let hash = XXH.h32("tile:" + [i, j], worldSeed);
  colorMode(HSB, 360, 100, 100);
  
  let noiseScaler = 1
  let hue = getHue(i, j);

  // let backAngleX = frameCount * 0.007 //map(noise(0.007 * frameCount), 0, 1, -1, 1);
  // let backAngleY = frameCount * 0.005 //map(noise(0.002 * frameCount + 5000), 0, 1, -1, 1);

  let v = noise(i*noiseScaler, j*noiseScaler);
  let backHue = abs((i*4)+(j))*10%360 //map(v, 0, 1, 0, 360);
  
  let st = selectedTiles[[i, j]] | 0;
  let ct = clearedTiles[[i, j]] | 0;
  
  // draw selected tiles
  if (st % 2 == 1) {
    fill(hue, 100, 100);
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);
    
    fill(hue, 70, 70);
    // draw volume (left)
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(0, th+tw);
    vertex(-tw, tw);
    endShape(CLOSE);
    
    // draw volume (right)
    beginShape();
    vertex(tw, 0);
    vertex(0, th);
    vertex(0, th+tw);
    vertex(tw, tw);
    endShape(CLOSE);
  }
  // draw cleared tiles
  else if (ct % 2 == 1) {
    fill(hue, 10, 10);
    noStroke();
    ellipse(0, th, tw, th/2);
    translate(0, -10);
    stroke(0);
    fill(hue, 100, 100);
    ellipse(0, th, tw, th);
  }
  else if (reveal_tiles) {
    fill(hue, 70, 80);
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);
    
    fill(hue, 65, 50);
    // draw volume (left)
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(0, th+tw);
    vertex(-tw, tw);
    endShape(CLOSE);
    
    // draw volume (right)
    beginShape();
    vertex(tw, 0);
    vertex(0, th);
    vertex(0, th+tw);
    vertex(tw, tw);
    endShape(CLOSE);
  }
  else {
    // draw unopened tile
    fill(backHue, 30, 50);
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);

    fill(backHue, 50, 20);
    // draw volume (left)
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(0, th+tw);
    vertex(-tw, tw);
    endShape(CLOSE);
    
    // draw volume (right)
    beginShape();
    vertex(tw, 0);
    vertex(0, th);
    vertex(0, th+tw);
    vertex(tw, tw);
    endShape(CLOSE);
  }
  colorMode(RGB);
  pop();
}

function p3_drawSelectedTile(i, j) {
  push();
  key = [i, j]
  if (clearedTiles[key] == 1) {
    // decided it didnt look super good
    // noFill();
    // stroke(255);
    // strokeWeight(4);
    // translate(0, -10);
    // ellipse(0, th, tw, th);
  } else {
    stroke(255);
    strokeWeight(4)
    noFill()
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);
  }
  pop();

  //p3_drawTile(i, j, true)
  
  
  //noStroke();
  stroke(0);
  strokeWeight(5)
  fill(255);

  let hue = getHue(i, j);
  textSize(18);
  text("hue " + hue, 0, 0);

  // text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {
  push();
  fill(255);
  stroke(255);
  textSize(40);
  text("Score: " + score, 0, 30);
  text("Misses: " + num_misses, 0, 70);
  pop();
}