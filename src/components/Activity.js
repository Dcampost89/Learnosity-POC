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
    this.authApp.on('save:activity:success',  this.onSaveActivity);
  }

  onSaveActivity (event) {
    console.log('save:activity:success', event.data);
    this.props.onSave("activity", event.data);
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
