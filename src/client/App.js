import React, { Component } from 'react';
import Character from './Character';
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
      .then(characters => this.setState({ characters: characters }));
  }

  // Add new id into favorite array
  handleFavClick(id) {
    // If id already in favCharacters delete character from favorite
    if (this.state.favCharacters.findIndex(character => character.id === id) !== -1) {
      this.handleDeleteFav(id);
    } else {
      // Checks whether given id is found in characters array
      const character = this.state.characters.data.results.find(character => id === character.id);
      if (character) {
        this.setState(prevState => ({
          favCharacters: [...prevState.favCharacters, {id: id, name: character.name}]
        }));
      }
    }
  }

  // Delete character from favorite
  handleDeleteFav(id) {
    this.setState(prevState => ({
      // Keep all elements except those matching given id
      favCharacters: prevState.favCharacters.filter(character => character.id !== id)
    }));
  }

  render() {
    const { characters } = this.state;
    console.log("characters: ", characters, " | favorites: ", this.state.favCharacters);
    let characterList;
    if (characters.data) {
      characterList = characters.data.results.map(character => {
        // Checks whether current character is in favCharacters array
        const isFav = this.state.favCharacters.find(fav => character.id === fav.id) !== undefined;
        // For each character create a Character component (card in the view)
        return <Character isFav={isFav} character={character} key={character.id} onFavClicked={this.handleFavClick}/>
      });
    } else {
      characterList = <p>An error occured</p>;
    }
    // Layout composed of header, main and footer component
    return (
      <div>
        <Header favChar={this.state.favCharacters} onDeleteFav={this.handleDeleteFav} />
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

const FavElement = props => {
  const { character } = props;
  const deleteFav = () => {
    props.onDeleteFav(props.character.id);
  }

  return (
    <a className="dropdown-item" href="#" key={character.id}>
      {character.name}
      <button type="button" className="close" onClick={deleteFav}>
        <span aria-hidden="true">&times;</span>
      </button>
    </a>
  );
};

const Header = props => {
  const favList = props.favChar.map(character => <FavElement character={character} onDeleteFav={props.onDeleteFav} key={character.id} />);
  console.log("favList: ", favList);
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

const Footer = props => {
  return (
    <footer className="text-muted">
      <div className="container">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        {props.attributionText}
      </div>
    </footer>
  );
};
