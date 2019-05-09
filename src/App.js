import React, { Component } from 'react';
import Preview from './components/Preview';
import Item from './components/Item';
import Activity from './components/Activity'
import Report from './components/Report';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      activity: "",
      items: [],
      session: null,
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
    } else if (this.state.currenView === "preview") {
      ComponentToRender = Preview;
    } else {
      ComponentToRender = Report;
    }
    return (
      <div>
        <ComponentToRender 
          onSave={this.updateContext} 
          activity={this.state.activity} 
          items={this.state.items}
          session={this.state.session} 
        />
      </div>
    )
  }
}

export default App;
