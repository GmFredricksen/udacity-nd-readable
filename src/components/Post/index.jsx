import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import CommentIcon from '@material-ui/icons/Comment';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import fecha from 'fecha';

import * as ReadableAPI from '../../utils/ReadableAPI';
import { updatePostVote } from '../../actions';
import MenuOfActionsOnEntity from '../MenuOfActionsOnEntity';
import VotingSystem from '../VotingSystem';

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

class Post extends Component {
  render() {
    const { classes, isFromDetail, post, updatePostVote } = this.props;

    return (
      post ?
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                <FaceIcon />
              </Avatar>
            }
            action={<MenuOfActionsOnEntity entityToBeAffected={post} />}
            title={isFromDetail ?
              <h1>{post.title}</h1>
              :
              <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
            }
            subheader={isFromDetail ?
              <h4>{fecha.format(post.timestamp, 'mediumDate')} - <em>Author: {post.author}</em></h4>
              :
              <Link to={`/${post.category}/${post.id}`}>{fecha.format(post.timestamp, 'mediumDate')} - <em>Author: {post.author}</em></Link>
            }
          />

          <CardContent>
            <Typography component="p">
              {post.body}
            </Typography>
          </CardContent>

          <CardActions className={classes.postActions} disableActionSpacing>
            <VotingSystem
              updateVote={updatePostVote}
              voteScore={post.voteScore}
            />
            <Link aria-label="Comments" to={`/${post.category}`}>
              <Chip label={post.category} className={classes.chip} />
            </Link>
            {!isFromDetail &&
              <IconButton aria-label="Comments" component={Link} to={`/${post.category}/${post.id}`}>
                <Badge badgeContent={post.commentCount} color="secondary">
                  <CommentIcon />
                </Badge>
              </IconButton>
            }
          </CardActions>
        </Card>
        :
        <Card className={classes.card}>
          <CardContent>
            <Typography component="p">
              No Post infos to show
            </Typography>
          </CardContent>
        </Card>
    );
  }
}

Post.defaultProps = {
  isFromDetail: false,
  post: null,
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  isFromDetail: PropTypes.bool,
  post: PropTypes.object,
  updatePostVote: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updatePostVote: (voteScore) => {
      ReadableAPI.updatePostVote(ownProps.post.id, voteScore)
        .then((post) => dispatch(updatePostVote(post.id, post.voteScore)));
    },
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Post));
