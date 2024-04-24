// general tile_gen stuff

/* exported generateGrid, drawGrid */
/* global placeTile */

// tiles:
let tile_ground = "_";


function placeTile(i, j, ti, tj) {
  //switched ti and tj for consistency
    image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * tj, 8 * ti, 8, 8);
  }

function drawBorders() {
    strokeWeight(5);
    line(0, 0, width, 0);
    line(width, 0, width, height);
    
    line(width, height, 0, height);
    
    line(0, height, 0, 0);

    strokeWeight(3);
    // middle line
    line(0, mapHeight, width, mapHeight);
    strokeWeight(1);
}