import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loadingMessage: false,
    isCheck: false,
  }

  handleChange = async ({ target }) => {
    const { name } = target;
    const response = target.type === 'checkbox' ? target.checked : target.response;
    this.setState({ loadingMessage: true });
    const { trackId } = this.props;
    await addSong(trackId);
    this.setState({ loadingMessage: false, [name]: response, isCheck: true });
  }

  render() {
    const { musics, trackId } = this.props;
    const { loadingMessage, isCheck } = this.state;

    return (
      <div>
        {
          loadingMessage ? <Loading /> : (
            <div>
              <div>
                <audio data-testid="audio-component" src={ musics } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>

              <div>
                <label htmlFor="checked">
                  Favorita
                  <input
                    type="checkbox"
                    name="checked"
                    checked={ isCheck }
                    onClick={ this.handleClick }
                    onChange={ this.handleChange }
                    data-testid={ `checkbox-music-${trackId}` }
                  />
                </label>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
