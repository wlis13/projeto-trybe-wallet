import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p>
          Despesa total: R$
          <p data-testid="total-field">
            {expenses.length > 0 ? expenses.reduce((acomulado, element) => {
              const { currency, value } = element;
              const reqExhange = element.exchangeRates;
              const { ask } = reqExhange[currency];
              const inBrl = Number(acomulado) + (Number(ask) * value);
              return inBrl.toFixed(2);
            }, 0) : '0.00'}
          </p>
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

function mapStateToProps({ user, wallet }) {
  return {
    email: user.email,
    expenses: wallet.expenses,
  };
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default connect(mapStateToProps)(Header);
