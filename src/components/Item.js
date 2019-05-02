import React, { Component } from 'react'
import LearnosityService from '../LearnosityService';

class Item extends Component {

  constructor (props) {
    super(props);

    this.authorApp = null;
    this.state = {
      shouldModalOpen: false
    }

    this.initItemEditor = this.initItemEditor.bind(this);
    this.onSaveItems = this.onSaveItems.bind(this);
  }

  componentDidMount () {
    // this.initItemEditor()
  }

  initItemEditor () {
    const learnosityService = new LearnosityService();
    const request =  learnosityService.initItemsEditor();

    this.authorApp = window.LearnosityAuthor.init(
      request, 
      { 
        readyListener: () => {
          console.log('[success] itemEditor initialized');
          this.authorApp.on('render:item', () => {
            this.authorApp.setWidget(
              {}, 
              {"template_reference": "9e8149bd-e4d8-4dd6-a751-1a113a4b9163"}
            );
          });
          this.authorApp.on('save:success', this.onSaveItems);
        } 
      }
    )
  }

  onSaveItems (event) {
    console.log('[onSaveItems]', event);
    // this.authorApp.destroy();
    this.props.onSave("currenView", "activity");
  }

  render () {
    return (
      <section className="container">
        <div className="col-md-12">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={this.initItemEditor}>
            Add Question
          </button>
        </div>
        <br />
        <div className="col-md-12">
          <div id="learnosity-author"></div>
        </div>
      </section>
    )
  }
}

export default Item
