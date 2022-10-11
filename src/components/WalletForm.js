import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requisitionEveryThunk, requisitionThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',

  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requisitionThunk());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  removeFieldWallet = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleAddExpenseStore = () => {
    const { expenses, dispatch } = this.props;
    const stateExpenses = {
      ...this.state,
      id: expenses.length,
    };
    this.removeFieldWallet();
    dispatch(requisitionEveryThunk(stateExpenses));
  };

  render() {
    const { currencies, loading } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <form>
          {loading && (<h1>Loading...</h1>)}
          <label htmlFor="input-value">
            <input
              id="input-value"
              type="text"
              name="value"
              value={ value }
              data-testid="value-input"
              placeholder="digite o valor"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-descrisao">
            <input
              id="input-descrisao"
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              placeholder="digite uma descrisão"
              onChange={ this.handleChange }
            />
          </label>
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((currencys, index) => (
              <option key={ index }>{ currencys }</option>
            ))}
          </select>
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option velue="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.handleAddExpenseStore }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ wallet }) {
  return {
    currencies: wallet.currencies,
    loading: wallet.loading,
    expenses: wallet.expenses,
  };
}
WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
