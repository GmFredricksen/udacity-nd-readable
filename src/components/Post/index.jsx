import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ArrowVoteDown from '@material-ui/icons/ArrowDropDown';
import ArrowVoteUp from '@material-ui/icons/ArrowDropUp';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  postActions: {
    display: 'flex',
    'justify-content': 'space-between',
  },
  voteControls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

class Post extends Component {
  state = {
    anchorElement: null,
  }

  // edit/delete menu handlers
  handleOpenEditDeleteMenu = event => {
    this.setState({ anchorElement: event.currentTarget });
  };
  handleCloseEditDeleteMenu = () => {
    this.setState({ anchorElement: null });
  };

  render() {
    const { anchorElement } = this.state;
    const { classes } = this.props;

    return (
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

          <CardActions className={classes.postActions} disableActionSpacing>
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
    );
  }
}

export default withStyles(styles)(Post);
