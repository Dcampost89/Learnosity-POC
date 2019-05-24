import React, { Component } from 'react'
import LearnosityService from '../LearnosityService';
import uuid from 'uuid/v4';
import './styles.css';
import { 
    Grid, 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    ListSubheader,
    AppBar,
    Toolbar,
    ListItemSecondaryAction,
    Link
} from '@material-ui/core'

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
    this.onEditItem = this.onEditItem.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  componentDidMount () {
    this.initItemEditor();
  }

  initItemEditor () {
    const learnosityService = new LearnosityService();
    const request =  learnosityService.initItemsEditor();

    this.authorApp = window.LearnosityAuthor.init(
      request, 
      { 
        readyListener: () => {
          // this.authorApp.on('save:success', this.onSaveItems);
          this.authorApp.on("save", this.onSaveItems);
          this.authorApp.on("widgetedit:preview:changed", () => this.authorApp.save());
        } 
      }
    )
  }

  onSaveItems (event) {
    event.preventDefault();
    const newItem = this.authorApp.getItem();
    const { items } = this.state;
    let newItemsArray = [];
    const isTheItemInArray = items.find(item => item.reference === newItem.item.reference);

    if (isTheItemInArray) {
      newItemsArray = items;
    } else {
      newItemsArray = items.concat(newItem.item)
    }

    this.setState({
      items: newItemsArray
    })
  }

  onGoToAssesment () {
    this.props.onSave("items", this.state.items);
    this.props.onSave("currenView", "preview");
  }

  onAddItem () {
    const newRef = uuid();
    this.authorApp.createItem(newRef);
  }

  onEditItem (itemId) {
    this.authorApp.editItem(itemId);
  }

  render () {
    return (
      <React.Fragment>
        <AppBar color="default">
          <Toolbar>
            <Button variant="contained" color="primary" onClick={this.onAddItem}>
              Add Question
            </Button>

            <Button variant="contained" onClick={this.onGoToAssesment}>
              Go to assesment
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container justify="center" spacing={24} style={{marginTop: "70px", padding: "0px 15px"}}>
          <Grid item md={3}>
            <List
              subheader={<ListSubheader component="div">Added Questions</ListSubheader>}
            >
              {
                this.state.items.map(item => (
                  <ListItem key={item.reference}>
                    <ListItemText primary={item.title} />
                    <ListItemSecondaryAction>
                      <Link component="button" onClick={() => this.onEditItem(item.reference)}>Edit</Link>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          </Grid>
          <Grid item md={9}>
            <div id="learnosity-author"></div>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Item
