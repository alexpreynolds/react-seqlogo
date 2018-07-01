"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MEME = function MEME() {
  var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
  var alphabet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var strands = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var background_frequencies = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var identifier = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var alternate_name = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var url = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var letter_probability_matrix = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
  var stack_heights = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
  var letter_heights = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;

  _classCallCheck(this, MEME);

  this.version = version;
  this.alphabet = alphabet;
  this.strands = strands;
  this.background_frequencies = background_frequencies;
  this.identifier = identifier;
  this.alternate_name = alternate_name;
  this.url = url;
  this.letter_probability_matrix = letter_probability_matrix;
  this.stack_heights = stack_heights;
  this.letter_heights = letter_heights;
};

exports.default = MEME;


module.exports = {
  MEME: MEME
};