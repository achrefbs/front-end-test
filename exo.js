var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Map {
  constructor(height, width) {
    var map = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
      }
      map.push(row);
    }
    this.map = map;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  generateRandomColor() {
    var color = undefined;
    while (!color || Object.keys(DEFAULT_COLORS).includes(color)) {
      color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
    }
    return color;
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }

  setFirstRow() {
    var row = [];
    for (var i = 0; i < this.map[0].length; i++) {
      if (this.map[0][i] === WATER_POINT_TYPE) {
        row.push(DEFAULT_WATER_COLOR);
      } 
      else if (this.map[0][i-1] === EARTH_POINT_TYPE) {
        var last_used = row[i-1];
        row.push(last_used);
      }
      else {
        row.push(this.generateRandomColor());
      }
    }
    return row;
  }

  getColoredMap() {
    var coloredMap = [];

    coloredMap.push(this.setFirstRow());
    for (var i = 1; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] === WATER_POINT_TYPE) {
          row.push(DEFAULT_WATER_COLOR);
        }
        if (this.map[i][j] === EARTH_POINT_TYPE) {
          if (this.map[i - 1][j] === EARTH_POINT_TYPE) { 
            row.push(coloredMap[i - 1][j]);
            for (var k = j -1 ; k >= 0; k--) {
              if (this.map[i][k] === EARTH_POINT_TYPE) {
                
                row[k] = coloredMap[i - 1][j];
              } else {
                break;
              }
            }
          } else if (this.map[i][j - 1] === EARTH_POINT_TYPE) {
            row.push(row[j - 1]);
          } else {
            row.push(this.generateRandomColor());
          }
        }
      }
      coloredMap.push(row);
    }
     console.log(coloredMap);
    return coloredMap;
  }

} 