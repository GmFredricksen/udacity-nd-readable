import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MenuOfActionsOnEntity from '../MenuOfActionsOnEntity';
import VotingSystem from '../VotingSystem';

class Comment extends Component {
  render() {
    return (
      <ListItem divider>
        <VotingSystem />
        <ListItemText
          primary="1st Comment"
          secondary="Author - September 14, 2016"
        />
        <MenuOfActionsOnEntity />
      </ListItem>
    );
  }
}

export default Comment;
