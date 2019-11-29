# react-seqlogo

This React component renders [residue sequence logos](https://en.wikipedia.org/wiki/Sequence_logo) from a structured Javascript object (described below) containing [FASTA-formatted sequences](https://en.wikipedia.org/wiki/FASTA_format), or a string containing a [MEME motif table](http://meme-suite.org/doc/meme-format.html). This component can also be used to render an [Epilogos](https://epilogos.altiusinstitute.org) stacked bar-chart of chromatin state logos from [Epilogos-MEME](https://epilogos-meme.altiusinstitute.org) table data.


## Installation

In your React project, install the `react-seqlogo` package:

```
$ npm install react-seqlogo
```

This package is hosted from [NPM](https://www.npmjs.com/package/react-seqlogo). Source is available at [Github](https://github.com/alexpreynolds/react-seqlogo).

## Usage

Add a sequence logo to your React application with desired properties:

```
import SequenceLogo from 'react-seqlogo';

...

<SequenceLogo props... />
```

## Demo

This project includes a demo frontend that shows how one could use this component:

```
$ npm run start
```

Once the server has initialized, open a web browser and visit: http://localhost:8080

## Properties

Available properties (and their default values or options) for the main `<SequenceLogo />` component include:

```
{
  title           : '',
  mode            : 'FASTA' | 'MEMEMotif',
  colorScheme     : 'base_pairing' |
                    'charge' | 
                    'chemistry' | 
                    'classic' | 
                    'epilogos-15state-human' | 
                    'epilogos-18state-human' | 
                    'epilogos-25state-human' | 
                    'epilogos-15state-mouse' | 
                    'hydrophobicity' | 
                    'nucleotide' | 
                    'taylor',
  item            : {} | '',
  type            : 'nucleotide' | 'protein' | 'epilogos',
  yAxisTicks      : 2,
  svgWidth        : 600,
  svgHeight       : 300,
  svgLetterWidth  : 510,
  svgLetterHeight : 210,
  svgMargin : { 
    top    : 20,
    right  : 0,
    bottom : 10,
    left   : 25
  }, 
}
```

## Rendering

At minimum, an `item` is needed to turn into a sequence logo. The `item` property ultimately provides the base counts needed to render a logo, either in the form of raw sequences or letter frequencies.

An `item` may be a structured Javascript object containing FASTA-formatted sequences or a string containing a MEME motif table, depending on the specified `mode`. 

The logo that results will be colored and rendered with attributes and rules derived from the `colorScheme` and `type` properties.

### FASTA

Very simply, an `item` is a pairing of an `identifier` string and a `sequences` string:

```
{
  identifier : '',
  sequences : ''
}
```

For example:

```
{
  identifier : '3 ad-hoc RNA sequences',
  sequences : `>seq001
CUUAUAUCCUUACC
>seq002
CUCGCGUGUCAAUC
>seq003
CTCCCGUUGCAAUC
`
}
```

The `sequences` string is more familiar as the contents of a generic, multiline FASTA file. The `identifier` gives the sequences a usable title.

### MEME motif

A MEME motif is a string contains metadata describing the item and the letter-probability matrix, which is turned into a sequence logo. The format of this string is defined [here](http://meme-suite.org/doc/meme-format.html).

## Issues

At this time, there are rendering problems with residues in protein sequence logos.

Also, not all features of [WebLogo 3](http://weblogo.threeplusone.com/) are supported. Future versions may add support for alternate units such as probability density and nats, error bars, logo range subsets and offsets, and background composition correction.