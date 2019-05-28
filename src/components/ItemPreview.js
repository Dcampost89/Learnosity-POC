import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Grid
} from '@material-ui/core';

function ItemPreview({itemReference, editItem, removeItem}) {
  return (
    <Grid item xs={8}>
      <Card>
        <CardContent>
          <span className="learnosity-item" data-reference={itemReference}></span>
        </CardContent>
        <CardActions>
          <Button onClick={editItem}>Edit</Button>
          <Button onClick={removeItem}>Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default  ItemPreview;
