import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPosts } from '../../actions';
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
  componentDidMount() {
    if (this.props.category) {
      this.props.getPosts(this.props.category);
    } else {
      this.props.getPosts();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      this.props.getPosts(nextProps.category);
    }
  }

  render() {
    const { classes, posts } = this.props;

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

PostsList.propTypes = {
  category: PropTypes.string,
  getPosts: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  posts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (category) => {
      ReadableAPI.getPosts(category)
        .then((posts) => dispatch(setPosts(posts)));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostsList));
