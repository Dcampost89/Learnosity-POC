import React, { Component } from 'react'
import './styles.css';
import { 
    Grid, 
    Button, 
    AppBar,
    Toolbar,
    Card,
    CardActions,
    CardContent
} from '@material-ui/core'
import Modal from './Modal';

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

    this.onSaveItems = this.onSaveItems.bind(this);
    this.onGoToAssesment = this.onGoToAssesment.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  onSaveItems (newItem) {
    console.log('[onSavenewItems]', newItem);
    const oldItems = this.state.items;
    let newItems = [];

    const itemIndex = oldItems.findIndex(({item}) => item.reference === newItem.item.reference);

    if (itemIndex > -1) {
      newItems = [...oldItems]
      newItems[itemIndex] = newItem;
    } else {
      newItems = oldItems.concat(newItem);
    }

    this.setState({
      shouldModalOpen: false,
      items: newItems,
      isEditing: false,
      itemToEditReference: null,
      itemToEditWidgetReference: null
    })
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
            this.state.items.map(({item}, key) => (
              <Grid item md={9} key={item.reference}>
                <Card>
                  <CardContent>
                    {item.reference}
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => this.onEditItem(key)}>Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
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
