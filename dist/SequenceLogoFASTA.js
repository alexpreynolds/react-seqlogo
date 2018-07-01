"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FASTA = function FASTA() {
  var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var alphabet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var identifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var letter_probability_matrix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var stack_heights = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var letter_heights = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  _classCallCheck(this, FASTA);

  this.records = records;
  this.alphabet = alphabet;
  this.identifier = identifier;
  this.letter_probability_matrix = letter_probability_matrix;
  this.stack_heights = stack_heights;
  this.letter_heights = letter_heights;
};

exports.default = FASTA;


module.exports = {
  FASTA: FASTA
};