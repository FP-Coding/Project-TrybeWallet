import React, { Component } from 'react';
import { string, shape, arrayOf, number } from 'prop-types';
import { connect } from 'react-redux';
import roundNumber from '../helpers/roundNumber';

class Table extends Component {
  render() {
    const { expenses } = this.props;
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
            ({
              id,
              currency,
              exchangeRates,
              description,
              value,
              tag,
              method,
            }) => {
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
                    <button type="button">Editar</button>
                    <button type="button">Remover</button>
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
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
