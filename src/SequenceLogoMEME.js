export default class MEME {
  constructor(version = -1,
      alphabet = null,
      strands = null,
      background_frequencies = null,
      identifier = null,
      alternate_name = null,
      url = null,
      letter_probability_matrix = null,
      stack_heights = null,
      letter_heights = null) {
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
  }
}

module.exports = {
  MEME
};