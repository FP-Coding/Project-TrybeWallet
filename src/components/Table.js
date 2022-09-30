import React, { Component } from 'react';
import { string, shape, arrayOf, number } from 'prop-types';
import { connect } from 'react-redux';

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
              const valueCurrency = parseFloat(exchangeRates[currency].ask).toFixed(2);
              const valorConvertido = (Number(value) * Number(exchangeRates[currency].ask)
                .toFixed(2));
              return ((
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{currency}</td>
                  <td>{ valueCurrency }</td>
                  <td>
                    {valorConvertido}
                  </td>
                  <td>{exchangeRates[currency].name}</td>
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
