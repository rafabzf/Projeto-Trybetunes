import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const minText = 2;

class Search extends Component {
  state = {
    disabled: true,
    artists: [],
    loadingMessage: false,
    input: '',
  }

  onButtonInput = ({ target }) => {
    if (target.value.length >= minText) {
      this.setState({ disabled: false, input: target.value });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick = async () => {
    const { input } = this.state;
    this.setState({ loadingMessage: true });
    const response = await searchAlbumsAPI(input);
    this.setState({
      artists: response,
      loadingMessage: false,
    });
  }

  render() {
    const { disabled, artists, loadingMessage, input } = this.state;

    return (
      <div>
        <div data-testid="page-search">
          Profile Edit
          <Header />
          {
            loadingMessage ? <Loading />
              : (
                <section>
                  <form>
                    <label htmlFor="search">
                      <input
                        data-testid="search-artist-input"
                        type="text"
                        name="search"
                        onChange={ this.onButtonInput }
                      />
                    </label>

                    <button
                      type="submit"
                      data-testid="search-artist-button"
                      disabled={ disabled }
                      onClick={ this.handleClick }
                    >
                      Enviar
                    </button>
                  </form>
                  {
                    artists.length > 0 ? (
                      <div>
                        <h2>
                          {`Resultado de álbuns de: ${input}`}
                        </h2>
                        {
                          artists.map((element, index) => (
                            <div key={ index } id="album">
                              <h3>{ element.artistName }</h3>
                              <h3>{ element.collectionName }</h3>
                              <img
                                src={ element.artworkUrl100 }
                                alt={ element.collectionName }
                              />
                              <p>{ element.releaseDate }</p>
                              <Link
                                data-testid={ `link-to-album-${element.collectionId}` }
                                type="button"
                                to={ `/album/${element.collectionId}` }
                              >
                                Músicas
                              </Link>
                            </div>
                          ))
                        }
                      </div>)
                      : (
                        <p>Nenhum álbum foi encontrado</p>
                      )
                  }
                </section>
              )
          }
        </div>
      </div>
    );
  }
}
export default Search;
