import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string } from 'prop-types';
import roundNumber from '../helpers/roundNumber';
import LogoTrybeWallet from '../images/TrybeWallet.png';
import ContainerHeader from './css/Header.styled';

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
      <ContainerHeader>
        <div data-testid="email-field">{email}</div>
        <img src={ LogoTrybeWallet } alt="Logo TrybeWallet" />
        <div>
          <span data-testid="total-field">
            {roundNumber(total)}
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </ContainerHeader>
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
