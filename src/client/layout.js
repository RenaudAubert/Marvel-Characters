import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const FavElement = (props) => {
  const { character, onDeleteFav } = props;
  const deleteFav = () => {
    onDeleteFav(character.id);
  };

  return (
    <div className="btn-group" role="group" aria-label="Favorite List">
      <Link to={`/${character.id}`} className="dropdown-item btn btn-secondary text-center">
        {character.name}
      </Link>
      <button type="button" className="close btn btn-secondary" onClick={deleteFav}>
        <i className="fa fa-trash" aria-hidden="true" />
      </button>
    </div>
  );
};

export const Header = (props) => {
  const { favCharacters, onDeleteFav } = props;

  // for each favorite character create a favElement component
  const favList = favCharacters.map(character => (
    <FavElement character={character} onDeleteFav={onDeleteFav} key={character.id} />
  ));

  return (
    <header>
      <div className="navbar navbar-dark bg-dark box-shadow">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            Marvel Heroes
          </Link>
          <div className="dropdown">
            <button className="btn btn-secondary" type="button" id="dropdownFavorite" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Favorites
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {favList.length > 0 ? favList : <p className="text-center">No favorite characters</p>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Footer = (props) => {
  const { attributionText } = props;
  return (
    <footer className="footer text-muted">
      <div className="container">
        {attributionText}
      </div>
    </footer>
  );
};

FavElement.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.object,
  }).isRequired,
  onDeleteFav: PropTypes.func.isRequired
};

Header.propTypes = {
  favCharacters: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteFav: PropTypes.func.isRequired
};

Footer.propTypes = {
  attributionText: PropTypes.string
};

Footer.defaultProps = {
  attributionText: ''
};
