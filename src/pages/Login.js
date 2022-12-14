import React from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import Button from 'react-bootstrap/Button';
import { submitLogin } from '../redux/actions';
import LoginArea from './css/Login.styled';
import TrybeWallet from '../images/TrybeWallet.png';

const MINIMUM_LENGTH_PASSWORD = 6;
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.verifyEmailandPassword);
  };

  verifyEmailandPassword = () => {
    const { email, password } = this.state;
    const verifyEmail = email.endsWith('.com')
    && !email.endsWith('@.com')
    && !email.startsWith('@')
    && email.includes('@');
    const verifyPassword = password.length >= MINIMUM_LENGTH_PASSWORD;
    if (verifyEmail && verifyPassword) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  submitLoginAndGoToWallet = (e, state) => {
    e.preventDefault();
    const { history, submitLoginInfo } = this.props;
    submitLoginInfo(state);
    history.push('/carteira');
  };

  render() {
    const { handleChange, submitLoginAndGoToWallet, state } = this;
    const { email, password, isDisabled } = state;
    return (
      <LoginArea>
        <img className="imgLogo" src={ TrybeWallet } alt="Logo TrybeWallet" />
        <form className="containerFormLogin">
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            placeholder="Enter email"
            onChange={ handleChange }
          />
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            placeholder="Password"
            onChange={ handleChange }
          />
          <Button
            type="submit"
            variant="success"
            size="lg"
            disabled={ isDisabled }
            onClick={ (e) => submitLoginAndGoToWallet(e, state) }
          >
            Entrar
          </Button>
        </form>
      </LoginArea>
    );
  }
}

Login.propTypes = {
  submitLoginInfo: func,
  history: shape({
    push: func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submitLoginInfo: (state) => dispatch(submitLogin(state)),
});

export default connect(null, mapDispatchToProps)(Login);
