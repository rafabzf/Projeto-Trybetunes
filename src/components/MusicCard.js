import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loadingMessage: false,
    favoriteMusics: [],
  }

  async componentDidMount() {
    this.setState({ loadingMessage: true });
    const abc = await getFavoriteSongs();
    this.setState({ loadingMessage: false, favoriteMusics: abc });
  }

  handleChange = async ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.response;
    if (target.checked) {
      this.setState({ loadingMessage: true });
      const { musicInfo } = this.props;
      await addSong(musicInfo);
      const abc = await getFavoriteSongs();
      this.setState({ loadingMessage: false, [name]: value, favoriteMusics: abc });
    }
  }

  render() {
    const { musicInfo } = this.props;
    const { musics, trackId } = musicInfo;
    const { loadingMessage, favoriteMusics } = this.state;
    console.log(musicInfo);

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
                    checked={ favoriteMusics.some((favoriteMusic) => (
                      favoriteMusic.trackId === musicInfo.trackId)) }
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
  musicInfo: PropTypes.arrayOf(PropTypes.shape({
    musics: PropTypes.string,
    trackId: PropTypes.number,
  })).isRequired,
};

export default MusicCard;
