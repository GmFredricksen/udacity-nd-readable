import React, { Component } from 'react';
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
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <FaceIcon />
            </Avatar>
          }
          action={<MenuOfActionsOnEntity />}
          title={<Link to="/cat1/1">Post Title Here</Link>}
          subheader={<Link to="/cat1/1"><em>September 14, 2016</em></Link>}
        />

        <CardContent>
          <Typography component="p">
            Post Content Here
          </Typography>
        </CardContent>

        <CardActions className={classes.postActions} disableActionSpacing>
          <VotingSystem />
          <IconButton aria-label="Comments" component={Link} to="cat1/1">
            <Badge badgeContent={999} color="secondary">
              <CommentIcon />
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);