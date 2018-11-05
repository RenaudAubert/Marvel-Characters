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
      characters: [],
      code: 200,
      attributionText: ""
    };

    this.handleFavChange = this.handleFavChange.bind(this);
    this.findCharacter = this.findCharacter.bind(this);
  }

  // Get characters from Marvel API if component is mounted
  componentDidMount() {
    fetch('/api/characters')
    .then(res => res.json())
    .then(apiResult => {
      // if code === 200 request succeded
      // also checks if there are characters returned
      if (apiResult.code === 200 && apiResult.data.results.length) {
        // Default is no favorite character
        apiResult.data.results.forEach(character => character.favorite = false);
        this.setState({
          characters: apiResult.data.results,
          code: apiResult.code,
          attributionText: apiResult.attributionText
        });
      }
    });
  }

  // Find character in characters state using id
  findCharacter(id = 0) {
    let { characters } = this.state;
    return characters.find(character => id === character.id);
  }

  // Change favorite value for a given character
  handleFavChange(id) {
    let characters = [...this.state.characters];
    let character = this.findCharacter(id);
    const index = characters.findIndex(character => id === character.id);

    if (character && index !== -1) {
      character = {...character};
      character.favorite = !character.favorite;
      characters[index] = character;
      this.setState({characters});
    }
  }

  render() {
    const { characters, code, attributionText } = this.state;
    // Filter charater to keep favorites
    const favCharacters = characters.filter(character => character.favorite === true);

    // View composed of a header, main and foter component
    // Switch is used to render the first component that match the path
    return (
      <div>
        <Header favCharacters={favCharacters} onDeleteFav={this.handleFavChange} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <CharacterList
                {...props}
                characters={characters}
                onFavClicked={this.handleFavChange}
              />
            )}
          />
          <Route
            path="/:id"
            render={props => {
              const { match } = props;
              // params id is a string
              const id = Number(match.params.id);
              const character = this.findCharacter(id);

              return (
                <DetailedCharacter
                  {...props}
                  shouldFetch={character === undefined}
                  character={character}
                  onFavClicked={this.handleFavChange}
                />
              );
            }}
          />
        </Switch>
        <Footer attributionText={attributionText} />
      </div>
    );
  }
}
