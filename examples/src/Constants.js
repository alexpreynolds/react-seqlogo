export default class Constants {
  
  constructor() {
    this._types = [
      { name: 'type',  value: 'nucleotide', label: 'Nucleotide' },
      { name: 'type',  value: 'protein',    label: 'Protein' },
      { name: 'type',  value: 'epilogos',   label: 'Epilogos' },
    ];
    this._colorSchemes = [
      { name: 'colorScheme',  value: 'base_pairing',             label: 'Base pairing' },
      { name: 'colorScheme',  value: 'charge',                   label: 'Charge' },
      { name: 'colorScheme',  value: 'chemistry',                label: 'Chemistry' },
      { name: 'colorScheme',  value: 'classic',                  label: 'Classic' },
      { name: 'colorScheme',  value: 'epilogos-15state-human',   label: 'Epilogos (15-state, human)' },
      { name: 'colorScheme',  value: 'hydrophobicity',           label: 'Hydrophobicity' },
      { name: 'colorScheme',  value: 'nucleotide',               label: 'Nucleotide' },
      { name: 'colorScheme',  value: 'taylor',                   label: 'Taylor' },
    ];
    this._svgWidth = 600;
    this._svgHeight = 300;
    this._svgLetterWidth = 510;
    this._svgLetterHeight = 210;
    this._svgMargin = {
      top : 20,
      right : 0,
      bottom : 10,
      left: 25
    };
    this._yAxisTicks = 2;
    this._fastaSampleData = [
{
  'identifier' : '19 LexA Binding Sites',
  'sequences' : `>dinD 32->52
aactgtatataaatacagtt
>dinG 15->35 
tattggctgtttatacagta
>dinH 77->97
tcctgttaatccatacagca
>dinI 19->39
acctgtataaataaccagta
>lexA-1 28->48
tgctgtatatactcacagca
>lexA-2 7->27
aactgtatatacacccaggg
>polB(dinA) 53->73
gactgtataaaaccacagcc
>recA 59->79
tactgtatgagcatacagta
>recN-1 49->69
tactgtatataaaaccagtt
>recN-2 27->47
tactgtacacaataacagta
>recN-3 9-29
TCCTGTATGAAAAACCATTA
>ruvAB 49->69
cgctggatatctatccagca
>sosC 18->38
tactgatgatatatacaggt
>sosD 14->34
cactggatagataaccagca
>sulA 22->42
tactgtacatccatacagta
>umuDC 20->40
tactgtatataaaaacagta
>uvrA 83->103 
tactgtatattcattcaggt
>uvrB 75->95
aactgtttttttatccagta
>uvrD 57->77
atctgtatatatacccagct
` 
},
{
  'identifier' : '17 ArgR Binding Sites',
  'sequences' : `>argA-1 32->50
acagaataaaaatacact
>argA-2 11->29 
ttcgaataatcatgcaaa
>argD-1 51->69
agtgattttttatgcata
>argD-2 30->48
tgtggttataatttcaca
>argECBH-1 26->44, argC 110->128
tatcaatattcatgcagt
>argECBH-2 47->65, argC 89->107
tatgaataaaaatacact
>argF-1 48->66
aatgaataattacacata
>argF-2 27->45
agtgaattttaattcaat
>argG-1 73->91
attaaatgaaaactcatt
>argG-2 52->70
tttgcataaaaattcagt
>argG-3 192->210
tgtgaatgaatatccagt
>argI-1 46->64
aatgaataatcatccata
>argI-2 25->43
attgaattttaattcatt
>argR-1 45->63
tttgcataaaaattcatc
>argR-2 24->42
tatgcacaataatgttgt
>carAB-1 32->50
tgtgaattaatatgcaaa
>carAB-2 11->29
agtgagtgaatattctct
`
},
{
  'identifier' : '3 ad-hoc RNA sequences',
  'sequences' : `>001
CUUAUAUCCUUACC
>002
CUCGCGUGUCAAUC
>003
CTCCCGUUGCAAUC
`
}];
    this._memeMotifSampleData = [
`MEME version 4

ALPHABET= ACGT

strands: + -

Background letter frequencies
A 0.303 C 0.183 G 0.209 T 0.306 

MOTIF lexA
letter-probability matrix: alength= 4 w= 18 nsites= 14 E= 3.2e-035 
 0.214286  0.000000  0.000000  0.785714 
 0.857143  0.000000  0.071429  0.071429 
 0.000000  1.000000  0.000000  0.000000 
 0.000000  0.000000  0.000000  1.000000 
 0.000000  0.000000  1.000000  0.000000 
 0.000000  0.000000  0.000000  1.000000 
 0.857143  0.000000  0.071429  0.071429 
 0.000000  0.071429  0.000000  0.928571 
 0.857143  0.000000  0.071429  0.071429 
 0.142857  0.000000  0.000000  0.857143 
 0.571429  0.071429  0.214286  0.142857 
 0.285714  0.285714  0.000000  0.428571 
 1.000000  0.000000  0.000000  0.000000 
 0.285714  0.214286  0.000000  0.500000 
 0.428571  0.500000  0.000000  0.071429 
 0.000000  1.000000  0.000000  0.000000 
 1.000000  0.000000  0.000000  0.000000 
 0.000000  0.000000  0.785714  0.214286
`,
`MEME version 4

ALPHABET= ACGT

strands: + -

Background letter frequencies
A 0.303 C 0.183 G 0.209 T 0.306 

MOTIF crp
letter-probability matrix: alength= 4 w= 19 nsites= 17 E= 4.1e-009 
 0.000000  0.176471  0.000000  0.823529 
 0.000000  0.058824  0.647059  0.294118 
 0.000000  0.058824  0.000000  0.941176 
 0.176471  0.000000  0.764706  0.058824 
 0.823529  0.058824  0.000000  0.117647 
 0.294118  0.176471  0.176471  0.352941 
 0.294118  0.352941  0.235294  0.117647 
 0.117647  0.235294  0.352941  0.294118 
 0.529412  0.000000  0.176471  0.294118 
 0.058824  0.235294  0.588235  0.117647 
 0.176471  0.235294  0.294118  0.294118 
 0.000000  0.058824  0.117647  0.823529 
 0.058824  0.882353  0.000000  0.058824 
 0.764706  0.000000  0.176471  0.058824 
 0.058824  0.882353  0.000000  0.058824 
 0.823529  0.058824  0.058824  0.058824 
 0.176471  0.411765  0.058824  0.352941 
 0.411765  0.000000  0.000000  0.588235 
 0.352941  0.058824  0.000000  0.588235 
`,
`MEME version 4.4

ALPHABET= ACGT

strands: + -

Background letter frequencies (from uniform background):
A 0.25000 C 0.25000 G 0.25000 T 0.25000 

MOTIF V_CMYB_01 c-Myb

letter-probability matrix: alength= 4 w= 18 nsites= 43 E= 0
  0.037037        0.444444        0.222222        0.296296
  0.222222        0.555556        0.185185        0.037037
  0.200000        0.333333        0.300000        0.166667
  0.421053        0.131579        0.368421        0.078947
  0.432432        0.297297        0.216216        0.054054
  0.183673        0.326531        0.163265        0.326531
  0.156863        0.078431        0.666667        0.098039
  0.392157        0.019608        0.490196        0.098039
  0.066667        0.816667        0.033333        0.083333
  0.300000        0.300000        0.333333        0.066667
  0.000000        0.000000        1.000000        0.000000
  0.000000        0.000000        0.000000        1.000000
  0.000000        0.000000        0.000000        1.000000
  0.183333        0.016667        0.783333        0.016667
  0.157895        0.157895        0.552632        0.131579
  0.029412        0.205882        0.441176        0.323529
  0.100000        0.100000        0.600000        0.200000
  0.076923        0.000000        0.846154        0.076923
`,
`MEME version 4.12

ALPHABET= ABCDEFGHIJKLMNO

Background letter frequencies (from /home/toolsproxy/hpc-proxy/scripts/binaries/epilogos-meme/assets/backgrounds/observed/freqs_E001.txt):
A 0.010 B 0.003 C 0.000 D 0.014 E 0.145 F 0.001 G 0.038 H 0.003 I 0.027 J 0.004 K 0.001 L 0.002 M 0.010 N 0.039 O 0.704

MOTIF OAAAAA MEME-1

letter-probability matrix: alength= 15 w= 6 nsites= 6 E= 3.7e-025 
 0.166667  0.166667  0.000000  0.000000  0.166667  0.000000  0.166667  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.333333 
 0.333333  0.166667  0.000000  0.000000  0.166667  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.333333 
 0.500000  0.166667  0.000000  0.000000  0.166667  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.166667 
 0.833333  0.000000  0.000000  0.000000  0.166667  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000 
 1.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000 
 1.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000  0.000000
`];
  }
  
  get types() { return this._types; }
  get colorSchemes() { return this._colorSchemes; }
  get svgWidth() { return this._svgWidth; }
  get svgHeight() { return this._svgHeight; }
  get svgLetterWidth() { return this._svgLetterWidth; }
  get svgLetterHeight() { return this._svgLetterHeight; }
  get svgMargin() { return this._svgMargin; }
  get yAxisTicks() { return this._yAxisTicks; }
  get fastaSampleData() { return this._fastaSampleData; }
  get memeMotifSampleData() { return this._memeMotifSampleData; }
  
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
  }
  
  get getRandomItem() {
    var type = Constants.getRandomInt(0, 1);
    var item = null;
    var mode = null;
    switch (type) {
      case 0:
        var idx = Constants.getRandomInt(0, this._fastaSampleData.length - 1);
        item = this._fastaSampleData[idx];
        mode = 'FASTA';
        break;
      case 1:
        var idx = Constants.getRandomInt(0, this._memeMotifSampleData.length - 1);
        item = this._memeMotifSampleData[idx];
        mode = 'MEMEMotif';
        break;
      default:
        break;
    }
    return { 'item' : item, 'mode' : mode };
  }
}

module.exports = {
  Constants
};