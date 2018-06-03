import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowVoteDown from '@material-ui/icons/ArrowDropDown';
import ArrowVoteUp from '@material-ui/icons/ArrowDropUp';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

const styles = (theme) => ({
  addCommentForm: {
    padding: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
  },
  commentsListBox: {
    marginTop: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class PostDetails extends Component {
  state = {
    anchorElement: null,
  };

  render() {
    const { classes } = this.props;
    const { anchorElement } = this.state;

    return (
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

        <Paper className={classes.addCommentForm}>
          <Typography variant="headline" component="h5">
            Add new Comment
          </Typography>

          <form className={classes.container} autoComplete="off">
            <FormGroup>
              <TextField
                id="authorName"
                label="Author"
                className={classes.textField}
                margin="normal"
              />
            </FormGroup>
            <FormGroup>
              <TextField
                id="commentMessage"
                label="Message"
                className={classes.textField}
                margin="normal"
                multiline
              />
            </FormGroup>
            <FormGroup>
              <Button className={classes.button} color="primary">
                Add Comment
              </Button>
            </FormGroup>
          </form>
        </Paper>

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
    );
  }
}

export default withStyles(styles)(PostDetails);
