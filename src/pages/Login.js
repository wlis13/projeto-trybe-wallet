import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    desabilit: true,
    email: '',
    senha: '',
  };

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value }, () => this.buttonValidation());
  };

  buttonValidation = () => {
    const { senha, email } = this.state;
    const magicNumber = 6;
    if (senha.length >= magicNumber && email.includes('@') && email.includes('.com')) {
      this.setState({ desabilit: false });
    } else { this.setState({ desabilit: true }); }
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userAction(email));
    history.push('/carteira');
  };

  render() {
    const { desabilit, email, senha } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-email">
            Email:
            <input
              data-testid="email-input"
              id="input-email"
              type="email"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-senha">
            Senha:
            <input
              data-testid="password-input"
              id="input-senha"
              type="password"
              placeholder="Senha"
              name="senha"
              value={ senha }
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ desabilit }
            type="button"
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
