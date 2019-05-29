import React, { Component } from 'react'
import './styles.css';
import { 
    Grid, 
    Button, 
    AppBar,
    Toolbar
} from '@material-ui/core'
import LearnosityService from '../LearnosityService';
import ItemPreview from './ItemPreview';
import Modal from './Modal';
import uuid from 'uuid/v4';

class Item extends Component {

  constructor (props) {
    super(props);

    this.state = {
      items: [],
      shouldModalOpen: false,
      itemToEditReference: null,
      itemToEditWidgetReference: null,
      isEditingItem: false
    }

    this.itemPreviewsArray = [];
    this.onSaveItems = this.onSaveItems.bind(this);
    this.onGoToAssesment = this.onGoToAssesment.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  onSaveItems (newItem) {
    const oldItems = this.state.items;
    let newItems = [];
    let isEditingAnItem = false;

    const itemIndex = oldItems.findIndex(({item}) => item.reference === newItem.item.reference);

    if (itemIndex > -1) {
      newItems = [...oldItems]
      newItems[itemIndex] = newItem;
      isEditingAnItem = true;
    } else {
      newItems = oldItems.concat(newItem);
    }

    this.setState({
      shouldModalOpen: false,
      items: newItems,
      isEditing: false,
      itemToEditReference: null,
      itemToEditWidgetReference: null
    }, () => {
      if (!isEditingAnItem) {
        this.initItemPreview(newItem.item.reference)
      } else {
        this.refreshItemPreview(itemIndex);
      }
    })
  }

  initItemPreview (itemReference) {
    const learnosityService = new LearnosityService();
    const activityId = uuid();
    const sessionId = uuid();
    const itemsArray = [itemReference];
    const request =  learnosityService.initItemPReview(activityId, sessionId, itemsArray);
    const itemsApp = window.LearnosityItems.init(
      request,
      {
        readyListener: () => {
          console.log('[ItemPreview] initialized');
        }
      }
    )

    const itemPreview = {
      activityId,
      sessionId,
      itemsArray,
      preview: itemsApp
    }

    this.itemPreviewsArray.push(itemPreview);
  }

  refreshItemPreview (itemIndex) {
    const { activityId, sessionId, itemsArray, preview } = this.itemPreviewsArray[itemIndex];
    const learnosityService = new LearnosityService();
    const request =  learnosityService.initItemPReview(activityId, sessionId, itemsArray);
    preview.reset();
    const itemsApp = window.LearnosityItems.init(request, {
      readyListener: () => {
        console.log('[ItemPreview] initialized');
      }
    });
    this.itemPreviewsArray[itemIndex].preview = itemsApp;
  }

  onGoToAssesment () {
    this.props.onSave("items", this.state.items);
    this.props.onSave("currenView", "preview");
  }

  onAddItem () {
    this.setState({
      shouldModalOpen: true
    })
  }

  onEditItem (itemKey) {
    const {item} = this.state.items[itemKey];
    this.setState({
      shouldModalOpen: true,
      isEditing: true,
      itemToEditReference: item.reference,
      itemToEditWidgetReference: item.definition.widgets[0].reference
    })
  }

  onRemoveItem (itemKey) {
    const oldItems = [...this.state.items];
    oldItems.splice(itemKey);
    this.setState({
      items: oldItems
    }, () => {
      this.itemPreviewsArray.splice(itemKey);
    })
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
          {
            this.state.items.map((item, key) => (
              <ItemPreview 
                key={item.item.reference}
                itemReference={item.item.reference}
                editItem={() => this.onEditItem(key)}
                removeItem={() => this.onRemoveItem(key)}
              />
            ))
          }
        </Grid>

        { 
          this.state.shouldModalOpen &&  
          <Modal 
            itemReference={this.state.itemToEditReference} 
            widgetReference={this.state.itemToEditWidgetReference}
            isEditing={this.state.isEditingItem} 
            saveItems={this.onSaveItems}
          />
        }
      </React.Fragment>
    )
  }
}

export default Item
