import React, { Component } from 'react';
import Character from './Character'

export default class App extends Component {
  state = { characters: null };

  componentDidMount() {
    fetch('/api/getMarvelCharacters')
      .then(res => res.json())
      .then(characters => this.setState({ characters: characters }));
  }

  render() {
    const { characters } = this.state;
    let layout = header;
    console.log(characters);
    return (
      layout
    );
  }
}

const header = (
  <header>
    <div className="navbar navbar-dark bg-dark box-shadow">
      <div className="container d-flex justify-content-between">
        <a href="#" className="navbar-brand d-flex align-items-center">
          <strong>Marvel Heroes</strong>
        </a>
      </div>
    </div>
  </header>
);

const footer = (
  <footer className="text-muted">
    <div className="container">
      <p className="float-right">
        <a href="#">Back to top</a>
      </p>
    </div>
  </footer>
);

const layout = (characters) => {
  let tempLayout = header;
  const characterList = characters.map(character => {
    <Character img={character.img} description={character.description} />
  });
};
