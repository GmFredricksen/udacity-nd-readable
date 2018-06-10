import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CommentIcon from '@material-ui/icons/Comment';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import fecha from 'fecha';

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
    const { classes, post } = this.props;

    return (
      post ?
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                <FaceIcon />
              </Avatar>
            }
            action={<MenuOfActionsOnEntity />}
            title={<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>}
            subheader={<Link to={`/${post.category}/${post.id}`}>{fecha.format(post.timestamp, 'mediumDate')} - <em>{post.author}</em></Link>}
          />

          <CardContent>
            <Typography component="p">
              {post.body}
            </Typography>
          </CardContent>

          <CardActions className={classes.postActions} disableActionSpacing>
            <VotingSystem voteScore={post.voteScore} />
            <IconButton aria-label="Comments" component={Link} to={`/${post.category}/${post.id}`}>
              <Badge badgeContent={post.commentCount} color="secondary">
                <CommentIcon />
              </Badge>
            </IconButton>
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

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
