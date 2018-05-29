import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;
const styles = (theme) => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  toolbar: theme.mixins.toolbar,
});

class CategoriesDrawer extends Component {
  render() {
    const { classes, handleDrawerToggle, isMobileOpen } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
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
      <aside>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={isMobileOpen}
            onClose={handleDrawerToggle}
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
      </aside>
    );
  }
}

export default withStyles(styles)(CategoriesDrawer);
