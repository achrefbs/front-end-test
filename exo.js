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


  colorize(color, i, j, map) {
    var pointType = this.map[i][j];
    if (pointType === EARTH_POINT_TYPE) {
      map[i][j] = color;
      if (this.map[i][j + 1] === EARTH_POINT_TYPE && map[i][j +1] !== color ) {
        this.colorize(color, i, j + 1, map);
      }
       if (i < this.map.length - 1 && this.map[i + 1][j] === EARTH_POINT_TYPE && map[i + 1][j ] !== color) {
        this.colorize(color, i + 1, j, map);
      }
       if (this.map[i][j - 1] === EARTH_POINT_TYPE && map[i][j -1] !== color) {
        this.colorize(color, i, j - 1, map);
      }
       if (i > 0 && this.map[i - 1][j] === EARTH_POINT_TYPE && map[i - 1][j] !== color) {
        this.colorize(color, i - 1, j, map);
      }
    }
  }

  getColoredMap() {
    var coloredMap = this.getRawMap();
    for (var i = 0; i < this.map.length; i++) {
      for (var j = 0; j < this.map[i].length; j++) {
        this.colorize(this.generateRandomColor(), i, j, coloredMap);
      }
    }
    return coloredMap;
  }

} 