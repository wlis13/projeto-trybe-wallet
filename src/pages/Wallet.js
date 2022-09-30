import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style.css';

class Wallet extends React.Component {
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
  };

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
    console.log(this.props);
    const { email } = this.props;
    const { initialValue, endValue, asideValue } = this.state;
    const { displayTag, tag } = this.state;
    const { description, displayDescription } = this.state;
    const { payment, displayPayment } = this.state;
    const { coin, displayCoin } = this.state;
    const { valueCoinAside } = this.state;
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
              id="coin-select"
              name="coin"
              value={ coin }
              onChange={ this.handleChange }
            >
              <option value="options">Options</option>
              <option value="Dollar-comercial">USD</option>
              <option value="Real">BRL</option>
              <option value="Euro">EUR</option>
              <option value="Dollar-Australiano">AUD</option>
              <option value="Dollar-canadense">CAD</option>
              <option value="Dollar-de-Singapura">SGD</option>
              <option value="Yuan-Renminbi">CNY</option>
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento:
            <select
              id="payment-method"
              name="payment"
              value={ payment }
              onChange={ this.handleChange }
            >
              <option value="payment-options">Payment-Options</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="crédito">Cartão de crédito</option>
              <option value="link">Link de pagamento</option>
              <option value="aproximação">por aproximação</option>
              <option value="transferência">transferência bancária</option>
            </select>
          </label>
          <label htmlFor="reason-for-spending">
            Tag:
            <select
              value={ tag }
              name="tag"
              onChange={ this.handleChange }
              id="reason-for-spending"
            >
              <option value="motivo">motivo do gasto</option>
              <option value="alimentação">Alimentação</option>
              <option value="trabalho">Trabalho</option>
              <option value="saúde">Saúde</option>
              <option value="lazer">Lazer</option>
              <option value="dia">Dia á Dia</option>
            </select>
          </label>
          <label htmlFor="input-descrição">
            Descrição:
            <input
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

const mapStateToProps = ({ userReducer }) => ({
  email: userReducer.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
