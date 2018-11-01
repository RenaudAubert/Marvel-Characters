import React, { Component } from 'react';
import Character from './Character';
import { Header, Footer } from './layout';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: {},
      favCharacters: []
    };

    this.handleFavClick = this.handleFavClick.bind(this);
    this.handleDeleteFav = this.handleDeleteFav.bind(this);
  }

  // Get data from Marvel API if component is mounted
  componentDidMount() {
    fetch('/api/getMarvelCharacters')
      .then(res => res.json())
      .then(characters => this.setState({ characters }));
  }

  // Add new id into favorite array
  handleFavClick(id) {
    const { characters, favCharacters } = this.state;
    // If id already in favCharacters delete character from favorite
    if (favCharacters.findIndex(character => character.id === id) !== -1) {
      this.handleDeleteFav(id);
    } else {
      // Checks whether given id is found in characters array
      const foundCharacter = characters.data.results.find(character => id === character.id);
      if (foundCharacter) {
        this.setState(prevState => ({
          favCharacters: [...prevState.favCharacters, { id, name: foundCharacter.name }]
        }));
      }
    }
  }

  // Delete character from favorite
  handleDeleteFav(id) {
    this.setState(prevState => ({
      // Keep all elements except those matching id
      favCharacters: prevState.favCharacters.filter(character => character.id !== id)
    }));
  }

  render() {
    const { characters, favCharacters } = this.state;
    console.log('characters: ', characters, ' | favorites: ', favCharacters);
    let characterList;
    if (characters.data) {
      characterList = characters.data.results.map((character) => {
        // is current character in favCharacters array?
        const isFav = favCharacters.find(fav => character.id === fav.id) !== undefined;
        // For each character create a Character component (card in the view)
        return <Character isFav={isFav} character={character} key={character.id} onFavClicked={this.handleFavClick} />;
      });
    } else {
      characterList = <p>No characters found</p>;
    }
    // Layout composed of header, main and footer component
    return (
      <div>
        <Header favChar={favCharacters} onDeleteFav={this.handleDeleteFav} />
        <main role="main">
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                {characterList}
              </div>
            </div>
          </div>
        </main>
        <Footer attributionText={characters.attributionText} />
      </div>
    );
  }
}
