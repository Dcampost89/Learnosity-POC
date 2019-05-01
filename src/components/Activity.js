import React, { Component } from 'react'
import LearnosityService from '../LearnosityService';

class Activity extends Component {

  constructor (props) {
    super(props);

    this.authApp = null;
    this.initActivityEditor = this.initActivityEditor.bind(this);
    this.onSaveActivity = this.onSaveActivity.bind(this);
  }

  componentDidMount () {
    this.initActivityEditor()
  }

  async initActivityEditor () {
    const learnosityService = new LearnosityService();
    this.authApp = await learnosityService.initActivityEditor();
    const result = this.authApp.setActivityItems([
      {
        "reference": "902ed929-e9ce-4b5a-9d74-7fb69535466d"
      }
    ]);
    console.log('[setActivityItems]', result);
    this.authApp.on('save:activity:success',  this.onSaveActivity);
  }

  onSaveActivity (event) {
    console.log('save:activity:success', event.data);
    const { activity_id, data: { items } } = event.data;
    this.props.onSave("activity", activity_id);
    this.props.onSave("items", items);
    setTimeout(() => this.props.onSave("currenView", "preview"), 2000);
  }

  render() {
    return (
      <section>
        <div id="learnosity-author"></div>
      </section>
    )
  }
}

export default Activity
