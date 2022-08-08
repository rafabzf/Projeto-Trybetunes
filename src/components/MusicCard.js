import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;

    return (
      <audio data-testid="audio-component" src={ musics } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.string.isRequired,
};

export default MusicCard;
