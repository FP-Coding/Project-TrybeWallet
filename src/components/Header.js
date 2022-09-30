import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string } from 'prop-types';
import roundNumber from '../helpers/roundNumber';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce(
      (acc, expense) => {
        const { currency, exchangeRates, value } = expense;
        const valueExpense = Number(value);
        const valueCurrency = Number(exchangeRates[currency].ask);
        return acc + ((valueExpense * valueCurrency));
      },
      0,
    );
    return (
      <header>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">
          {roundNumber(total)}
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

Header.propTypes = {
  email: string,
  expenses: arrayOf(shape({ value: string })),
}.isRequired;

const mapStateToProps = (state) => {
  const { user, wallet } = state;
  return {
    email: user.email,
    expenses: wallet.expenses,
  };
};

export default connect(mapStateToProps)(Header);
