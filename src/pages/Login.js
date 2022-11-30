import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions';
import '../style.css';

class Login extends Component {
  state = {
    email: '',
    senha: '',
    desabilit: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => { this.confirmUser(); });
  };

  confirmUser = () => {
    const { email, senha } = this.state;
    const magicNumber = 6;
    const validUser = email.includes('@') && email.includes('.com');
    const validSenha = senha.length >= magicNumber;
    if (validUser && validSenha) {
      this.setState({ desabilit: false });
    } else { this.setState({ desabilit: true }); }
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveUser(email));
    history.push('/carteira');
  };

  render() {
    const { desabilit, email, senha } = this.state;
    return (
      <div>
        <form className="container-form">
          <label htmlFor="input-email">
            <input
              data-testid="email-input"
              id="input-email"
              name="email"
              value={ email }
              type="text"
              placeholder="digite seu email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-senha">
            <input
              data-testid="password-input"
              id="input-senha"
              name="senha"
              value={ senha }
              type="password"
              placeholder="digite sua senha"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ desabilit }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
