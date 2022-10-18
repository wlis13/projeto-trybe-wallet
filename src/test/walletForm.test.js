import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';

describe('testa o componente walletForm', () => {
  it('testa se os campos de input estão sendo renderizados', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const fieldValue = screen.getByTestId(/value-input/i);
    const fieldDescription = screen.getByTestId(/description-input/i);
    const fieldCurrency = screen.getByTestId(/currency-input/i);
    const fieldMethod = screen.getByTestId(/method-input/i);
    const fieldTag = screen.getByTestId(/tag-input/i);
    expect(fieldValue).toBeInTheDocument();
    expect(fieldDescription).toBeInTheDocument();
    expect(fieldCurrency).toBeInTheDocument();
    expect(fieldMethod).toBeInTheDocument();
    expect(fieldTag).toBeInTheDocument();
  });

  it('testa se o valor digitado está sendo inserido corretamente', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const fieldValue = screen.getByTestId(/value-input/i);
    // const fieldDescription = screen.getByTestId(/description-input/i);
    // const fieldCurrency = screen.getByTestId(/currency-input/i);
    // const fieldMethod = screen.getByTestId(/method-input/i);
    // const fieldTag = screen.getByTestId(/tag-input/i);
    const magicNumber = 150;
    userEvent.type(fieldValue, magicNumber);
    expect(fieldValue).toBe(magicNumber);
  });
});
