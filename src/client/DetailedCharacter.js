import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class DetailedCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {character: {}};

    this.favClick = this.favClick.bind(this);
  }

  // Get data from Marvel API if component is mounted
  componentDidMount() {
    const { match } = this.props;

    fetch('/api/characters/' + match.params.id)
      .then(res => res.json())
      .then(character => this.setState({ character }));
  }

  favClick() {
    const { match, onFavClicked } = this.props;
    onFavClicked(match.params.id);
  }

  // Render each character card with image, name and description
  render() {
    const { favCharacters } = this.props;
    let { character } = this.state;
    if (character.data) {
      character = character.data.results[0];
    } else {
      character = {};
    }
    const name = character.name || '';
    const description = character.description || 'No description available for this character';
    const imgURL = character.thumbnail ? `${character.thumbnail.path}/landscape_large.${character.thumbnail.extension}` : "";
    const isFav = favCharacters.find(fav => match.params.id === fav.id) !== undefined;

    return (
      <main role="main">
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="card mb-1 w-50 box-shadow">
                <img className="card-img-top" src={imgURL} alt="" />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className={`card-text ${character.description}` ? '' : ' text-danger'}>{description}</p>
                </div>
                <div className="card-footer text-muted">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.favClick}>
                        <i className={isFav ? 'fas fa-star' : 'far fa-star'} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

DetailedCharacter.propTypes = {
  favCharacters: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFavClicked: PropTypes.func.isRequired
};
