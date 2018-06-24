import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { setPosts, sortPosts } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';
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
      this.props.getPosts(this.props.category, this.props.selectedSortingMethod);
    } else {
      this.props.getPosts('', this.props.selectedSortingMethod);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      this.props.getPosts(nextProps.category, this.props.selectedSortingMethod);
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
            ))
            :
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography component="p">
                    No Posts to show
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
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
  selectedSortingMethod: PropTypes.string.isRequired,
};

const mapStateToProps = ({ posts, sorting }) => ({
  posts,
  selectedSortingMethod: sorting.selectedSortingMethod,
})

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (category, sortingMethod) => {
      ReadableAPI.getPosts(category)
        .then((posts) => {
          dispatch(setPosts(posts));
          dispatch(sortPosts(sortingMethod));
        });
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostsList));
