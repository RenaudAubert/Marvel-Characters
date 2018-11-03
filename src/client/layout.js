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
      <Link to={`/${character.id}`} className="dropdown-item btn btn-secondary">
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
          <Link to="/">
            <p className="navbar-brand d-flex align-items-center">
              Marvel Heroes
            </p>
          </Link>
          <div className="dropdown">
            <button className="btn btn-secondary" type="button" id="dropdownFavorite" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Favorite
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {favList.length > 0 ? favList : <p>No favorite characters</p>}
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
    <footer className="text-muted">
      <div className="container">
        <p className="float-right">
          <a href="/#">Back to top</a>
        </p>
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
