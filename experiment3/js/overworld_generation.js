// tile_ground = "_"
tile_water = "~"
tile_dirt = "-"
tile_grass = "M"
tile_forest = "T"

function generateTopGrid(numCols, numRows) {
  console.log("generate top grid");
    let grid = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        tile = applyNoise(i, j);
        row.push(tile);
      }
      grid.push(row);
    }


    return grid;
  }

function applyNoise(i, j, scale = 0.1) {
  v = noise((liveY + i)*scale, (liveX + j)*scale);
  //tile_type = "water";
  if(v < 0.3){
    //water
    return tile_water;
  }
  else if(v < 0.4){
    //sand
    return tile_dirt;
  }
  else if(v <0.7){
    //grass
    return tile_grass
  }
  else{
    //forest
    return tile_forest;
  }
}


function applyNoise(i, j, scale = 0.1) {
  liveX = map(mouseX, 0, width, 0, 10);
  liveY = map(mouseY, 0, height, 0, 10);
  v = noise((liveY + i)*scale, (liveX + j)*scale);
  //tile_type = "water";
  if(v < 0.3){
    //water
    return tile_water;
  }
  else if(v < 0.4){
    //sand
    return tile_dirt;
  }
  else if(v <0.7){
    //grass
    return tile_grass
  }
  else{
    //forest
    return tile_forest;
  }
}

function drawTopGrid(grid) {
  // background(128);
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      
      switch(grid[i][j]) {
        case tile_grass:
          placeTile(i, j, 0, floor(random(4)));
          break;
        case tile_water:
          placeTile(i, j, 13, floor(random(0, 3)));
          break;
        case tile_dirt:
          placeTile(i, j, 3, floor(random(0, 3)));
          break;
        case tile_forest:
          placeTile(i, j, 0, floor(random(4)));
          placeTile(i, j, floor(random(0, 3)), floor(random(15, 17)));
      }
    }
  }
  //autotileFillin(grid, tile_dirt, tile_grass, 0, 4);
  //autotileFillin(grid, tile_water, tile_dirt, 3, 9);
  
}