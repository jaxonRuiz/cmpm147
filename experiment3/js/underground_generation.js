// tile_ground = "_"
let tile_floor = "o";
let tile_wall = "l";

function generateBotGrid(numCols, numRows) {
  console.log("generate bot grid");
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(tile_ground);
    }
    grid.push(row);
  }

  for (let i=0; i<random(8,18); i++) {
    room_width = floor(random(4, 10));
    room_height = floor(random(4, 10));
    room_x = floor(random(-numCols, numCols));
    room_y = floor(random(-numRows, numRows));
    grid = generateBlankRoom(grid, room_x, room_y, room_width, room_height);
  }
  // grid = setRoomWalls(grid);

  return grid;
}

function generateBlankRoom(grid, room_x, room_y, room_width, room_height) {
  liveX = floor(map(mouseX, 0, width, -5, 5));
  liveY = floor(map(mouseY, 0, height, -5, 5));
  for (let i = room_y; i<room_y+room_height; i++) {
    for (let j = room_x; j<room_x+room_width; j++) {
      newX = liveX + j;
      newY = liveY + i;
      if (newY < 0 || newX < 0) continue;
      if (newY >= numRows || newX >= numCols) continue;
      grid[newY][newX] = tile_floor;
    }
  }
  return grid;
}

function setRoomWalls(grid) {
  let outsideRoom = true;
  // horizontal check
  for (let i=0; i<numRows; i++) {
    for (let j=0; j<numCols; j++) {
      if (grid[i][j] == tile_floor && outsideRoom) {
        outsideRoom = false;
        grid[i][j] = tile_wall;
      } else if (!outsideRoom && j == numCols-1) {
          grid[i][j] = tile_wall;
          outsideRoom = true;
      } else if (!outsideRoom && grid[i][j+1] == tile_ground){
          grid[i][j] = tile_wall;
          outsideRoom = true;
      }
    }
    if (!outsideRoom) console.log("error in setRoomWalls")
    outsideRoom = true;
  }

  // vertical check
  for (let j=0; j<numCols; j++) {
    for (let i=0; i<numRows; i++) {
      if (grid[i][j] == tile_wall) {
        console.log("hit wall")
        outsideRoom = false;
      }else if (grid[i][j] == tile_floor && outsideRoom) {
        outsideRoom = false;
        grid[i][j] = tile_wall;
      } else if (!outsideRoom && i == numRows-1) {
          // out of bounds
          if (grid[i-1][j] == tile_wall) {
            // to avoid extra walls
            outsideRoom = true
          } else {
            grid[i][j] = tile_wall;
            outsideRoom = true;
          }
      } else if (!outsideRoom && grid[i+1][j] == tile_ground){
        console.log("close room", i, j);
        console.log(numRows, numCols);
          // end of room
          if (grid[i-1][j] == tile_wall) {
            // to avoid extra walls
            outsideRoom = true
          } else {
            grid[i][j] = tile_wall;
            outsideRoom = true;
          }
      }
    }
    if (!outsideRoom) console.log("missed wall in setRoomWalls()")
    outsideRoom = true;
  }
  return grid;
}
    
  
  
function drawBotGrid(grid) {
  // background(128);
  let offset = numRows;
  for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        // base tiles
        switch(grid[i][j]) {
          case tile_ground:
            placeTile(i + offset, j, 10, floor(random(4)));
            break;
          case tile_wall:
            placeTile(i + offset, j, 21, floor(random(21, 25)));
            break;
          case tile_floor:
            placeTile(i + offset, j, 9, floor(random(4)));
            break;
        }
    }
  }
  //autotileFillin(grid, tile_ground, tile_floor, 21, 24);
  autotileFillin(grid, tile_ground, tile_floor, 21, 15, bottom=true);
}