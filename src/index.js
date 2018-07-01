import React from 'react';
import * as d3 from 'd3';

import { MEME } from './SequenceLogoMEME';
import { FASTA } from './SequenceLogoFASTA';

class SequenceLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seqObj : null,
      item : null,
      mode : null,
      type : null,
      svgWidth : 600,
      svgHeight : 300,
      svgLetterWidth : 510,
      svgLetterHeight : 210,
      colorScheme : null,
      title : null,
      yAxisTicks : 2,
      svgMargin : {
        top : 20,
        right : 0,
        bottom : 10,
        left: 25
      }
    };
    this.residueToIntMap = {
      'A' : 0,
      'C' : 1,
      'G' : 2,
      'T' : 3,
      'U' : 4,
      'D' : 5,
      'E' : 6,
      'F' : 7,
      'H' : 8,
      'I' : 9,
      'K' : 10,
      'L' : 11,
      'M' : 12,
      'N' : 13,
      'P' : 14,
      'Q' : 15,
      'R' : 16,
      'S' : 17,
      'V' : 18,
      'W' : 19,
      'Y' : 20,
      'B' : 21,
      'J' : 22,
      'O' : 23,
      'X' : 24,
      'Z' : 25
    };
    this.colorSchemes = {
      'classic' : {
        'A' : 'green',
        'C' : 'blue',
        'T' : 'red',
        'U' : 'red',
        'G' : 'orange'
      },
      'nucleotide' : {
        'A' : 'green',
        'C' : 'blue',
        'T' : 'red',
        'U' : 'red',
        'G' : 'orange'
      },
      'base_pairing' : {
        'A' : 'darkorange',
        'C' : 'blue',
        'T' : 'darkorange',
        'U' : 'darkorange',
        'G' : 'blue'
      },
      'hydrophobicity' : {
        'A' : 'green',
        'C' : 'black',
        'T' : 'green',
        'D' : 'blue',
        'E' : 'blue',
        'F' : 'black',
        'H' : 'green',
        'I' : 'black',
        'K' : 'blue',
        'L' : 'black',
        'M' : 'black',
        'N' : 'blue',
        'P' : 'green',
        'Q' : 'blue',
        'R' : 'blue',
        'S' : 'green',
        'V' : 'black',
        'W' : 'black',
        'Y' : 'black'
      },
      'chemistry' : {
        'A' : 'black',
        'C' : 'green',
        'T' : 'green',
        'G' : 'green',
        'D' : 'red',
        'E' : 'red',
        'F' : 'black',
        'H' : 'blue',
        'I' : 'black',
        'K' : 'blue',
        'L' : 'black',
        'M' : 'black',
        'N' : 'purple',
        'P' : 'black',
        'Q' : 'purple',
        'R' : 'blue',
        'S' : 'green',
        'V' : 'black',
        'W' : 'black',
        'Y' : 'green'
      },
      'charge' : {
        'K' : 'blue',
        'R' : 'blue',
        'H' : 'blue',
        'D' : 'red',
        'E' : 'red'
      },
      'taylor' : {
        'A' : '#CCFF00',
        'C' : '#FFFF00',
        'D' : '#FF0000',
        'E' : '#FF0066',
        'F' : '#00FF66',
        'G' : '#FF9900',
        'H' : '#0066FF',
        'I' : '#66FF00',
        'K' : '#6600FF',
        'L' : '#33FF00',
        'M' : '#00FF00',
        'N' : '#CC00FF',
        'P' : '#FFCC00',
        'Q' : '#FF00CC',
        'R' : '#0000FF',
        'S' : '#FF3300',
        'T' : '#FF6600',
        'V' : '#99FF00',
        'W' : '#00CCFF',
        'Y' : '#00FFCC'
      },
      'epilogos-15state-human' : {
        'A' : '#FF0000',
        'B' : '#FF4500',
        'C' : '#32CD32',
        'D' : '#008000',
        'E' : '#006400',
        'F' : '#C2E105',
        'G' : '#FFFF00',
        'H' : '#66CDAA',
        'I' : '#8A91D0',
        'J' : '#CD5C5C',
        'K' : '#E9967A',
        'L' : '#BDB76B',
        'M' : '#808080',
        'N' : '#C0C0C0',
        'O' : '#fafafa',
      }
    };
    this.paths = {
      'A' : 'M 11.21875 -16.1875 L 12.296875 0 L 15.734375 0 L 10.09375 -80.265625 L 6.375 -80.265625 L 0.578125 0 L 4.015625 0 L 5.109375 -16.1875 Z M 10.296875 -29.953125 L 6.046875 -29.953125 L 8.171875 -61.328125 Z M 10.296875 -29.953125',
      'C' : 'M 16.171875 -50.734375 C 16.046875 -57.375 15.734375 -61.578125 15 -65.890625 C 13.671875 -73.6875 11.546875 -78 8.953125 -78 C 4.078125 -78 1.046875 -62.53125 1.046875 -37.6875 C 1.046875 -13.046875 4.046875 2.421875 8.859375 2.421875 C 13.15625 2.421875 16.015625 -8.625 16.234375 -26.21875 L 12.78125 -26.21875 C 12.5625 -16.421875 11.171875 -10.84375 8.953125 -10.84375 C 6.203125 -10.84375 4.59375 -20.734375 4.59375 -37.46875 C 4.59375 -54.421875 6.28125 -64.53125 9.078125 -64.53125 C 10.3125 -64.53125 11.328125 -62.640625 12 -58.953125 C 12.375 -56.84375 12.5625 -54.84375 12.78125 -50.734375 Z M 16.171875 -50.734375',
      'T' : 'M 10.015625 -66.734375 L 15.5625 -66.734375 L 15.5625 -80.546875 L 0.359375 -80.546875 L 0.359375 -66.734375 L 6.125 -66.734375 L 6.125 0 L 10.015625 0 Z M 10.015625 -66.734375',
      'G' : 'M 16.1875 -41.375 L 9.53125 -41.375 L 9.53125 -28.1875 L 13.3125 -28.1875 C 13.234375 -23.859375 13 -21.21875 12.5 -18.46875 C 11.671875 -13.828125 10.421875 -11.078125 9.109375 -11.078125 C 6.359375 -11.078125 4.375 -22.265625 4.375 -38.109375 C 4.375 -54.671875 6.125 -64.703125 9.015625 -64.703125 C 10.203125 -64.703125 11.203125 -63.109375 11.953125 -60.0625 C 12.4375 -58.15625 12.6875 -56.359375 12.96875 -52.34375 L 16.1875 -52.34375 C 15.78125 -68.1875 13 -78.203125 9 -78.203125 C 4.21875 -78.203125 0.953125 -61.84375 0.953125 -37.890625 C 0.953125 -14.5625 4.234375 2.421875 8.71875 2.421875 C 10.953125 2.421875 12.453125 -1.265625 13.734375 -9.921875 L 14.140625 0.21875 L 16.1875 0.21875 Z M 16.1875 -41.375',
      'U' : 'M 13.25 -77.953125 L 13.25 -25.125 C 13.25 -15.71875 12.0625 -11.234375 9.59375 -11.234375 C 7.125 -11.234375 5.9375 -15.71875 5.9375 -25.125 L 5.9375 -77.953125 L 2 -77.953125 L 2 -25.125 C 2 -16.359375 2.578125 -10.15625 3.859375 -5.453125 C 5.25 -0.328125 7.28125 2.453125 9.59375 2.453125 C 11.90625 2.453125 13.921875 -0.328125 15.328125 -5.453125 C 16.609375 -10.15625 17.1875 -16.359375 17.1875 -25.125 L 17.1875 -77.953125 Z M 13.25 -77.953125',
      'D' : 'M 1.25 0 L 5.890625 0 C 7.703125 0 8.84375 -1.921875 9.640625 -6.265625 C 10.578125 -11.28125 11.09375 -18.578125 11.09375 -26.90625 C 11.09375 -35.15625 10.578125 -42.453125 9.640625 -47.53125 C 8.84375 -51.890625 7.71875 -53.734375 5.890625 -53.734375 L 1.25 -53.734375 Z M 3.703125 -9.21875 L 3.703125 -44.515625 L 5.890625 -44.515625 C 7.734375 -44.515625 8.640625 -38.6875 8.640625 -26.828125 C 8.640625 -15.03125 7.734375 -9.21875 5.890625 -9.21875 Z M 3.703125 -9.21875',
      'E' : 'M 4.109375 -23.015625 L 10.375 -23.015625 L 10.375 -32.171875 L 4.109375 -32.171875 L 4.109375 -44.265625 L 10.875 -44.265625 L 10.875 -53.4375 L 1.421875 -53.4375 L 1.421875 0 L 11.203125 0 L 11.203125 -9.15625 L 4.109375 -9.15625 Z M 4.109375 -23.015625',
      'F' : 'M 4.296875 -23.125 L 10.421875 -23.125 L 10.421875 -32.328125 L 4.296875 -32.328125 L 4.296875 -44.484375 L 11.25 -44.484375 L 11.25 -53.6875 L 1.421875 -53.6875 L 1.421875 0 L 4.296875 0 Z M 4.296875 -23.125',
      'H' : 'M 8.4375 -24.3125 L 8.4375 0 L 10.9375 0 L 10.9375 -53.53125 L 8.421875 -53.53125 L 8.421875 -33.484375 L 3.625 -33.484375 L 3.625 -53.53125 L 1.125 -53.53125 L 1.125 0 L 3.625 0 L 3.625 -24.3125 Z M 8.4375 -24.3125',
      'I' : 'M 8.375 -49.5625 L 12.015625 -49.5625 C 12.515625 -49.5625 12.75 -50.21875 12.75 -51.546875 C 12.75 -52.78125 12.515625 -53.453125 12.015625 -53.453125 L 3.671875 -53.453125 C 3.1875 -53.453125 2.953125 -52.78125 2.953125 -51.546875 C 2.953125 -50.21875 3.1875 -49.5625 3.671875 -49.5625 L 7.3125 -49.5625 L 7.3125 -3.890625 L 3.671875 -3.890625 C 3.1875 -3.890625 2.953125 -3.234375 2.953125 -2 C 2.953125 -0.671875 3.1875 0 3.671875 0 L 12.015625 0 C 12.484375 0 12.75 -0.671875 12.75 -2 C 12.75 -3.234375 12.515625 -3.890625 12.015625 -3.890625 L 8.375 -3.890625 Z M 8.375 -49.5625',
      'K' : 'M 3.40625 -17.90625 L 4.5625 -23.625 L 8.203125 0 L 10.921875 0 L 6.015625 -30.453125 L 10.453125 -53.484375 L 7.75 -53.484375 L 3.40625 -30.015625 L 3.40625 -53.484375 L 1.125 -53.484375 L 1.125 0 L 3.40625 0 Z M 3.40625 -17.90625',
      'L' : 'M 4.515625 -53.4375 L 1.5625 -53.4375 L 1.5625 0 L 11.359375 0 L 11.359375 -9.15625 L 4.515625 -9.15625 Z M 4.515625 -53.4375',
      'M' : 'M 3 -41.90625 L 4.8125 0 L 6.890625 0 L 8.6875 -41.90625 L 8.6875 0 L 10.765625 0 L 10.765625 -53.78125 L 7.625 -53.78125 L 5.859375 -10.984375 L 4.03125 -53.78125 L 0.921875 -53.78125 L 0.921875 0 L 3 0 Z M 3 -41.90625',
      'N' : 'M 8.46875 0 L 10.953125 0 L 10.953125 -53.6875 L 8.46875 -53.6875 L 8.46875 -17.15625 L 3.671875 -53.6875 L 1.125 -53.6875 L 1.125 0 L 3.609375 0 L 3.609375 -37.109375 Z M 8.46875 0',
      'P' : 'M 3.984375 -19.140625 L 7.28125 -19.140625 C 9.65625 -19.140625 11.171875 -26.125 11.171875 -37.03125 C 11.171875 -47.765625 9.703125 -53.65625 7.015625 -53.65625 L 1.34375 -53.65625 L 1.34375 0 L 3.984375 0 Z M 3.984375 -28.34375 L 3.984375 -44.453125 L 6.453125 -44.453125 C 7.875 -44.453125 8.515625 -41.890625 8.515625 -36.359375 C 8.515625 -30.921875 7.875 -28.34375 6.453125 -28.34375 Z M 3.984375 -28.34375',
      'Q' : 'M 9.234375 -6.890625 C 9.921875 -10.921875 10.34375 -17.609375 10.34375 -24.171875 C 10.34375 -31.34375 9.828125 -38.234375 8.9375 -42.859375 C 8.0625 -47.40625 6.921875 -49.625 5.46875 -49.625 C 4.03125 -49.625 2.890625 -47.40625 2.015625 -42.859375 C 1.125 -38.234375 0.59375 -31.34375 0.59375 -24.046875 C 0.59375 -16.734375 1.125 -9.84375 2.015625 -5.21875 C 2.890625 -0.671875 4.046875 1.546875 5.46875 1.546875 C 6.515625 1.546875 7.296875 0.53125 8.09375 -1.8125 L 9.296875 3.609375 L 10.34375 -1.8125 Z M 6.671875 -18.625 L 5.609375 -13.1875 L 6.6875 -8.296875 C 6.359375 -7.5 5.90625 -7.03125 5.453125 -7.03125 C 3.796875 -7.03125 2.6875 -13.796875 2.6875 -24.046875 C 2.6875 -34.28125 3.796875 -41.046875 5.46875 -41.046875 C 7.171875 -41.046875 8.265625 -34.359375 8.265625 -23.96875 C 8.265625 -19.953125 8.109375 -16.34375 7.8125 -13.390625 Z M 6.671875 -18.625',
      'R' : 'M 3.765625 -21.140625 L 6.578125 -21.140625 C 7.640625 -21.140625 8.09375 -19.234375 8.09375 -14.78125 C 8.09375 -14.34375 8.09375 -13.609375 8.078125 -12.65625 C 8.0625 -11.265625 8.0625 -9.953125 8.0625 -9.140625 C 8.0625 -4.171875 8.125 -2.5625 8.4375 0 L 11.078125 0 L 11.078125 -1.96875 C 10.703125 -2.921875 10.546875 -4.03125 10.546875 -6.359375 C 10.484375 -22.09375 10.421875 -22.828125 8.90625 -25.75 C 10.234375 -28.09375 10.90625 -32.40625 10.90625 -38.921875 C 10.90625 -43.15625 10.578125 -47.046875 10.015625 -49.671875 C 9.46875 -52.15625 8.71875 -53.328125 7.703125 -53.328125 L 1.3125 -53.328125 L 1.3125 0 L 3.765625 0 Z M 3.765625 -30.28125 L 3.765625 -44.1875 L 6.71875 -44.1875 C 7.421875 -44.1875 7.71875 -43.890625 8.015625 -42.796875 C 8.3125 -41.703125 8.453125 -39.875 8.453125 -37.390625 C 8.453125 -34.828125 8.296875 -32.78125 8.015625 -31.671875 C 7.75 -30.65625 7.421875 -30.28125 6.71875 -30.28125 Z M 3.765625 -30.28125',
      'S' : 'M 9.890625 -35.453125 C 9.890625 -40.140625 9.640625 -43.21875 9.0625 -46.015625 C 8.265625 -49.78125 6.9375 -51.8125 5.234375 -51.8125 C 2.375 -51.8125 0.734375 -46.078125 0.734375 -36.15625 C 0.734375 -28.25 1.65625 -24.40625 4.078125 -22.4375 L 5.734375 -21.046875 C 7.359375 -19.71875 7.96875 -17.765625 7.96875 -13.640625 C 7.96875 -9.375 7.0625 -6.78125 5.578125 -6.78125 C 3.90625 -6.78125 2.984375 -9.796875 2.90625 -15.25 L 0.515625 -15.25 C 0.671875 -4.328125 2.40625 1.609375 5.4375 1.609375 C 8.5 1.609375 10.3125 -4.546875 10.3125 -14.890625 C 10.3125 -22.9375 9.375 -27.125 7.171875 -28.953125 L 5.3125 -30.484375 C 3.5625 -31.953125 3.0625 -33.421875 3.0625 -37.125 C 3.0625 -40.96875 3.859375 -43.421875 5.125 -43.421875 C 6.671875 -43.421875 7.53125 -40.625 7.609375 -35.453125 Z M 9.890625 -35.453125',
      'V' : 'M 6.25 0 L 10.1875 -53.578125 L 7.8125 -53.578125 L 5.3125 -13.234375 L 2.75 -53.578125 L 0.375 -53.578125 L 4.25 0 Z M 6.25 0',
      'W' : 'M 7.78125 0 L 9.9375 -53.421875 L 8.234375 -53.421875 L 7.078125 -13.34375 L 5.8125 -53.421875 L 4.234375 -53.421875 L 3.03125 -13.40625 L 1.828125 -53.421875 L 0.140625 -53.421875 L 2.328125 0 L 3.765625 0 L 5.046875 -41.703125 L 6.34375 0 Z M 7.78125 0',
      'Y' : 'M 6.59375 -19.84375 L 10.234375 -53.578125 L 7.59375 -53.578125 L 5.40625 -29.921875 L 3.0625 -53.578125 L 0.421875 -53.578125 L 4.234375 -19.84375 L 4.234375 0 L 6.59375 0 Z M 6.59375 -19.84375',
      'B' : 'M7.6 0 v 71.8 h 34.9 c 17.6 0 22.1 -11.0 22.1 -18.4 c 0 -10.3 -5.8 -13.2 -8.8 -14.7 c 8.8 -3.3 11.1 -10.3 11.1 -17.4 c 0 -5.7 -2.4 -11.1 -6.2 -14.8 c -4.1 -4.0 -8.0 -6.5 -22.7 -6.5 h -30.4 z M 22.0 31.6 v -19.2 h 18.4 c 7.3 0 11.5 3.2 11.5 10.5 c 0 6.3 -5.4 8.7 -10.8 8.7 h -19.1 z M 22.0 59.4 v -15.7 h 17.6 c 5.9 0 10.6 2.3 10.6 8.0 c 0 5.9 -4.2 7.7 -11.0 7.7 h -17.2 z',
      'J' : 'M484 718v-510c0 -152 -79 -226 -223 -226c-239 0 -239 152 -239 289h140c0 -113 8 -168 88 -168c78 0 84 50 84 105v510h150z',
      'O' : 'M44 359c0 337 250 378 345 378s345 -41 345 -378s-250 -378 -345 -378s-345 41 -345 378zM194 359c0 -201 114 -251 195 -251s195 50 195 251s-114 251 -195 251s-195 -50 -195 -251z',
      'X' : 'M419 373l234 -373h-183l-136 245l-145 -245h-175l232 367l-219 351h179l128 -232l131 232h173z',
      'Z' : 'M586 127v-127h-561v127l371 464h-361v127h549v-118l-376 -473h378z'
    };
    
    this.getLetterPath = this.getLetterPath.bind(this);
    this.intToLetter = this.intToLetter.bind(this);
    this.stackHeight = this.stackHeight.bind(this);
    this.updateStackHeights = this.updateStackHeights.bind(this);
    this.updateLetterHeights = this.updateLetterHeights.bind(this);
    this.calculatePathTransform = this.calculatePathTransform.bind(this);
    this.getLetterBaseTransform = this.getLetterBaseTransform.bind(this);
    this.parseMEMEMotif = this.parseMEMEMotif.bind(this);
    this.parseFASTA = this.parseFASTA.bind(this);
    this.objectOffsets = this.objectOffsets.bind(this);
    this.renderSequenceObject = this.renderSequenceObject.bind(this);
  }
  
  getLetterPath(i) {
    switch(i) {
      case 0:
        return this.paths['A'];
      case 1:
        return this.paths['C'];
      case 2:
        return this.paths['G'];
      case 3:
        return this.paths['T'];
      case 4:
        return this.paths['U'];
      case 5:
        return this.paths['D'];
      case 6:
        return this.paths['E'];
      case 7:
        return this.paths['F'];
      case 8:
        return this.paths['H'];
      case 9:
        return this.paths['I'];
      case 10:
        return this.paths['K'];
      case 11:
        return this.paths['L'];
      case 12:
        return this.paths['M'];
      case 13:
        return this.paths['N'];
      case 14:
        return this.paths['P'];
      case 15:
        return this.paths['Q'];
      case 16:
        return this.paths['R'];
      case 17:
        return this.paths['S'];
      case 18:
        return this.paths['V'];
      case 19:
        return this.paths['W'];
      case 20:
        return this.paths['Y'];
      case 21:
        return this.paths['B'];
      case 22:
        return this.paths['J'];
      case 23:
        return this.paths['O'];
      case 24:
        return this.paths['X'];
      case 25:
        return this.paths['Z'];
      default:
        return this.paths['N'];
    }
  }
  
  intToLetter(i) {
    switch (i) {
      case 0:
        return 'A';
      case 1:
        return 'C';
      case 2:
        return 'G';
      case 3:
        return 'T';
      case 4:
        return 'U';
      case 5:
        return 'D';
      case 6:
        return 'E';
      case 7:
        return 'F';
      case 8:
        return 'H';
      case 9:
        return 'I';
      case 10:
        return 'K';
      case 11:
        return 'L';
      case 12:
        return 'M';
      case 13:
        return 'N';
      case 14:
        return 'P';
      case 15:
        return 'Q';
      case 16:
        return 'R';
      case 17:
        return 'S';
      case 18:
        return 'V';
      case 19:
        return 'W';
      case 20:
        return 'Y';
      case 21:
        return 'B';
      case 22:
        return 'J';
      case 23:
        return 'O';
      case 24:
        return 'X';
      case 25:
        return 'Z';
      default:
        return 'N';
    }
  }
  
  stackHeight(obj, position) {
    var alphabet_length = obj.alphabet.length;
    var max_entropy = Math.log2(alphabet_length);
    var frequencies = obj.letter_probability_matrix.frequencies[position];
    // make sure to intialize reducer, otherwise incorrect uncertainty will result
    var uncertainty = frequencies.reduce(function(t, d) {
      // cf. https://stats.stackexchange.com/questions/57069/alternative-to-shannons-entropy-when-probability-equal-to-zero
      return t + (d == 0 ? 0 : -d * Math.log2(d));
    }, 0.0);
    var nsites = obj.letter_probability_matrix.attributes.nsites;
    if (this.state.type === 'epilogos') {
      return max_entropy - uncertainty;
    }
    else {
      var error_correction_factor = ( alphabet_length - 1 ) / (( 2 * nsites ) * Math.log2(2) );
      return max_entropy - (uncertainty + error_correction_factor);
    }
  };
  
  updateStackHeights(obj) {
    var self = this;
    var stack_heights = new Array(obj.letter_probability_matrix.frequencies.length);
    obj.letter_probability_matrix.frequencies.map(function(d, i) {
      stack_heights[i] = self.stackHeight(obj, i);
    });
    obj.stack_heights = stack_heights;
  };
  
  updateLetterHeights(obj) {
    var letter_heights = new Array(obj.letter_probability_matrix.frequencies.length);
    obj.letter_probability_matrix.frequencies.map(function(frequencies, position) {
      letter_heights[position] = frequencies.map(function(frequency, idx) {
        return frequency * obj.stack_heights[position];
      }); 
    });
    obj.letter_heights = letter_heights;
  }
  
  calculatePathTransform(path, d, yScale, colWidth, type) {
    const pathBBox = path.getBBox();
  
    /**
     * calculate scale factor based on height
     * of bounding "rectangle" (imagine a stacked bar chart)
     */
    const rectHeight = yScale(d[1] - d[0]);
    const rectWidth = colWidth;
  
    const scaleY = rectHeight / pathBBox.height;
    const scaleX = rectWidth / pathBBox.width;
  
    // transform to origin so scaling behaves as desired
    const originX = pathBBox.x;
    const originY = pathBBox.y;
  
    /**
     * base transform required by font->path conversion
     * (see getLetterBaseTransform comment)
     */
    var baseTransformX = 0;
    var baseTransformY = 0;
    if (type === 'nucleotide' || type === 'protein') {
      const baseTransforms = this.getLetterBaseTransform(d[2]);
      baseTransformX = baseTransforms[0];
      baseTransformY = baseTransforms[1];
    }
  
    // apply scale in reverse to post-scale transforms
    const postTY = (yScale(d[0]) / scaleY) + (baseTransformY / scaleY);
    const postTX = baseTransformX / scaleX;
  
    // pre-scale transforms
    const yFudge = (type === 'epilogos') ? 0 : (type === 'protein') ? 30 : 3; // needed to align logo to zero bits
    const preTX = -originX * (scaleX - 1);
    const preTY = -originY * (scaleY - 1) - yFudge;
  
    const out = `translate(${preTX},${preTY}) scale(${scaleX},${scaleY}) translate(${postTX},${postTY})`;
  
    return out;
  }
  
  getLetterBaseTransform(i) {
    const baseTransform = [];
    baseTransform[0] = -2;
    baseTransform[1] = 82;
  
    if (i === 3) { // letter T
      baseTransform[0] += 1;
      baseTransform[1] += 2.9;
    } 
    else if (i === 0) { // letter A
      baseTransform[0] += 1;
      baseTransform[1] += 2.5;
    }
  
    return baseTransform;
  }
  
  parseMEMEMotif(memeMotif) {
    let result = {};
    let lines = memeMotif.split(/[\r|\n]/);
    let memeMotifObj = new MEME();
    let linesLength = lines.length;
    let versionRegex = null;
    let alphabetRegex = null;
    let strandsRegex = null;
    let backgroundFrequenciesRegex = null;
    let motifNameRegex = null;
    let urlRegex = null;
    let letterProbabilityRegex = null;
    for (var idx = 0; idx < linesLength; ++idx) {
      var line = lines[idx];
      if (line.length == 0) {
        continue;
      }
      else {
        if (versionRegex = line.match(/^MEME version ([0-9.]{1,})$/) || null) {
          memeMotifObj.version = parseFloat(versionRegex[1]);
        }
        else if (alphabetRegex = line.match(/^ALPHABET= ([A-Z]{1,})$/) || null) {
          memeMotifObj.alphabet = alphabetRegex[1].split('');
        }
        else if (strandsRegex = line.match(/^strands: ([\+\s\-]+)$/) || null) {
          memeMotifObj.strands = strandsRegex[1].split(' ');
        }
        else if (backgroundFrequenciesRegex = line.match(/^Background letter frequencies/) || null) {
          idx++;
          line = lines[idx];
          var freqPairingsObj = {};
          if (line.length == 0) {
            // assume uniform frequencies
            var freqPairingsLength = memeMotifObj.alphabet.length;
            for (var fpi = 0; fpi < freqPairingsLength; ++fpi) {
              freqPairingsObj[memeMotifObj.alphabet[fpi]] = 1/freqPairingsLength;
            }
          }
          else {
            var freqPairings = line.split(' ');
            var freqPairingsLength = freqPairings.length;
            for (var fpi = 0; fpi < freqPairingsLength; ++fpi) {
              if (fpi % 2 == 0) {
                var letter = freqPairings[fpi];
              }
              else {
                var frequency = parseFloat(freqPairings[fpi]);
                freqPairingsObj[letter] = frequency;
              }
            }  
          }        
          memeMotifObj.background_frequencies = freqPairingsObj;
        }
        else if (motifNameRegex = line.match(/^MOTIF ([A-Za-z0-9\-\s_.,!"'/$]+)$/) || null) {
          var motifNames = motifNameRegex[1].split(" ");
          memeMotifObj.identifier = motifNames[0];
          if (motifNames.length == 2) {
            memeMotifObj.alternate_name = motifNames[1];
          }
        }
        else if (urlRegex = line.match(/https?:\/\/\S+/gi) || null) {
          memeMotifObj.url = urlRegex[0];
        }
        else if (letterProbabilityRegex = line.match(/^letter-probability matrix: ([A-Za-z\=\s0-9].*)$/) || null) {
          // parse any match, if found
          if (letterProbabilityRegex[1].length > 0) {
            var lprPairings = letterProbabilityRegex[1].split(" ");
            var lprPairingsLength = lprPairings.length;
            var lprPairingsObj = {};
            for (var lpri = 0; lpri < lprPairingsLength; ++lpri) {
              if ((lpri % 2) == 0) {
                var keyStr = lprPairings[lpri];
                var key = keyStr.substring(0, keyStr.length - 1);
              }
              else {
                var value =  lprPairings[lpri];
                lprPairingsObj[key] = parseFloat(value);
              }
            }
            // defaults
            if (!lprPairingsObj.nsites) {
              lprPairingsObj.nsites = 20;
              lprPairingsObj.E = 0;
            }
            memeMotifObj.letter_probability_matrix = {};
            memeMotifObj.letter_probability_matrix['attributes'] = lprPairingsObj;
          }
          // in any case, parse lines until a blank line is found, and then continue out of loop
          idx++;
          line = lines[idx];
          var lineLength = line.length;
          memeMotifObj.letter_probability_matrix['frequencies'] = [];
          while (lineLength != 0) {
            var lprFrequencies = line.trim().split(/\s+/);
            var lprFrequenciesLength = lprFrequencies.length;
            var alphabetLength = memeMotifObj.alphabet.length || memeMotifObj.letter_probability_matrix.attributes.alength;
            var lprFrequenciesArray = [];
            for (var ai = 0; ai < alphabetLength; ++ai) {
              lprFrequenciesArray.push(parseFloat(lprFrequencies[ai]));
            }
            memeMotifObj.letter_probability_matrix.frequencies.push(lprFrequenciesArray);
            idx++;
            line = lines[idx];
            if (!line) {
              break;
            }
            lineLength = line.length;
          }
        }
      }
    }
    
    // update state
    this.updateStackHeights(memeMotifObj);
    this.updateLetterHeights(memeMotifObj);
    
    this.setState({
      title : memeMotifObj.identifier
    });
    
    return memeMotifObj;
  }
  
  parseFASTA(fasta) {
    let records = [];
    let alphabetObj = {};
    let identifier = fasta.identifier;
    let lines = fasta.sequences.split(/[\r\n]/);
    let fastaObj = new FASTA();
    let linesLength = lines.length;
    let recordSet = false;
    let record = { 'header' : null , 'sequence' : null};
    let sequenceLength = 0;
    let headerRegex = null;
    for (var idx = 0; idx < linesLength; ++idx) {
      var line = lines[idx].trim();
      if (line.length == 0) {
        continue;
      }
      else {
        if (headerRegex = line.match(/^>(.*)$/) || null) {
          var header = headerRegex[1];
          if (recordSet && record.sequence.length > 0) {
            if ((sequenceLength != 0) && (sequenceLength != record.sequence.length)) {
              throw new SyntaxError('Invalid sequence length for record:' + JSON.stringify(record));
            }
            sequenceLength = record.sequence.length;
            records.push(record);
          }
          record = { 'header' : null , 'sequence' : null};
          record.header = header;
          record.sequence = '';
          recordSet = true;
        }
        else {
          do {
            var sequence = line.toUpperCase().trim().replace(/ /g, "").replace(/-/g, "N");
            var residues = sequence.split('');
            residues.forEach(d => alphabetObj[d] = true);
            record.sequence += sequence;
            if (idx == linesLength - 1) {
              records.push(record);
              break;
            } 
            idx++;
            line = lines[idx];
          } while (!line.startsWith('>'))
          idx--;
          headerRegex = line.match(/^>(.*)$/) || null;
        }
      }
    }
    if (record.sequence.length > 0) {
      records.push(record);
    }
            
    // build frequency table
    var countTable = [];
    for (var idx = 0; idx < sequenceLength; ++idx) {
      countTable[idx] = {};
      Object.keys(alphabetObj).forEach(d => countTable[idx][d] = 0);
    }
    var recordsLength = records.length;
    for (var idx = 0; idx < recordsLength; ++idx) {
      records[idx].sequence.split('').forEach((d,i) => countTable[i][d]++);
    }
    var alphabet = [];
    Object.keys(alphabetObj).forEach(d => alphabet.push(d));
    var alphabetLength = alphabet.length;
    fastaObj.letter_probability_matrix['attributes'] = {'nsites' : recordsLength};
    fastaObj.letter_probability_matrix['frequencies'] = [];
    for (var idx = 0; idx < sequenceLength; ++idx) {
      var lprFrequenciesArray = new Array(alphabetLength);
      alphabet.forEach((d,i) => lprFrequenciesArray[i] = parseFloat(countTable[idx][d]) / recordsLength)
      fastaObj.letter_probability_matrix.frequencies.push(lprFrequenciesArray);
    }
    
    // populate object
    fastaObj.records = records;
    fastaObj.alphabet = alphabet;
    fastaObj.identifier = identifier;
    
    // update state
    this.updateStackHeights(fastaObj);
    this.updateLetterHeights(fastaObj);
    
    this.setState({
      title : fasta.identifier
    });
    
    return fastaObj;
  }
  
  objectOffsets(position, alphabet, letter_heights, stack_height, max_entropy) {
    const offs = [];
    let ctr = 0;
    letter_heights.forEach((d, j) => {
      const nextCtr = ctr + d;
      offs.push([ctr, nextCtr,  (nextCtr - ctr), j]);
      ctr = nextCtr;
    });
    // sort by heights of produced rects
    offs.sort((a, b) => (b[2] - a[2]));
    const outOffsets = [];
    ctr = max_entropy - stack_height;
    offs.forEach((d) => {
      const diff = d[2];
      outOffsets.push([ ctr, ctr + diff, this.residueToIntMap[alphabet[d[3]]] ]);
      ctr += diff;
    });
    return outOffsets;
  }
  
  renderSequenceObject(obj) {
    var self = this;
    
    // number of symbols
    const n = obj.alphabet.length;
    
    // number of nucleotides over sequence
    const m = obj.letter_heights.length; 
    
    // range of letter bounds at each nucleotide index position
    const max_entropy = Math.log2(n);
    const yz = d3.range(m).map(i => self.objectOffsets(i, obj.alphabet, obj.letter_heights[i], obj.stack_heights[i], max_entropy));
    
    // margin
    var margin = this.state.svgMargin;
    
    // width including endpoint markers
    const svgFullWidth = parseInt(this.state.svgWidth);
  
    // width of just the base letters + x-axis labels
    const svgLetterWidth = parseInt(this.state.svgLetterWidth);
  
    const endpointWidth = (svgFullWidth - svgLetterWidth) / 2;
  
    // height including x-axis labels and endpoint markers
    const svgFullHeight = parseInt(this.state.svgHeight);
  
    // height of just the base letters
    const svgLetterHeight = parseInt(this.state.svgLetterHeight);
  
    // map: sequence length -> innerSVG
    const xscale = d3.scaleLinear()
      .domain([0, m])
      .range([endpointWidth, svgLetterWidth + endpointWidth]);
    
    // get one unit of width from d3 scale (convenience)
    const colWidth = (xscale(1) - xscale(0));
    
    // map: log2 number of symbols -> svg letter height (i.e., information in bits)
    const yScale = d3.scaleLinear()
      .domain([0, max_entropy])
      .range([0, svgLetterHeight]);
      
    const yAxisScale = d3.scaleLinear()
      .domain([0, max_entropy])
      .range([svgLetterHeight, 0]);
      
    const svgChild = d3.select('svg');
    if (svgChild) {
      svgChild.remove();
    }
      
    const svg = d3.select('#logo')
      .append('svg')
      .attr("width", svgFullWidth + parseInt(margin.left) + parseInt(margin.right))
      .attr("height", svgFullHeight + parseInt(margin.top) + parseInt(margin.bottom))
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    // Attach title
    const titleGroup = svg.append('g')
      .attr('class', 'title');
      
    const titleFontSize = 18;
    const titleFontWeight = 'bold';
  
    titleGroup.append('text')
      .text(this.state.title)
      .style('text-anchor', 'middle')
      .style('font-size', titleFontSize)
      .style('font-weight', titleFontWeight)
      .attr('transform', `translate(${(svgFullWidth-margin.left-margin.right)/2.0},${0})`);
  
    // Attach y-axis (bits)
    const yAxisGroup = svg.append('g')
      .attr('class', 'y axis');
    
    const yAxisFontSize = 18;
      
    yAxisGroup.append('text')
      .text('bits')
      .style('text-anchor', 'left')
      .style('font-size', yAxisFontSize)
      .attr('transform', `translate(0,${(svgLetterHeight+margin.top+margin.bottom)/2.0}) rotate(270)`);
      
    yAxisGroup.append('g')
      .attr("transform", "translate(30,0)")
  		.call(d3.axisLeft(yAxisScale).ticks(parseInt(this.state.yAxisTicks)));
  
    const endptFontSize = 18;
    const endptFontWeight = 'bold';
    const endptTY = (svgFullHeight + svgLetterHeight) / 2 - 10;
  
    // Attach left endpoint to SVG
    svg.append('text')
      .text('5\'')
      .style('text-anchor', 'begin')
      .style('font-size', endptFontSize)
      .style('font-weight', endptFontWeight)
      .attr('transform', `translate(${15},${endptTY})`);
  
    // Attach right endpoint to SVG
    svg.append('text')
      .text('3\'')
      .style('text-anchor', 'end')
      .style('font-size', endptFontSize)
      .style('font-weight', endptFontWeight)
      .attr('transform', `translate(${svgFullWidth-15},${endptTY})`);
      
    /**
     * Our groups are organized by columns--
     * each column gets an SVG group.
     * 
     * The column is used to neatly handle all x-offsets and labels.
     */
    const group = svg.selectAll('group')
      .data(yz)
      .enter()
      .append('g')
      .attr('class', 'column')
      .attr('transform', (d, i) => `translate(${xscale(i)},0)`);
      
    /**
     * Attach the number labels to the x-axis.
     * 
     * A possible modification is to make xLabelFontSize 
     * data-dependent. As written its position will change 
     * with the column width (# of nucleotides), so 
     * visually it will look fine, but it may be 
     * desirable to alter font size as well.
     */
    const xLabelFontSize = 18;
    const xLabelTX = (colWidth / 2) + (xLabelFontSize / 3);
    const xLabelTY = svgLetterHeight + 10;
  
    group.append('text')
      .text((d, i) => `${i + 1}`)
      .style('font-size', xLabelFontSize)
      .style('text-anchor', 'end')
      .attr('transform', `translate(${xLabelTX}, ${xLabelTY}) rotate(270)`);
    
    if (this.state.type === 'nucleotide' || this.state.type === 'protein') {
      /*
       * For each column (group):
       *  Add the letter (represented as an SVG path, see above)
       *  if the calculated height is nonzero (the filter condition).
       *
       * In other words, if that base appeared at this position
       * in at least one sequence.
       *
       * notes:
       *  Filter is used here to avoid attaching paths with 0 size
       *  to the DOM. This filtering could optionally be performed 
       *  earlier, when we build yz.
       */
      console.log("self.state.colorScheme", self.state.colorScheme);
      group.selectAll('path')
        .data(d => d)
        .enter()
        .filter(d => (d[1] - d[0] > 0))
        .append('path')
        .attr('d', d => self.getLetterPath(d[2]))
        .style('fill', d => self.colorSchemes[self.state.colorScheme][self.intToLetter(d[2])])
        .attr('transform', function(d) { return self.calculatePathTransform(this, d, yScale, colWidth, self.state.type); });  
    }
    else if (this.props.type === 'epilogos') {
      group.selectAll('rect')
        .data(d => d)
        .enter()
        .filter(d => (d[1] - d[0] > 0))
        .append('rect')
        .attr('width', colWidth)
        .attr('height', d => yScale(d[1] - d[0]))
        .style('fill', d => self.colorSchemes[self.state.colorScheme][self.intToLetter(d[2])])
        .style('stroke', '#ededed')
        .attr('transform', function(d) { return self.calculatePathTransform(this, d, yScale, colWidth, self.state.type); });
    }    
  }
  
  componentDidUpdate(prevProps) {
    //
    // use equality tests to avoid infinite redraws
    //
    if (this.props.item !== prevProps.item) {
      console.log("item changed");
      var seqObj = null;
      if (this.props.mode == 'FASTA') {
        seqObj = this.parseFASTA(this.props.item);
      }
      else if (this.props.mode == 'MEMEMotif') {
        seqObj = this.parseMEMEMotif(this.props.item);
      }
      if (seqObj) {
        this.setState({ 
          seqObj : seqObj,
          type : this.props.type,
          colorScheme : this.props.colorScheme
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
    
    else if (this.props.title !== prevProps.title) {
      if (this.state.seqObj) {
        this.setState({ 
          title : this.props.title 
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
    
    else if (this.props.type !== prevProps.type) {
      if (this.state.seqObj) {
        this.setState({ 
          type : this.props.type 
        }, function() {
          if (this.props.mode == 'FASTA') {
            seqObj = this.parseFASTA(this.props.item);
          }
          else if (this.props.mode == 'MEMEMotif') {
            seqObj = this.parseMEMEMotif(this.props.item);
          }
          if (seqObj) {
            this.setState({ 
              seqObj : seqObj
            }, function() {
              this.renderSequenceObject(this.state.seqObj);
            }
          )};
        });
      }
    }
    
    else if (this.props.colorScheme !== prevProps.colorScheme) {
      if (this.state.seqObj) {
        this.setState({ 
          colorScheme : this.props.colorScheme 
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
    
    else if (this.props.svgWidth !== prevProps.svgWidth) {
      if (this.state.seqObj) {
        this.setState({ 
          svgWidth : this.props.svgWidth 
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
    
    else if (this.props.svgHeight !== prevProps.svgHeight) {
      if (this.state.seqObj) {
        this.setState({ 
          svgHeight : this.props.svgHeight 
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
    
    else if (this.props.svgLetterWidth !== prevProps.svgLetterWidth) {
      if (this.state.seqObj) {
        this.setState({ 
          svgLetterWidth : this.props.svgLetterWidth 
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
    
    else if (this.props.svgLetterHeight !== prevProps.svgLetterHeight) {
      if (this.state.seqObj) {
        this.setState({ 
          svgLetterHeight : this.props.svgLetterHeight 
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
    
    else if (this.props.svgMargin !== prevProps.svgMargin) {
      if (this.state.seqObj) {
        this.setState({ 
          svgMargin : this.props.svgMargin 
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
    
    else if (this.props.yAxisTicks !== prevProps.yAxisTicks) {
      if (this.state.seqObj) {
        this.setState({ 
          yAxisTicks : this.props.yAxisTicks 
        }, function() {
          this.renderSequenceObject(this.state.seqObj);
        });
      }
    }
  }
  
  render() {
    return (
      <div id="logo"></div>
    );
  }
}

export default SequenceLogo;