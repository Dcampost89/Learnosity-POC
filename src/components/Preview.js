import React, { Component } from 'react';
import LearnosityService from '../LearnosityService';

class Preview extends Component {

  componentDidMount () {
    const learnosity = new LearnosityService();
    learnosity.preview(this.props.activity, this.props.items)
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
