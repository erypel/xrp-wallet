import React from 'react';
import {
  AppBar,
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
      <div className={classes.flex}/>
      <CreateWalletButton />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(AppHeader);
