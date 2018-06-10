import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import fecha from 'fecha';

import MenuOfActionsOnEntity from '../MenuOfActionsOnEntity';
import VotingSystem from '../VotingSystem';

const Comment = ({ comment }) => (
  <ListItem divider>
    <VotingSystem voteScore={comment.voteScore} />
    <ListItemText
      primary={comment.body}
      secondary={`${comment.author} - ${fecha.format(comment.timestamp, 'mediumDate')}`}
    />
    <MenuOfActionsOnEntity />
  </ListItem>
);

export default Comment;
