export default class FASTA {
  constructor(records = null,
      alphabet = null,
      identifier = null,
      letter_probability_matrix = {},
      stack_heights = null,
      letter_heights = null) {
    this.records = records;
    this.alphabet = alphabet;
    this.identifier = identifier;
    this.letter_probability_matrix = letter_probability_matrix;
    this.stack_heights = stack_heights;
    this.letter_heights = letter_heights;
  }
}

module.exports = {
  FASTA
};