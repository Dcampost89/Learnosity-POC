import React, { Component } from 'react'
import LearnosityService from '../LearnosityService';

class Item extends Component {

  constructor (props) {
    super(props);

    this.authApp = null;
    this.editorApp = null;

    this.initItemEditor = this.initItemEditor.bind(this);
    this.onSaveItems = this.onSaveItems.bind(this);
  }

  componentDidMount () {
    this.initItemEditor()
  }

  async initItemEditor () {
    const learnosityService = new LearnosityService();
    this.authApp = await learnosityService.initItemsEditor();
    // this.editorApp = this.authApp.editorApp();
    this.authApp.on('save:success', this.onSaveItems)
  }

  onSaveItems (event) {
    console.log('[onSaveItems]', event);
    // this.props.onSave("item", event.data.item.reference)
    this.props.onSave("currenView", "activity");
  }
  render () {
    return (
      <section>
        <div id="learnosity-author">Estamos en Item</div>
      </section>
    )
  }
}

export default Item
