import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FavButton, LinkType } from './layout';

export default class DetailedCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = { character: {} };
  }

  // Get data from Marvel API if component is mounted
  componentDidMount() {
    const { match } = this.props;

    // Fetch a single character using id
    fetch(`/api/characters/${match.params.id}`)
      .then(res => res.json())
      .then(character => this.setState({ character }));
  }

  // Render each character card with image, name and description
  render() {
    const { favCharacters, onFavClicked } = this.props;
    let { character } = this.state;
    let returnedDOM = <div />;

    if (character.data && character.code === 200) {
      [character] = character.data.results;
      const description = character.description || 'No description available';
      const imgURL = character.thumbnail ? `${character.thumbnail.path}/landscape_large.${character.thumbnail.extension}` : '';
      const isFav = favCharacters.find(fav => character.id === fav.id) !== undefined;
      // Only list the 4 first comics returned
      const comicsList = (type, length) => {
        const list = character[type].items.slice(0, length).map(comic => (
          <li key={comic.name}>{comic.name}</li>
        ));

        return <ul>{list}</ul>;
      };

      returnedDOM = (
        <div>
          <div className="row">
            <div className="col-lg-5">
              <img className="card-img-left flex-auto d-none d-md-block" src={imgURL} alt="" />
            </div>
            <div className="col-lg-7">
              <h5>
                <LinkType character={character} type="detail" text={character.name} />
                <FavButton characterId={character.id} isFav={isFav} onFavClicked={onFavClicked} />
              </h5>
              <h6>Description</h6>
              <p>{description}</p>
              <div className="row">
                <div className="col-sm-6">
                  <h6>
                    Comics
                    <LinkType character={character} type="comiclink" text={` (${character.comics.available})`} />
                  </h6>
                  {comicsList('comics', 4)}
                  <LinkType character={character} type="comiclink" text="Details" />
                </div>
                <div className="col-sm-6">
                  <h6>Series</h6>
                  {comicsList('series', 4)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (character.code === 404) {
      returnedDOM = (
        <p className="text-center text-danger">
          <strong>No character found</strong>
        </p>
      );
    }

    return (
      <div>
        <Link to="/" className="pl-2">
          <i className="far fa-arrow-alt-circle-left fa-3x text-secondary" />
        </Link>
        <div className="container pt-2">
          {returnedDOM}
        </div>
      </div>
    );
  }
}

DetailedCharacter.propTypes = {
  favCharacters: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFavClicked: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
};
