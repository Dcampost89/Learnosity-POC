import React, { Component } from 'react'
import LearnosityService from '../LearnosityService';

class Item extends Component {

  constructor (props) {
    super(props);

    this.authApp = null;

    this.initItemEditor = this.initItemEditor.bind(this);
    this.onSaveItems = this.onSaveItems.bind(this);
  }

  componentDidMount () {
    this.initItemEditor()
  }

  async initItemEditor () {
    const learnosityService = new LearnosityService();
    this.authApp = await learnosityService.initItemsEditor();
    /* this.authApp.createItem();
    this.props.onSave("item", this.authApp.getItem())
    this.authApp.on('save:success', this.onSaveItems) */
  }

  onSaveItems (event) {
    console.log('[onSaveItems]', event.data);
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
