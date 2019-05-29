import React, { Component } from 'react'
import uuid from 'uuid/v4';
import LearnosityService from '../LearnosityService';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Grid
} from '@material-ui/core';

class ItemPreview extends Component {
  itemsApi = null;
  activitityId = uuid();
  sessionId = uuid();
  learnosityService = new LearnosityService();
  itemsArray = [this.props.item.reference];

  componentDidMount () {
    this.initItemApi()
  }

  shouldComponentUpdate (nextProps) {
    const  { item: updatedItem } = nextProps;
    const { item: oldItem } = this.props;

    const formerUpdateDate = new Date(oldItem.dt_updated).getTime();
    const newUpdateDate = new Date(updatedItem.dt_updated).getTime();

    if (newUpdateDate > formerUpdateDate) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate () {
    this.itemsApi.reset();
    this.initItemApi();
  }

  initItemApi = () => {
    const request =  this.learnosityService.initItemPReview(this.activityId, this.sessionId, this.itemsArray);
    this.itemsApi = window.LearnosityItems.init(request, { 
      readyListener: () => console.log('[itemsApi] initialized') 
    });
  }

  render () {
    const {item, editItem, removeItem} = this.props;

    return (
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <span className="learnosity-item" data-reference={item.reference}></span>
          </CardContent>
          <CardActions>
            <Button onClick={editItem}>Edit</Button>
            <Button onClick={removeItem}>Delete</Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default ItemPreview;
