
// checks if tile at (i, j) is target, returns true. else returns false
// changed function name for own clarity
function checkTile(grid, i, j, target) {
  if (i < 0 || j < 0) return false;
  if (i >= numRows || j >= numCols) return false;
  if (grid[i][j] == target) {
    return true;
  }
  return false
}

// returns bit code, based on if tile[i][j] has neighbors of target
function neighborCode(grid, i, j, target) {
  let code = 0;
  // code order is in: north, east, south, west 
  if (checkTile(grid, i-1, j, target)) code += (1<<3) // north
  if (checkTile(grid, i, j+1, target)) code += (1<<2) // east
  if (checkTile(grid, i+1, j, target)) {
    code += (1<<1) // south
    // console.log("south found");
  }
    if (checkTile(grid, i, j-1, target)) code += (1<<0) // west

  return code;
}

// i, j points to origin, target is the tile it checks for, ti/tj is the starting point on the tilemap
function autotileFillin(grid, source, target, ti, tj, bottom=false) {
  if (bottom) offset = numRows;
  else offset = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == source) {
        code = neighborCode(grid, i, j, target);
        result = autotileOffset_standard[code];

        if (typeof(result) == "string") {
          // cases requiring mixing tiles
          switch(result) {
            case "EW":
              placeTile(i + offset, j, ti+1, tj)
              placeTile(i + offset, j, ti+1, tj+2)
              break;
            case "ESW":
              placeTile(i + offset, j, ti+2, tj)
              placeTile(i + offset, j, ti+2, tj+2)
              placeTile(i + offset, j, ti+2, tj+1)
              break;
            case "NS":
              placeTile(i + offset, j, ti, tj+1)
              placeTile(i + offset, j, ti+2, tj+1)
              break;
            case "NSW":
              placeTile(i + offset, j, ti, tj)
              placeTile(i + offset, j, ti+2, tj)
              break;
            case "NEW":
              placeTile(i + offset, j, ti, tj)
              placeTile(i + offset, j, ti+1, tj+2)
              break;
            case "NES":
              placeTile(i + offset, j, ti, tj+2)
              placeTile(i + offset, j, ti+2, tj+2)
              break;
            case "FULL":
              placeTile(i + offset, j, ti+2, tj)
              placeTile(i + offset, j, ti, tj)
              placeTile(i + offset, j, ti+2, tj+2)
              placeTile(i + offset, j, ti+2, tj+1)
              break;
          }
        } else if (result == null) {
          // skip
        } else {
          //placeTile(i + numRows, j, ti, tj+1)
          placeTile(i + offset, j, ti+result[0], tj+result[1])
        }
      }
    }
  }
}

// gives how much to offset tiles by
const autotileOffset_standard = [
  null,
  [1, 0],
  [2, 1],
  [2, 0],
  [1, 2],
  "EW",
  [2, 2],
  "ESW",
  [0, 1],
  [0, 0],
  "NS",
  "NSW",
  [0, 2],
  "NEW",
  "NES",
  "FULL"
]

