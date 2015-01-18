battleshipsApp.factory('boardService', function () {
  var layout,
    ships;

  function getLayout (numberOfVerbs) {
    var r, c, layout, newCell;
    layout = { rows: [] };
    for(r = 0; r < 6; r++) {
      row = [];
      for(c = 0; c < numberOfVerbs; c++) {
        row.push({ row: r, column: c, colour: 'blue', hasShip: false });
      }
      layout.rows.push(row);
    }

    return layout;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomOrientation() {
    var binary = getRandomInt(0, 2);
    if (binary === 0) {
      return 'horizontal';
    }
    return 'vertical';
  }

  function getShips() {
    var allCells = [],
      cellCount,
      randomCell,
      ships = [],
      shipCoords,
      ship;
    angular.forEach(layout.rows, function (row) {
      angular.forEach(row, function (cell) {
        allCells.push(cell);
      });
    });

    var shipLengths = [2, 3, 4, 4, 5];
    var shipIds = ["twoLong", "threeLong", "fourLongA", "fourLongB", "fiveLong"];

    angular.forEach(shipLengths, function(shipLength, index) {
      shipPlaced = false;
      while(!shipPlaced) {
        shipCoords = placeShip(shipLength, allCells);
        if(shipCoords !== null) {
          ship = {
            coords: shipCoords,
            sunk: false,
            shipId: shipIds[index]
          };
          ships.push(ship);
          shipPlaced = true;
        }
      }
    });

    return ships; 
  }

  function placeShip (shipLength, allCells) {
    var cellCount = allCells.length,
      randomCellIndex = getRandomInt(0, cellCount),
      randomCell = allCells[randomCellIndex],
      orientation,
      shipCoords,
      row,
      col,
      i,
      cell;

    if (randomCell.hasShip)  {
      return null;
    }

    orientation = getRandomOrientation();
    shipCoords = [];
    row = randomCell.row;
    col = randomCell.column;

    if (orientation === 'horizontal') {
      if(col - shipLength < -1) {
        return null;
      } else {        
        for (i = col - shipLength + 1; i < col; i++) {
          cell = layout.rows[row][i];
          if(cell.hasShip) {
            return null;
          }
        }
        for (i = col - shipLength + 1; i < col + 1; i++) {
          layout.rows[row][i].hasShip = true;
          shipCoords.push({ x: i, y: row });
        }
        return shipCoords;
      }
    } else {
      if (row - shipLength < -1) {
        return null;
      } else {
        for (i = row - shipLength + 1; i < row; i++) {
          cell = layout.rows[i][col];
          if(cell.hasShip) {
            return null;
          }
        }
        for (i = row - shipLength + 1; i < row + 1; i++) {
          layout.rows[i][col].hasShip = true;
          shipCoords.push({ x: col, y: i });
        }
        return shipCoords;
      }
    }

    return null;
  }


  return {
    layout: function (numberOfVerbs) {
      layout = getLayout(numberOfVerbs);
      return layout;
    },
    ships: function () {
      ships = getShips();
      return ships;
    }
  };
});