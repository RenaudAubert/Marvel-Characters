import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const FavElement = (props) => {
  const { id, name, onDeleteFav } = props;

  const deleteFav = () => {
    onDeleteFav(id);
  };

  return (
    <div className="btn-group" role="group" aria-label="Favorite List">
      <Link to={`/${id}`} className="dropdown-item btn btn-secondary text-center">
        {name}
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
    <FavElement
      id={character.id}
      name={character.name}
      onDeleteFav={onDeleteFav}
      key={character.id}
    />
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

export const FavButton = (props) => {
  const { characterId, isFav, onFavClicked } = props;

  const favClick = () => {
    onFavClicked(characterId);
  };

  return (
    <button type="button" className="btn btn-sm fa-button" onClick={favClick}>
      <i className={`${isFav ? 'fas fa-star' : 'far fa-star'} text-warning fa-lg`} />
    </button>
  );
};

// Return link if type (detail, wiki, comiclink) is found
export const LinkType = (props) => {
  const { character, type, text } = props;

  let link = text;
  const urlType = character.urls.find(url => url.type === type);
  if (urlType !== undefined) {
    link = <a href={urlType.url} target="_blank" rel="noopener noreferrer">{text}</a>;
  }
  return link;
};

FavElement.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onDeleteFav: PropTypes.func.isRequired
};

Header.propTypes = {
  favCharacters: PropTypes.arrayOf(PropTypes.object),
  onDeleteFav: PropTypes.func.isRequired
};

Header.defaultProps = {
  favCharacters: []
};

Footer.propTypes = {
  attributionText: PropTypes.string
};

Footer.defaultProps = {
  attributionText: ''
};

FavButton.propTypes = {
  characterId: PropTypes.number.isRequired,
  isFav: PropTypes.bool,
  onFavClicked: PropTypes.func.isRequired
};

FavButton.defaultProps = {
  isFav: false
};

LinkType.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.object,
  }).isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

LinkType.defaultProps = {
  type: 'detail',
  text: 'detail'
};
