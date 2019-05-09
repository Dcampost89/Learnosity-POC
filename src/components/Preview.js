import React, { Component } from 'react';
import LearnosityService from '../LearnosityService';
import uuid from 'uuid/v4';

class Preview extends Component {

  constructor(props) {
    super(props);

    this.itemsApp = null;

    this.state = {
      sessionId: null
    }

    this.initAssesment = this.initAssesment.bind(this);
    this.goToReports = this.goToReports.bind(this);
  }

  componentDidMount () {
    this.initAssesment()
  }

  initAssesment () {
    const learnosity = new LearnosityService();
    const items = this.props.items.map(item => item.reference);
    const activityId = uuid();
    const sessionId = uuid(); 
    const request = learnosity.preview(activityId, items, sessionId);
    // Render the item-edit widget
    this.itemsApp = window.LearnosityItems.init(
      request, 
      { 
        readyListener: () => {
          console.log('[success] itemsApp initialized');
          this.setState({
            sessionId
          })

          this.itemsApp.on("test:finished:submit", () => this.goToReports)
        } 
      }
    )
  }

  goToReports () {
    console.log('[goToReports]')
    this.props.onSave({
      "session": this.state.sessionId
    })

    this.props.onSave({
      "currenView": "report"
    })
  }

  render() {
    return (
      <section>
        <div id="learnosity_assess"></div>
      </section>
    )
  }
}

export default Preview
