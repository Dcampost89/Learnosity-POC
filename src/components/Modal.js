import React from 'react';
import LearnosityService from '../LearnosityService';
import uuid from 'uuid/v4';
import {
  Dialog
} from '@material-ui/core';

function Modal (props) {

  let authorApp = null;
  const itemReference = props.itemReference || uuid();

  const initAuthorApi = () => {
    const learnosityService = new LearnosityService();

    const request =  learnosityService.initItemsEditor(itemReference);
    authorApp = window.LearnosityAuthor.init(
      request, 
      { 
        readyListener: () => {
          bindEvents();
        } 
      }
    )
  }

  const bindEvents = () => {
    authorApp.on('save:success', () => {
      props.saveItems(authorApp.getItem());
    });
    if (props.itemReference) {
      authorApp.navigate(`items/${props.itemReference}/widgets/${props.widgetReference}`);
    } else {
      authorApp.navigate(`items/${itemReference}/widgets/new`);
    }
  }

  return (
    <Dialog 
      open={true} 
      fullWidth={true} 
      maxWidth="md"
      onEntered={initAuthorApi}>
      <div id="learnosity-author"></div>
    </Dialog>
  )
}

export default Modal;


