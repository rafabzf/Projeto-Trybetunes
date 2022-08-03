import React, { Component } from 'react';
import Header from '../components/Header';

const minText = 2;

class Search extends Component {
  state = {
    disabled: true,
  }

  onButtonInput = ({ target }) => {
    if (target.value.length >= minText) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { disabled } = this.state;

    return (
      <div data-testid="page-search">
        Profile Edit
        <Header />
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
