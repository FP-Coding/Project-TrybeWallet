import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

import { mockData } from '../../cypress/mocks/data';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const EMAIL_VALIDO = 'maria@email.com';
const PASSWORD_VALIDO = '123456';
const TOTAL_FIELD = 'total-field';
const EMAIL_FIELD = 'email-field';
const HEADER_CURRENCY_FIELD = 'header-currency-field';
// const DESCRIPTION_TEXT_LABEL = 'Descrição:';
// const MOEDA_TEXT_LABEL = 'Moeda:';
// const METHOD_TEXT_LABEL = 'Método de pagamento:';
// const TAG_TEXT_LABEL = 'Categoria:';
// const VALUE_TEXT_LABEL = 'Valor:';

const mockFetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(mockData),
});

global.fetch = jest.fn(mockFetch);

describe('Testes Page Login', () => {
  test('Verifica se existe um form de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    const btnSubmit = screen.getByRole('button', { name: 'Entrar' });
    expect(btnSubmit).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();
  });
  test('Verifica se passado um email e senha valida o botão fica hablitado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    userEvent.type(inputEmail, EMAIL_VALIDO);
    expect(inputEmail.value).toBe(EMAIL_VALIDO);
    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    userEvent.type(inputPassword, PASSWORD_VALIDO);
    expect(inputPassword.value).toBe(PASSWORD_VALIDO);
    const btnSubmit = screen.getByRole('button', { name: 'Entrar' });
    expect(btnSubmit).not.toBeDisabled();
    userEvent.click(btnSubmit);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testando page Wallet', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(EMAIL_TEST_ID);
    userEvent.type(inputEmail, EMAIL_VALIDO);
    const inputPassword = screen.getByTestId(PASSWORD_TEST_ID);
    userEvent.type(inputPassword, PASSWORD_VALIDO);
    const btnSubmit = screen.getByRole('button', { name: 'Entrar' });
    userEvent.click(btnSubmit);
  });
  test('Testando Header', () => {
    const emailUsed = screen.getByTestId(EMAIL_FIELD);
    expect(emailUsed.innerHTML).toBe(EMAIL_VALIDO);
    const valueTotal = screen.getByTestId(TOTAL_FIELD);
    expect(valueTotal.innerHTML).toBe('0.00');
    const currencyCoin = screen.getByTestId(HEADER_CURRENCY_FIELD);
    expect(currencyCoin.innerHTML).toBe('BRL');
  });
  // test('Testando Wallet Form', () => {
  //   const inputValue = screen.getByLabelText(VALUE_TEXT_LABEL);
  //   expect(inputValue).toBeInTheDocument();
  //   userEvent.type(inputValue, '10');

  //   expect(fetch).toHaveBeenCalledTimes(1);
  //   const MoedaSelect = screen.getByLabelText(MOEDA_TEXT_LABEL);
  //   expect(MoedaSelect).toBeInTheDocument();
  //   userEvent.selectOptions(MoedaSelect, 'USD');

  //   const MethodSelect = screen.getByLabelText(METHOD_TEXT_LABEL);
  //   expect(MethodSelect).toBeInTheDocument();
  //   userEvent.selectOptions(MethodSelect, 'Dinheiro');

  //   const tagSelect = screen.getByLabelText(TAG_TEXT_LABEL);
  //   expect(tagSelect).toBeInTheDocument();
  //   userEvent.selectOptions(tagSelect, 'Alimentação');

  //   const descriptionInput = screen.getByLabelText(DESCRIPTION_TEXT_LABEL);
  //   expect(descriptionInput).toBeInTheDocument();
  //   userEvent.type(descriptionInput, 'Pizza');

  //   const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });
  //   expect(btnAdd).toBeInTheDocument();
  //   userEvent.click(btnAdd);

  //   expect(fetch).toHaveBeenCalledTimes(2);
  //   expect(screen.getByRole('cell', { name: /10\.00/i })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  // });
});
