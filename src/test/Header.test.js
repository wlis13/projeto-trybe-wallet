import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';

const validEmail = 'wlisses@gmail.com';
const validPassword = '123456';

describe('testa o componente Header', () => {
  it('testa se são renderizados os elementos corretamente', () => {
    renderWithRouterAndRedux(<Header />);
    const getEmail = screen.getByTestId(/email-field/i);
    const getTotalField = screen.getByTestId(/total-field/i);
    expect(getEmail).toBeInTheDocument();
    expect(getTotalField).toBeInTheDocument();
  });
  it(' testa o comportamento nos App.js', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/digite seu email/i);
    const password = screen.getByPlaceholderText(/digite sua senha/i);
    const buttonEntry = screen.getByRole('button', { name: /Entrar/i });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(buttonEntry).toBeInTheDocument();
  });
  it(' testa se o valor é adicionado corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/digite seu email/i);
    const password = screen.getByPlaceholderText(/digite sua senha/i);
    const buttonEntry = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    expect(buttonEntry).not.toBeDisabled();

    const num = 5000;
    userEvent.click(buttonEntry);
    expect(history.location.pathname).toBe('/carteira');
    const inputValue = screen.getByPlaceholderText(/digite o valor/i);
    expect(inputValue).toBeInTheDocument();
    userEvent.type(inputValue, '150');
    expect(inputValue).toHaveValue('150');
    const buttonAdd = screen.getByRole('button', { name: /Adicionar despesas/i });
    userEvent.click(buttonAdd);
    const expenseValue = await screen.findByTestId(/total-field/i);
    expect(expenseValue).toBeInTheDocument();
    const celula = await screen.findByRole('cell', { name: /alimentação/i });
    expect(celula).toBeInTheDocument();
  });
});
