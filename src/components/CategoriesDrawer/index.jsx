import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
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
    const { categories, classes, handleDrawerToggle, isMobileOpen } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List component="nav">
          <ListItem button component={Link} to="/">
            <ListItemText primary="All" />
          </ListItem>
          <Divider />
          <ListSubheader>Categories</ListSubheader>
          {categories.length ?
            categories.map((category) => (
              <ListItem key={category.name} divider button component={Link} to={`/${category.name}`}>
                <ListItemText primary={category.name} />
              </ListItem>
            )) : ''
          }
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

CategoriesDrawer.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  isMobileOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CategoriesDrawer);
