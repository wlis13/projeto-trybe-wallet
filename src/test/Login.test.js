import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';

describe('testa o componente Login', () => {
  const validEmail = 'wlisses@gmail.com';
  const validPassword = '123456';
  it('testa se existe os campos de email e senha', () => {
    renderWithRouterAndRedux(<Login />);
    const emailField = screen.getByPlaceholderText(/digite seu email/i);
    const senhaField = screen.getByPlaceholderText(/digite sua senha/i);
    expect(emailField).toBeInTheDocument();
    expect(senhaField).toBeInTheDocument();
  });
  it('testa se ao preencher os campos email e senha o botão é desbloqueado', () => {
    renderWithRouterAndRedux(<Login />);
    const emailField = screen.getByTestId(/email-input/i);
    const senhaField = screen.getByTestId(/password-input/i);
    userEvent.type(emailField, validEmail);
    userEvent.type(senhaField, validPassword);
    expect(emailField).toHaveValue(validEmail);
    expect(senhaField).toHaveValue(validPassword);
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    expect(buttonLogin).not.toBeDisabled();
  });
  it('testa se a após o click no botão entrar, a página é redirecionada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailField = screen.getByTestId(/email-input/i);
    const senhaField = screen.getByTestId(/password-input/i);
    userEvent.type(emailField, validEmail);
    userEvent.type(senhaField, validPassword);
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/carteira');
  });
  it('testa se o email é inserido no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailField = screen.getByTestId(/email-input/i);
    const senhaField = screen.getByTestId(/password-input/i);
    userEvent.type(emailField, validEmail);
    userEvent.type(senhaField, validPassword);
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonLogin);
    const { user: { email } } = store.getState();
    expect(email).toBe(validEmail);
  });
  it('testa se são salvos no estado global os valores currencies', () => {
    renderWithRouterAndRedux(<App />);
    const emailField = screen.getByTestId(/email-input/i);
    const senhaField = screen.getByTestId(/password-input/i);
    userEvent.type(emailField, validEmail);
    userEvent.type(senhaField, validPassword);
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonLogin);
    const inputValue = screen.getByTestId(/value-input/i);
    userEvent.type(inputValue, /120/i);
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);
    const getTextValue = screen.getByTestId(/total-field/i);
    expect(getTextValue).toHaveValue(/633.49/i);
  });
});
