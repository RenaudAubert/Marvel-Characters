import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FavButton } from './layout';

const Character = (props) => {
  const { character, onFavClicked } = props;
  const imgURL = character.thumbnail && `${character.thumbnail.path}/landscape_large.${character.thumbnail.extension}`;

  // Render each character card with image, name and description
  return (
    <div className="h-100 card mb-4 box-shadow">
      <Link to={`/${character.id}`}>
        <img className="card-img-top" src={imgURL} alt="" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{character.name || ''}</h5>
        {character.description ?
          <p className="card-text">{character.description}</p> :
          <p className="card-text text-danger">{character.description}</p>
        }
      </div>
      <div className="card-footer text-muted">
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link to={`/${character.id}`} className="text-dark">
              <i className="fas fa-search fa-lg align-bottom" />
            </Link>
            <FavButton characterId={character.id} isFav={character.favorite} onFavClicked={onFavClicked} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Character as default };

Character.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.object,
    favorite: PropTypes.bool
  }).isRequired,
  onFavClicked: PropTypes.func.isRequired
};

Character.defaultProps = {
  character: {}
};
