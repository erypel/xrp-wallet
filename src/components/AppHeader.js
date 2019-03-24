import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

import CreateWalletButton from './CreateWalletButton';

const styles = {
  flex: {
    flex: 1,
  },
};

const AppHeader = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        XRP Wallet
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/transactions">Transaction History</Button>
      <div className={classes.flex}/>
      <CreateWalletButton />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(AppHeader);
