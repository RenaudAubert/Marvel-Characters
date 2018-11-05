import React from 'react';
import PropTypes from 'prop-types';
import Character from './Character';

const CharacterList = (props) => {
  const { characters, onFavClicked } = props;
  let characterList = <p>No characters found</p>;

  characterList = characters.map((character) => {
    // For each character create a Character component (card in the view)
    return (
      <div className="col-md-4 pt-2" key={character.id}>
        <Character
          character={character}
          onFavClicked={onFavClicked}
        />
      </div>
    );
  });

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
  onFavClicked: PropTypes.func.isRequired,
};
