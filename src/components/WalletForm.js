import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, string, number } from 'prop-types';
import { requestApi, addExpense } from '../redux/actions';
import requestApiCurrency from '../helpers/apiCurrencies';

class WalletForm extends Component {
  state = {
    valueInput: '',
    currencyInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'food',
    descriptionInput: '',
  };

  componentDidMount() {
    const { requestApiOfCurrencies } = this.props;
    requestApiOfCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitForm = async (e) => {
    e.preventDefault();
    const { submitWalletForm, expensesLength } = this.props;
    const {
      valueInput: value,
      currencyInput: currency,
      methodInput: method,
      tagInput: tag,
      descriptionInput: description } = this.state;
    const exchangeRates = await requestApiCurrency();
    const expense = { value, currency, method, tag, description, exchangeRates };
    submitWalletForm({ id: expensesLength, ...expense });
    this.setState({
      valueInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'food',
      descriptionInput: '',
    });
  };

  render() {
    const { handleChange, submitForm, props, state } = this;
    const { currencies } = props;
    const {
      valueInput,
      currencyInput,
      methodInput,
      tagInput,
      descriptionInput,
    } = state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="valueInput"
            value={ valueInput }
            id="value-input"
            data-testid="value-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currencyInput"
            id="currency-input"
            data-testid="currency-input"
            value={ currencyInput }
            onChange={ handleChange }
          >
            {currencies.map((symbol) => (
              <option key={ symbol } value={ symbol }>
                {symbol}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            name="methodInput"
            id="method-input"
            value={ methodInput }
            onChange={ handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            name="tagInput"
            id="tag-input"
            value={ tagInput }
            onChange={ handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="descriptionInput"
            id="description-input"
            value={ descriptionInput }
            data-testid="description-input"
            onChange={ handleChange }
          />
        </label>
        <button type="submit" onClick={ submitForm }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: arrayOf(string),
  requestApiOfCurrencies: func,
  expensesLength: number,
  submitWalletForm: func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expensesLength: wallet.expenses.length,
});

const mapDispatchToProps = (dispatch) => ({
  requestApiOfCurrencies: () => dispatch(requestApi()),
  submitWalletForm: (state) => dispatch(addExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
