import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import fecha from 'fecha';

import * as ReadableAPI from '../../utils/ReadableAPI';
import { updateCommentVote } from '../../actions';
import MenuOfActionsOnEntity from '../MenuOfActionsOnEntity';
import VotingSystem from '../VotingSystem';

const Comment = ({ comment, updateCommentVote }) => (
  <ListItem divider>
    <VotingSystem
      updateVote={updateCommentVote}
      voteScore={comment.voteScore}
    />
    <ListItemText
      primary={comment.body}
      secondary={`${comment.author} - ${fecha.format(comment.timestamp, 'mediumDate')}`}
    />
    <MenuOfActionsOnEntity />
  </ListItem>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  updateCommentVote: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateCommentVote: (voteScore) => {
      ReadableAPI.updateCommentVote(ownProps.comment.id, voteScore)
        .then((comment) => dispatch(updateCommentVote(comment.id, comment.parentId, comment.voteScore)));
    },
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Comment);
