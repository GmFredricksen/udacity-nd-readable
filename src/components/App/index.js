import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddPostIcon from '@material-ui/icons/PlaylistAdd';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowVoteDown from '@material-ui/icons/ArrowDropDown';
import ArrowVoteUp from '@material-ui/icons/ArrowDropUp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import './App.css';

const drawerWidth = 240;
const modalWidth = 500;
const styles = (theme) => ({
  actions: {
    display: 'flex',
    'justify-content': 'space-between',
  },
  addPostModal: {
    position: 'absolute',
    top: '30%',
    left: `calc(50% - ${modalWidth/2}px)`,
    transform: `translate(-30%, -calc(50% - ${modalWidth/2}px))`,
    width: modalWidth,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  appBar: {
    display: 'flex',
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  commentsListBox: {
    marginTop: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
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
  sortingPostsTabs: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2,
  },
  toolbar: theme.mixins.toolbar,
  voteControls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
})

class App extends Component {
  state = {
    anchorElement: null,
    mobileOpen: false,
    selectedSortingMethod: 0,
    isCreatePostModalOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  // edit/delete menu handlers
  handleOpenEditDeleteMenu = event => {
    this.setState({ anchorElement: event.currentTarget });
  };
  handleCloseEditDeleteMenu = () => {
    this.setState({ anchorElement: null });
  };
  
  // sorting method handler
  handleChangeSortingMethod = (event, value) => {
    this.setState({ selectedSortingMethod: value });
  };

  // open/close create post modal
  handleOpenCreatePostModal = () => {
    this.setState({ isCreatePostModalOpen: true });
  };
  handleCloseCreatePostModal = () => {
    this.setState({ isCreatePostModalOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { anchorElement, isCreatePostModalOpen, mobileOpen, selectedSortingMethod } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar}/>
        <Divider />
        <List component="nav">
          <ListItem button component={Link} to="/">
            <ListItemText primary="All" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/cat1">
            <ListItemText primary="Category 1" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/cat2">
            <ListItemText primary="Category 2" />
          </ListItem>
        </List>
      </div>
    );

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
                onClick={this.handleOpenCreatePostModal}
              >
                <AddPostIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>

          <Route exact path="/" render={() => (
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Paper className={classes.sortingPostsTabs}>
                <Tabs
                  value={selectedSortingMethod}
                  onChange={this.handleChangeSortingMethod}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Popular" />
                  <Tab label="Recent" />
                </Tabs>
              </Paper>
              <Grid container justify='center' spacing={8}>
                <Grid item xs={12}>
                  
                  <Card className={classes.card}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                          <FaceIcon />
                        </Avatar>
                      }
                      action={
                        <IconButton onClick={this.handleOpenEditDeleteMenu}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={<Link to="/cat1/1">Post Title Here</Link>}
                      subheader={<Link to="/cat1/1"><em>September 14, 2016</em></Link>}
                    />

                    <Paper>
                      <Menu
                        id="fade-menu"
                        anchorEl={anchorElement}
                        open={Boolean(anchorElement)}
                        onClose={this.handleCloseEditDeleteMenu}
                        TransitionComponent={Fade}
                      >
                        <MenuItem className={classes.menuItem}>
                          <ListItemIcon className={classes.icon}>
                            <EditIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Edit" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                          <ListItemIcon className={classes.icon}>
                            <DeleteIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Delete" />
                        </MenuItem>
                      </Menu>
                    </Paper>

                    <CardActions className={classes.actions} disableActionSpacing>
                      <div className={classes.voteControls}>
                        <IconButton aria-label="Vote-Up">
                          <ArrowVoteUp />
                        </IconButton>
                        <Typography variant='button' color='inherit' noWrap>
                          12
                        </Typography>
                        <IconButton aria-label="Vote-Down">
                          <ArrowVoteDown />
                        </IconButton>
                      </div>
                      <IconButton aria-label="Comments" component={Link} to="cat1/1">
                        <Badge badgeContent={999} color="secondary">
                          <CommentIcon />
                        </Badge>
                      </IconButton>
                    </CardActions>
                  </Card>

                </Grid>
              </Grid>
            </main>
          )} />

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isCreatePostModalOpen}
            onClose={this.handleCloseCreatePostModal}
          >
            <div className={classes.addPostModal}>
              <Typography variant="title" id="modal-title">
                Add new Post
              </Typography>
              
              <form className={classes.container} autoComplete="off">
                <FormGroup>
                  <TextField
                    id="postTitle"
                    label="Post Title"
                    className={classes.textField}
                    margin="normal"
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    id="postMessage"
                    label="Message"
                    className={classes.textField}
                    margin="normal"
                    multiline
                  />
                </FormGroup>
                <FormGroup>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Category</InputLabel>
                    <Select value={0}>
                      <MenuItem value={1}>Category 1</MenuItem>
                      <MenuItem value={2}>Category 2</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <Button
                    className={classes.button}
                    color="default"
                    onClick={this.handleCloseCreatePostModal}
                  >
                    Cancel
                  </Button>
                  <Button className={classes.button} color="primary">
                    Add
                  </Button>
                </FormGroup>
              </form>
            </div>
          </Modal>

          <Route exact path="/cat1/1" render={() => (
            <section className={classes.content}>
              <div className={classes.toolbar} />
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      <FaceIcon />
                    </Avatar>
                  }
                  action={
                    <IconButton onClick={this.handleOpenEditDeleteMenu}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Post Title Here"
                  subheader="September 14, 2016"
                />

                <Paper>
                  <Menu
                    id="fade-menu"
                    anchorEl={anchorElement}
                    open={Boolean(anchorElement)}
                    onClose={this.handleCloseEditDeleteMenu}
                    TransitionComponent={Fade}
                  >
                    <MenuItem className={classes.menuItem}>
                      <ListItemIcon className={classes.icon}>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Edit" />
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                      <ListItemIcon className={classes.icon}>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Delete" />
                    </MenuItem>
                  </Menu>
                </Paper>

                <CardContent>
                  <Typography component="p">
                    Post Content Here
                  </Typography>
                </CardContent>

                <CardActions className={classes.actions} disableActionSpacing>
                  <div className={classes.voteControls}>
                    <IconButton aria-label="Vote-Up">
                      <ArrowVoteUp />
                    </IconButton>
                    <Typography variant='button' color='inherit' noWrap>
                      12
                    </Typography>
                    <IconButton aria-label="Vote-Down">
                      <ArrowVoteDown />
                    </IconButton>
                  </div>
                </CardActions>
              </Card>

              <Paper className={classes.commentsListBox}>
                <List
                  subheader={<ListSubheader component="div">Comments: 999</ListSubheader>}
                >
                  <Divider />
                  <ListItem divider>
                    <div className={classes.voteControls}>
                      <IconButton aria-label="Vote-Up">
                        <ArrowVoteUp />
                      </IconButton>
                      <Typography variant='button' color='inherit' noWrap>
                        12
                      </Typography>
                      <IconButton aria-label="Vote-Down">
                        <ArrowVoteDown />
                      </IconButton>
                    </div>
                    <ListItemText
                      primary="1st Comment"
                      secondary="Author - September 14, 2016"
                    />
                    <IconButton onClick={this.handleOpenEditDeleteMenu}>
                      <MoreVertIcon />
                    </IconButton>
                  </ListItem>
                </List>
              </Paper>
            </section>
          )} />

        </div>
      </Router>
    );
  }
};

export default withStyles(styles)(App);
