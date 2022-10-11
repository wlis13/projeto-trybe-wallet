import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newList } from '../redux/actions';

class Table extends Component {
  funcDelet = ({ target: { id } }) => {
    const { expenses, dispatch } = this.props;
    const newLis = expenses.filter((element) => Number(element.id) !== Number(id));
    dispatch(newList(newLis));
  };

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
          {
            expenses.map((itens) => {
              const {
                description,
                tag,
                method,
                value,
                currency,
                id,
                exchangeRates,
              } = itens;
              const { ask, name } = exchangeRates[currency];
              const convertedValue = Number(ask) * Number(value);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{name}</td>
                  <td>{Number(ask).toFixed(2)}</td>
                  <td>{convertedValue.toFixed(2)}</td>
                  <td>BRL</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      id={ id }
                      onClick={ this.funcDelet }
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
