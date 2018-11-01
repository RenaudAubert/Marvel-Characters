import React from 'react';
import PropTypes from 'prop-types';

export const FavElement = (props) => {
  const { character, onDeleteFav } = props;
  const deleteFav = () => {
    onDeleteFav(character.id);
  };

  return (
    <a className="dropdown-item" href="#" key={character.id}>
      {character.name}
      <button type="button" className="close" onClick={deleteFav}>
        <span aria-hidden="true">&times;</span>
      </button>
    </a>
  );
};

export const Header = (props) => {
  const { favChar, onDeleteFav } = props;

  // for each favorite character create a favElement component
  const favList = favChar.map(character => <FavElement character={character} onDeleteFav={onDeleteFav} key={character.id} />);
  console.log('favList: ', favList);

  return (
    <header>
      <div className="navbar navbar-dark bg-dark box-shadow">
        <div className="container d-flex justify-content-between">
          <a href="#" className="navbar-brand d-flex align-items-center">
            <strong>Marvel Heroes</strong>
          </a>
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
          <a href="#">Back to top</a>
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
  favChar: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteFav: PropTypes.func.isRequired
};

Footer.propTypes = {
  attributionText: PropTypes.string
};

Footer.defaultProps = {
  attributionText: ''
};
