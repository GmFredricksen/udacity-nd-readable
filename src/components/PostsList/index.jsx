import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as ReadableAPI from '../../utils/ReadableAPI';
import Grid from '@material-ui/core/Grid';

import Post from '../Post';
import SortingBar from '../SortingBar';

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

class PostsList extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    if ( this.props.category ) {
      ReadableAPI.getPostsForCategory(this.props.category)
        .then((posts) => this.setState({ posts }));
    } else {
      ReadableAPI.getPosts()
        .then((posts) => this.setState({ posts }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category) {
      ReadableAPI.getPostsForCategory(nextProps.category)
        .then((posts) => this.setState({ posts }));
    }
  }

  render() {
    const { classes } = this.props;
    const { posts } = this.state;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <SortingBar />

        <Grid container justify='center' spacing={8}>
          {posts.length ?
            posts.map((post) => (
              <Grid key={post.id} item xs={12}>
                <Post post={post} />
              </Grid>
            )) : ''
          }
        </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(PostsList);
