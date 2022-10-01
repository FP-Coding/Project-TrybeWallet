import React, { Component } from 'react';
import { string, shape, arrayOf, number, func } from 'prop-types';
import { connect } from 'react-redux';
import roundNumber from '../helpers/roundNumber';
import { editExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, toRemoveExpense, toEditExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            (expense) => {
              const {
                id,
                currency,
                exchangeRates,
                description,
                value,
                tag,
                method,
              } = expense;
              const valueExpense = Number(value);
              const valueCurrency = parseFloat(exchangeRates[currency].ask);
              const valorConvertido = valueExpense * valueCurrency;
              const nameCoin = exchangeRates[currency].name;
              return ((
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{roundNumber(valueExpense)}</td>
                  <td>{nameCoin}</td>
                  <td>{roundNumber(valueCurrency)}</td>
                  <td>
                    {roundNumber(valorConvertido)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => toEditExpense(id) }
                      data-testid="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={ () => toRemoveExpense(expense) }
                      data-testid="delete-btn"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ));
            },
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: arrayOf(shape({
    id: number,
    currency: string,
    exchangeRates: shape({ USD: shape({
      ask: string,
      name: string,
    }) }),
    description: string,
    value: string,
    tag: string,
    method: string,
  })),
  toRemoveExpense: func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  toRemoveExpense: (expenseToBeRemoved) => dispatch(removeExpense(expenseToBeRemoved)),
  toEditExpense: (idExpenseToBeEdited) => dispatch(editExpense(idExpenseToBeEdited)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
