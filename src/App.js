import React, { Component } from 'react';
import Preview from './components/Preview';
import Item from './components/Item';
import Activity from './components/Activity'

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      questions: [],
      item: "",
      activity: "",
      currenView: "item"
    };

    this.updateContext = this.updateContext.bind(this);
  }

  updateContext (key, value) {
    this.setState({
      [key]: value
    })
  }

  render () {
    let ComponentToRender = null;

    if (this.state.currenView === "item") {
      ComponentToRender = Item;
    } else if (this.state.currenView === "activity") {
      ComponentToRender = Activity;
    } else {
      ComponentToRender = Preview;
    }
    return (
      <div>
        <div>
          <ul>
            <li><a onClick={() => this.updateContext("currenView", "item")}>Item Editor</a></li>
            <li><a onClick={() => this.updateContext("currenView", "activity")}>Activity Editor</a></li>
            <li><a onClick={() => this.updateContext("currenView", "preview")}>Preview</a></li>
          </ul>
        </div>
        <hr />
        <ComponentToRender 
          onSave={this.updateContext} 
          activity={this.state.activity} 
          item={this.state.item} 
        />
      </div>
    )
  }
}

export default App;
