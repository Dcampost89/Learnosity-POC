import React, { Component } from 'react'
import LearnosityService from '../LearnosityService';
import { Grid, Paper, Button, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'

class Item extends Component {

  constructor (props) {
    super(props);

    this.authorApp = null;
    this.state = {
      items: []
    }

    this.initItemEditor = this.initItemEditor.bind(this);
    this.onSaveItems = this.onSaveItems.bind(this);
    this.onGoToAssesment = this.onGoToAssesment.bind(this);
  }

  initItemEditor () {
    const learnosityService = new LearnosityService();
    const request =  learnosityService.initItemsEditor();

    this.authorApp = window.LearnosityAuthor.init(
      request, 
      { 
        readyListener: () => {
          // this.authorApp.on('widgetedit:editor:ready', () => {
          //   const itemId = uuid();
          //   this.authorApp.createItem(itemId);
          // });
          this.authorApp.on('save:success', this.onSaveItems);
        } 
      }
    )
  }

  onSaveItems () {
    const newItem = this.authorApp.getItem();
    this.setState({
      items: this.state.items.concat(newItem.item)
    }, () => this.authorApp.destroy())
  }

  onGoToAssesment () {
    this.props.onSave("items", this.state.items);
    this.props.onSave("currenView", "preview");
  }

  render () {
    return (
      <React.Fragment>
        <Grid container justify="center">
          <Grid item md={12}>
            <Button variant="contained" color="primary" onClick={this.initItemEditor}>
              Add Question
            </Button>

            <Button variant="contained" onClick={this.onGoToAssesment}>
              Go to assesment
            </Button>
          </Grid>
          <Grid item md={3}>
            <List
              subheader={<ListSubheader component="div">Added Questions</ListSubheader>}
            >
              {
                this.state.items.map(item => (
                  <ListItem key={item.reference}>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))
              }
            </List>
          </Grid>
          <Grid item md={9}>
            <Paper>
              <div id="learnosity-author"></div>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Item
