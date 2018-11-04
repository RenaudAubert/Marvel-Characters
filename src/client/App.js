import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DetailedCharacter from './DetailedCharacter';
import CharacterList from './CharacterList';
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
    fetch('/api/characters')
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

    // View composed of Header, Main et and Footer component
    return (
      <div>
        <Header favCharacters={favCharacters} onDeleteFav={this.handleDeleteFav} />
        {characters.code === 200 ?
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <CharacterList
                  {...props}
                  characters={characters}
                  favCharacters={favCharacters}
                  onFavClicked={this.handleFavClick}
                />
              )}
            />
            <Route
              path="/:id"
              render={props => (
                <DetailedCharacter
                  {...props}
                  favCharacters={favCharacters}
                  onFavClicked={this.handleFavClick}
                />
              )}
            />
          </Switch> :
          <p className="text-center">An error occured</p>
        }
        <Footer attributionText={characters.attributionText} />
      </div>
    );
  }
}
