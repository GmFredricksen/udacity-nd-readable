import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCategories } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import AddPostIcon from '@material-ui/icons/PlaylistAdd';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CategoriesDrawer from '../CategoriesDrawer';
import PostsList from '../PostsList';
import PostDetails from '../PostDetails';
import PostModal from '../PostModal';

import './App.css';

const drawerWidth = 240;
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    display: 'flex',
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navBarTitle: {
    flex: 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navIconAddPost: {

  },
  paper: {
    padding: '15px',
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
})

class App extends Component {
  state = {
    isMobileOpen: false,
    isCreatePostModalOpen: true,
  };

  componentDidMount() {
    this.props.getCategories();
  }

  handleDrawerToggle = () => {
    this.setState({ isMobileOpen: !this.state.isMobileOpen });
  }

  // open/close create post modal
  handleOpenCreatePostModal = () => {
    this.setState({ isCreatePostModalOpen: true });
  };
  handleCloseCreatePostModal = () => {
    this.setState({ isCreatePostModalOpen: false });
  };

  render() {
    const { categories, classes } = this.props;
    const { isCreatePostModalOpen, isMobileOpen } = this.state;

    return (
      <Router>
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}>
                <MenuIcon />
              </IconButton>
              <Typography variant='title' color='inherit' className={classes.navBarTitle} noWrap>
                GM - Readable
              </Typography>
              <IconButton
                color='inherit'
                aria-label='add post'
                className={classes.navIconAddPost}
                component={Link}
                to='/create'
              // onClick={this.handleOpenCreatePostModal}
              >
                <AddPostIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <CategoriesDrawer
            handleDrawerToggle={this.handleDrawerToggle}
            isMobileOpen={isMobileOpen}
            categories={categories}
          />

          <Route exact path="/" render={() => (
            <PostsList />
          )} />

          <Route exact path="/:category" render={({ match }) => (
            <PostsList category={match.params.category} />
          )} />

          <Route exact path="/create" render={() => (
            <PostModal
              isCreatePostModalOpen={isCreatePostModalOpen}
              handleCloseCreatePostModal={this.handleCloseCreatePostModal}
            />
          )} />

          <Route exact path="/:category/:post_id" render={({ match }) => (
            <PostDetails postId={match.params.post_id} />
          )} />

        </div>
      </Router>
    );
  }
}

App.propTypes = {
  categories: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

function mapStateToProps({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      ReadableAPI.getCategories()
        .then((categories) => dispatch(setCategories(categories)));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(App));
