import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loadingMessage: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ loadingMessage: false, userName: user.name });
  }

  render() {
    const {
      userName,
      loadingMessage,
    } = this.state;

    return (
      <div id="header">
        <header data-testid="header-component">
          {
            loadingMessage
              ? <Loading />
              : <p data-testid="header-user-name">{ userName }</p>
          }
          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
