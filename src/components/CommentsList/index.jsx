import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCommentsForPost } from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import * as ReadableAPI from '../../utils/ReadableAPI';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
        subheader={<ListSubheader component="div">Comments: {comments[post.id] ? comments[post.id].length : 0}</ListSubheader>}
      >
        <Divider />
        {(comments[post.id] && comments[post.id].length) ?
          comments[post.id].map((comment) => <Comment key={comment.id} comment={comment} />)
          :
          <ListItem>
            <Typography component="p">
              No comments available
            </Typography>
          </ListItem>
        }
      </List>
    );
  }
}

CommentsList.propTypes = {
  getCommentsOfPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
};

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
