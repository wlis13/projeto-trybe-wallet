import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAction } from '../redux/actions';
import '../style.css';

class WalletForm extends Component {
  state = {
    initialValue: '',
    endValue: '0.00',
    asideValue: '',
    tag: '',
    displayTag: '',
    description: '',
    displayDescription: '',
    payment: '',
    displayPayment: '',
    coin: '',
    displayCoin: '',
    valueCoinAside: '',
    currencyState: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const promisie = await fetch(url);
    const response = await promisie.json();
    const arrayResponse = Object.keys(response);
    this.setState({ currencyState: arrayResponse });
    dispatch(walletAction(arrayResponse));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = () => {
    const { initialValue, tag, description, payment, coin } = this.state;
    this.setState({
      endValue: Number(initialValue).toFixed(2),
      asideValue: Number(initialValue).toFixed(2),
      displayTag: tag,
      displayDescription: description,
      displayPayment: payment,
      displayCoin: coin,
    });

    switch (coin) {
    case 'Dollar-comercial':
      this.setState({ valueCoinAside: 'USD$' });
      break;
    case 'Real':
      this.setState({ valueCoinAside: 'BRL$' });
      break;
    case 'Euro':
      this.setState({ valueCoinAside: 'EUR$' });
      break;
    case 'Dollar-Australiano':
      this.setState({ valueCoinAside: 'AUD$' });
      break;
    case 'Dollar-de-Singapura':
      this.setState({ valueCoinAside: 'SGD$' });
      break;
    case 'Yuan-Renminbi':
      this.setState({ valueCoinAside: 'CNY$' });
      break;
    case 'Dollar-canadense':
      this.setState({ valueCoinAside: 'CAD$' });
      break;
    default:
    }
  };

  render() {
    const { email } = this.props;
    const { initialValue, endValue, asideValue } = this.state;
    const { displayTag, tag } = this.state;
    const { description, displayDescription } = this.state;
    const { payment, displayPayment } = this.state;
    const { coin, displayCoin } = this.state;
    const { valueCoinAside, currencyState } = this.state;
    currencyState.splice(1, 1);
    return (
      <div className="section-wallet">
        <header>
          <h1>TRYBE</h1>
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="total-field">{ `Despesa total: R$ ${endValue} `}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <label htmlFor="input-value">
            Valor:
            <input
              data-testid="value-input"
              name="initialValue"
              value={ initialValue }
              id="input-value"
              type="number"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="coin-select">
            Moeda:
            <select
              data-testid="currency-input"
              id="coin-select"
              name="coin"
              value={ coin }
              onChange={ this.handleChange }
            >
              {currencyState.map((itens, index) => (
                <option key={ index }>{itens}</option>
              ))}
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="payment-method"
              name="payment"
              value={ payment }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="reason-for-spending">
            Tag:
            <select
              data-testid="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.handleChange }
              id="reason-for-spending"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="input-descrição">
            Descrição:
            <input
              data-testid="description-input"
              id="input-descrição"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar Despesa
          </button>
        </section>

        <section>

          <aside>
            <h5>Descrisão</h5>
            <p>{displayDescription}</p>
          </aside>

          <aside>
            <h5>tag</h5>
            <p>{ displayTag }</p>
          </aside>

          <aside>
            <h5>Método de pagamento</h5>
            <p>{ displayPayment }</p>
          </aside>

          <aside>
            <h5>Valor</h5>
            <p>{ `${valueCoinAside} ${asideValue}` }</p>
          </aside>

          <aside>
            <h5>Moeda</h5>
            <p>{ displayCoin }</p>
          </aside>

          <aside>
            <h5>Câmbio utilizado</h5>
          </aside>

          <aside>
            <h5>Valor convertido</h5>
          </aside>

          <aside>
            <h5>Moeda de conversão</h5>
          </aside>

        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  currency: wallet.currencies,
});

WalletForm.propTypes = {
  email: PropTypes.string.isRequired,
  currency: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
