import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    album: '',
    image: '',
    artist: '',
    explicitnes: '',
    songs: [],
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const collection = data.find((album) => album);
    const musics = data.filter((music) => music.kind);
    this.setState({
      album: collection.collectionName,
      image: collection.artworkUrl100,
      artist: collection.artistName,
      explicitnes: collection.collectionExplicitness,
      songs: musics,
    });
  }

  render() {
    const { album, image, artist, explicitnes, songs } = this.state;

    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <h1 data-testid="artist-name">
            { artist }
          </h1>
          <img src={ image } alt={ album } />
          <h4>
            { explicitnes }
          </h4>
          <h3 data-testid="album-name">
            { album }
          </h3>
        </div>
        {
          songs.map((music) => (
            <div key={ music.trackId }>
              <h4>
                { music.trackName }
              </h4>
              <img src={ music.artworkUrl60 } alt={ music.trackId } />
              <MusicCard musics={ music.previewUrl } />
            </div>
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
