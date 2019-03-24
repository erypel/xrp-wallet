import React, { Component } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core';

class CreateWalletButton extends Component {
  state = {
    isCreated: false,
    address: null,
    balance: null,
    menuAnchorEl: null,
  };

  isWalletCreated() {
    this.isCreated();
  }

  async isCreated() {
    const isCreated = await this.props.isCreated();
    if(isCreated !== this.state.isCreated) {
      const address = await this.props.getAddress();
      const balance = await this.props.getBalance();
      this.setState({ isCreated, address, balance });
    }
  }

  createWallet = () => this.props.createWallet()

  handleMenuOpen = event => this.setState({ menuAnchorEl: event.currentTarget });
  handleMenuClose = () => this.setState({ menuAnchorEl: null });

  render() {
    const { isCreated, address, balance, menuAnchorEl } = this.state;

    if (!isCreated) return <Button color="inherit" onClick={this.createWallet}>Create Wallet</Button>;

    const menuPosition = {
      vertical: 'top',
      horizontal: 'right',
    };

    return (
      <div>
        <IconButton onClick={this.handleMenuOpen} color="inherit">
          //TODO something goes here
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          anchorOrigin={menuPosition}
          transformOrigin={menuPosition}
          open={!!menuAnchorEl}
          onClose={this.handleMenuClose}
        >
        </Menu>
      </div>
    );
  }
}

export default CreateWalletButton
