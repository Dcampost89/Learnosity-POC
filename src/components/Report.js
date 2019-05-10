import React, { Component } from 'react'
import LearnosityService from '../LearnosityService';
import { Grid } from '@material-ui/core';

class Report extends Component {

  constructor (props) {
    super(props);

    this.state = {}

    this.reportsApi = null;
  }

  componentDidMount () {
    const learnosity = new LearnosityService();
    const request = learnosity.initReportView(this.props.session);

    window.LearnosityReports.init(request, {
      readyListener: () => {
        console.log('reports api ready')
      }
    });
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid md={10} className="learnosity-report" id="report-1"></Grid>
      </Grid>
    )
  }
}

export default Report
