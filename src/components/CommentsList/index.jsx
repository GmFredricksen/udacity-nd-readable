import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCommentsForPost } from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import * as ReadableAPI from '../../utils/ReadableAPI';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import Comment from '../Comment';

const styles = (theme) => ({
  postActions: {
    display: 'flex',
    'justify-content': 'space-between',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class CommentsList extends Component {
  componentDidMount() {
    this.props.getCommentsOfPost(this.props.post.id)
  }

  render() {
    const { comments, post } = this.props;

    return (
      <List
        subheader={<ListSubheader component="div">Comments: {post.commentCount}</ListSubheader>}
      >
        <Divider />
        {(comments[post.id] && comments[post.id].length) ?
          comments[post.id].map((comment) => <Comment key={comment.id} comment={comment} />)
          :
          <Typography component="p">
            No comments available
          </Typography>
        }
      </List>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCommentsOfPost: (postId) => {
      ReadableAPI.getCommentsOfPost(postId)
        .then((comments) => dispatch(setCommentsForPost(comments, postId)));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentsList));
