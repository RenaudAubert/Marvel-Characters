import React from 'react';
import PropTypes from 'prop-types';
import Character from './Character';

const CharacterList = (props) => {
  const { characters, favCharacters, onFavClicked } = props;
  let characterList = <p>No characters found</p>;

  if (characters.length > 0) {
    characterList = characters.map((character) => {
      // is current character in favCharacters array?
      const isFav = favCharacters.find(fav => character.id === fav.id) !== undefined;
      // For each character create a Character component (card in the view)
      return (
        <div className="col-md-4 pt-2" key={character.id}>
          <Character
            isFav={isFav}
            character={character}
            onFavClicked={onFavClicked}
          />
        </div>
      );
    });
  }

  return (
    <main role="main">
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {characterList}
          </div>
        </div>
      </div>
    </main>
  );
};

export { CharacterList as default };

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
  favCharacters: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFavClicked: PropTypes.func.isRequired,
};
