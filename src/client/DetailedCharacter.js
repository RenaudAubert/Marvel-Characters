import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FavButton, LinkType } from './layout';

export default class DetailedCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {character: {}};
  }

  // Get data from Marvel API if component is mounted
  componentDidMount() {
    const { match, shouldFetch } = this.props;

    // Prevents fetching if character was found in characters array in App
    if (shouldFetch) {
      // Fetch a single character using id
      fetch(`/api/characters/${match.params.id}`)
      .then(res => res.json())
      .then(apiResult => {
        if (apiResult.data && apiResult.data.results.length) {
          apiResult.data.results[0].favorite = false;
          this.setState({ character: apiResult.data.results[0] });
        }
      });
    }
  }

  // Render each character card with image, name and description
  render() {
    let { character, shouldFetch, onFavClicked } = this.props;
    // Assign value returned by Marvel API if character was not found in App
    if (shouldFetch) {
      character = this.state.character;
    }
    let returnedDOM = (
      <p className="text-center text-danger">
        <strong>No character found</strong>
      </p>
    );

    // If object is empty
    if (Object.keys(character).length !== 0) {
      const imgURL = character.thumbnail ? `${character.thumbnail.path}/landscape_large.${character.thumbnail.extension}` : '';
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
                <FavButton characterId={character.id} isFav={character.favorite} onFavClicked={onFavClicked} />
              </h5>
              <h6>Description</h6>
              {character.description ?
                <p className="card-text">{character.description}</p> :
                <p className="card-text text-danger">{character.description}</p>
              }
              <div className="row">
                <div className="col-sm-6">
                  <h6>
                    Comics
                    <LinkType character={character} type="comiclink" text={` (${character.comics.available})`} />
                  </h6>
                  {
                    character.comics.items.slice(0, 4).map(comic => (
                      <li key={comic.name}>{comic.name}</li>
                    ))
                  }
                  <LinkType character={character} type="comiclink" text="Details" />
                </div>
                <div className="col-sm-6">
                  <h6>Series</h6>
                  {
                    character.series.items.slice(0, 4).map(serie => (
                      <li key={serie.name}>{serie.name}</li>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
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
  character: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.object,
    favorite: PropTypes.bool
  }),
  onFavClicked: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  shouldFetch: PropTypes.bool
};

DetailedCharacter.defaultProps = {
  character: {},
  shouldFetch: false
};
