import React from 'react';
import SplitPane from 'react-split-pane';
import Textarea from 'react-textarea-autosize';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import logo from './logo.svg';
import './App.css';
import { Constants } from './Constants';
import SequenceLogo from '../../src';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.constants = new Constants();
    this.state = {
      input:            '',
      title:            '',
      item:             null,
      type:             this.constants.types[0],
      colorScheme:      this.constants.colorSchemes[3],
      svgWidth:         this.constants.svgWidth,
      svgHeight:        this.constants.svgHeight,
      svgLetterWidth:   this.constants.svgLetterWidth,
      svgLetterHeight:  this.constants.svgLetterHeight,
      svgMargin:        this.constants.svgMargin,
      yAxisTicks:       this.constants.yAxisTicks,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.loadRandomItem = this.loadRandomItem.bind(this);
  }
  
  handleChange(evt) {
    if (evt.target) {
      if (evt.target.name == 'input') {
        if (evt.target.value.startsWith('>')) {
          var type = 'FASTA';
          var item = {
            'identifier' : this.state.title,
            'sequences' : evt.target.value
          };
        }
        else {
          var type = 'MEMEMotif';
          var item = evt.target.value;
        }
        this.setState({
          input : evt.target.value,
          item : item,
          type : type
        });
      }
      else if (evt.target.name.startsWith('svgMargin')) {
        var suffix = evt.target.name.replace("svgMargin", "").toLowerCase();
        let svgMargin = {...this.state.svgMargin};
        svgMargin[suffix] = evt.target.value;
        this.setState({ 
          svgMargin : svgMargin
        });
      }
      else {
        this.setState({ 
          [evt.target.name] : evt.target.value 
        });
      }
    }
    else {
      this.setState({ [evt.name] : evt });
    }
    // if evt.target.name == input, then construct a new "item" and "type" and setState with them)
  }
  
  handleSubmit(evt) {
    evt.preventDefault();
    alert(JSON.stringify(this.state));
  }
  
  handleClick(evt) {
    //console.log("handleClick", evt.target.name)
    evt.preventDefault();
    if (evt.target.name == "random") {
      this.loadRandomItem();
    }
  }
  
  loadRandomItem() {
    var sample = this.constants.getRandomItem;
    var item = sample.item;
    var mode = sample.mode;
    this.setState({
      input: item.sequences || item,
      title: item.identifier || '',
      mode:  mode,
      item:  item
    });
  }
  
  onKeyPress(evt) {
    if (evt.which === 13 /* Enter */) {
      evt.preventDefault();
    }
  }
  
  componentDidMount() {
    this.loadRandomItem();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">react-seqlogo-demo</h1>
        </header>
        <div id="main" className="App-body">
          <SplitPane minSize={200} maxSize={300} split="vertical">
            <div className="App-pane App-leftPane">
              <div className="App-input">
                <form onSubmit={this.handleSubmit} onKeyPress={this.onKeyPress}>
                  <h4 className="App-input-title">Input</h4>
                  <h6>Title</h6>
                  <input 
                    type="text" 
                    name="title" 
                    value={this.state.title} 
                    onChange={this.handleChange} />
                  <h6>FASTA or MEME motif</h6>
                  <Textarea 
                    name="input"
                    className="App-input-textarea"
                    inputRef={tag => (this.textarea = tag)}
                    minRows={10}
                    maxRows={10}
                    onChange={this.handleChange}
                    value={this.state.input} />
                  <button 
                    className="App-input-button"
                    name="random" 
                    value="random" 
                    onClick={this.handleClick}>Random sample</button>
                    
                  <h4>Type</h4>
                  <Select
                    name="form-type-name"
                    className="App-input-select"
                    value={this.state.type}
                    clearable={false}
                    onChange={this.handleChange}
                    options={this.constants.types} />
                    
                  <h4>Coloring</h4>
                  <Select
                    name="form-color-name"
                    className="App-input-select"
                    value={this.state.colorScheme}
                    clearable={false}
                    onChange={this.handleChange}
                    options={this.constants.colorSchemes} />
                    
                  <h4>SVG attributes</h4>
                  <label>
                    <h6>Width</h6>
                    <input type="text" name="svgWidth" value={this.state.svgWidth} onChange={this.handleChange} />
                  </label>
                  <label>
                    <h6>Height</h6>
                    <input type="text" name="svgHeight" value={this.state.svgHeight} onChange={this.handleChange} />
                  </label>
                  <label>
                    <h6>Letter width</h6>
                    <input type="text" name="svgLetterWidth" value={this.state.svgLetterWidth} onChange={this.handleChange} />
                  </label>
                  <label>
                    <h6>Letter height</h6>
                    <input type="text" name="svgLetterHeight" value={this.state.svgLetterHeight} onChange={this.handleChange} />
                  </label>
                  <label>
                    <h6>Margin top</h6>
                    <input type="text" name="svgMarginTop" value={this.state.svgMargin.top} onChange={this.handleChange} />
                  </label>
                  <label>
                    <h6>Margin right</h6>
                    <input type="text" name="svgMarginRight" value={this.state.svgMargin.right} onChange={this.handleChange} />
                  </label>
                  <label>
                    <h6>Margin bottom</h6>
                    <input type="text" name="svgMarginBottom" value={this.state.svgMargin.bottom} onChange={this.handleChange} />
                  </label>
                  <label>
                    <h6>Margin left</h6>
                    <input type="text" name="svgMarginLeft" value={this.state.svgMargin.left} onChange={this.handleChange} />
                  </label>
                  <label>
                    <h6>Y-axis ticks</h6>
                    <input type="text" name="yAxisTicks" value={this.state.yAxisTicks} onChange={this.handleChange} />
                  </label>
                  
                </form>
              </div>
            </div>
            <div className="App-pane App-rightPane">
              <SequenceLogo
                title={this.state.title}
                mode={this.state.mode}
                colorScheme={this.state.colorScheme.value}
                item={this.state.item}
                type={this.state.type.value}
                svgWidth={this.state.svgWidth}
                svgHeight={this.state.svgHeight}
                svgLetterWidth={this.state.svgLetterWidth}
                svgLetterHeight={this.state.svgLetterHeight}
                svgMargin={this.state.svgMargin}
                yAxisTicks={this.state.yAxisTicks} />
            </div>
          </SplitPane>
        </div>
      </div>
    )
  }
}

export default App;