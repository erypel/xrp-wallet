import React, { Component, Fragment } from 'react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
  withStyles,
  Typography,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import TransactionEditor from '../components/TransactionEditor';

const styles = theme => ({
  transactions: {
    marginTop: 2 * theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: 3 * theme.spacing.unit,
    right: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      bottom: 2 * theme.spacing.unit,
      right: 2 * theme.spacing.unit,
    },
  },
});

const API = process.env.REACT_APP_API || 'http://localhost:3001';

class TransactionHistory extends Component {
  state = {
    loading: true,
    transactions: [],
  };

  componentDidMount() {
    this.getTransactions();
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getTransactions() {
    this.setState({ loading: false, transactions: await this.fetch('get', '/posts') });
  }

  saveTransaction = async (transaction) => {
    if (transaction.id) {
      await this.fetch('put', `/transactions/${transaction.id}`, transaction);
    } else {
      await this.fetch('post', '/transactions', transaction);
    }

    this.props.history.goBack();
    this.getTransactions();
  }

  renderTransactionEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const transaction = find(this.state.transactions, { id: Number(id) });

    if (!transaction && id !== 'new') return <Redirect to="/transactions" />;

    return <TransactionEditor transaction={transaction} onSave={this.saveTransaction} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="display1">Transaction History</Typography>
        {this.state.transactions.length > 0 ? (
          <Paper elevation={1} className={classes.transactions}>
            <List>
              {orderBy(this.state.transactions, ['updatedAt', 'destination'], ['desc', 'asc']).map(transaction => (
                <ListItem key={transaction.id} button component={Link} to={`/transactions/${transaction.id}`}>
                  <ListItemText
                    primary={transaction.title}
                    secondary={transaction.updatedAt && `Updated ${moment(transaction.updatedAt).fromNow()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          !this.state.loading && <Typography variant="subheading">No transactions to display</Typography>
        )}
        <Button
          variant="fab"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/transactions/new"
        >
          <AddIcon />
        </Button>
        <Route exact path="/transactions/:id" render={this.renderTransactionEditor} />
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(TransactionHistory);
