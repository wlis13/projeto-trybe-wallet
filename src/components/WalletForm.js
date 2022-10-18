import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editFalse,
  negativeEdit,
  newList,
  requisitionEveryThunk,
  requisitionThunk,
} from '../redux/actions';

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

  componentDidUpdate() {
    const { editor, dispatch } = this.props;
    if (editor) {
      this.handleEdit();
      dispatch(negativeEdit());
    }
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

  handleEdit = () => {
    const { idEdit, expenses } = this.props;
    const getEditExpenses = expenses.filter((item) => item.id === idEdit);
    getEditExpenses.map((itens) => this.setState({
      value: itens.value,
      description: itens.description,
      currency: itens.currency,
      method: itens.method,
      tag: itens.tag,
    }));
  };

  newEditeUser = () => {
    const { expenses, idEdit, dispatch } = this.props;
    const getEditExpenses = expenses.filter((item) => item.id === idEdit);
    const getExchangeRates = getEditExpenses.find((itens) => itens.exchangeRates);
    const { exchangeRates } = getExchangeRates;
    const newObjectExpense = {
      ...this.state,
      exchangeRates,
      id: idEdit,
    };
    const newExpenses = [...expenses];
    newExpenses[idEdit] = newObjectExpense;
    this.removeFieldWallet();
    dispatch(newList(newExpenses));
    dispatch(editFalse());
  };

  render() {
    const { currencies, loading, edit } = this.props;
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
            onClick={ edit ? this.newEditeUser : this.handleAddExpenseStore }
          >
            {edit ? 'Editar despesa' : 'Adicionar despesas'}
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
    idEdit: wallet.idEdit,
    editor: wallet.editor,
    edit: wallet.edit,
  };
}
WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  idEdit: PropTypes.number.isRequired,
  editor: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
