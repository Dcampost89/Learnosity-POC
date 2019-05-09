import React, { Component } from 'react'
import LearnosityService from '../LearnosityService';
import uuid from 'uuid/v4';

class Report extends Component {

  constructor (props) {
    super(props);

    this.state = {}

    this.reportsApi = null;
  }

  componentDidMount () {
    const request = LearnosityService.initReportView(this.props.session);

    window.LearnosityReports.init(request, {
      readyListener: () => {
        console.log('reports api ready')
      }
    });
  }

  render() {
    return (
      <div>
        <span class="learnosity-report"></span>
      </div>
    )
  }
}

export default Report
