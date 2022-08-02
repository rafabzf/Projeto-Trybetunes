import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingMessage: false,
      disabled: true,
      userName: '',
    };
  }

  render() {
    const maxLength = 3;

    const {
      loadingMessage,
      disabled,
      userName,
    } = this.state;

    const { history } = this.props;

    const handleClickButton = async (e) => {
      e.preventDefault();
      this.setState({ loadingMessage: true });
      await createUser({ name: userName });
      this.setState({ loadingMessage: false });
      history.push('/search');
    };

    const handleChange = ({ target }) => {
      if (target.value.length < maxLength) {
        this.setState({ disabled: true });
      } else {
        this.setState({ disabled: false });
      }
      this.setState({ userName: target.value });
    };

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name">
            <input
              type="text"
              data-testid="login-name-input"
              placeholder="Nome"
              onChange={ handleChange }
              value={ userName }
            />
          </label>
          <br />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ handleClickButton }
          >
            Entrar
          </button>
        </form>
        {
          loadingMessage && <Loading />
        }
      </div>
    );
  }
}

Login.propTypes = {
  disabled: PropTypes.bool,
  userName: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

export default Login;
