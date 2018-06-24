import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const NotFound = ({ classes }) => (
  <section className={classes.content}>
    <div className={classes.toolbar} />

    <Card className={classes.card}>
      <CardContent>
        <Typography component="p">
          404 - Unfortunately what you look for no longer exists!
        </Typography>
      </CardContent>
    </Card>
  </section>
);

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
