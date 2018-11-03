import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class DetailedCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = { character: {} };

    this.favClick = this.favClick.bind(this);
  }

  // Get data from Marvel API if component is mounted
  componentDidMount() {
    const { match } = this.props;

    fetch(`/api/characters/${match.params.id}`)
      .then(res => res.json())
      .then(character => this.setState({ character }));
  }

  favClick() {
    const { onFavClicked } = this.props;
    const { character } = this.state;

    if (character.data) {
      onFavClicked(character.data.results[0].id);
    }
  }

  // Render each character card with image, name and description
  render() {
    const { favCharacters } = this.props;
    let { character } = this.state;
    let returnedDOM = <div />;

    if (character.data) {
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
            <Link to="/">
              <i className="fas fa-arrow-left fa-4x" />
            </Link>
          </div>
          <div className="row">
            <div className="col-md-5">
              <img className="card-img-left flex-auto d-none d-md-block" src={imgURL} alt="" />
            </div>
            <div className="col-md-7">
              <h5>
                <LinkType character={character} type="detail" text={character.name} />
                <button type="button" className="btn btn-sm btn-outline-secondary" id="favButton" onClick={this.favClick}>
                  <i className={`${isFav ? 'fas fa-star' : 'far fa-star'} text-warning fa-lg`} />
                </button>
              </h5>
              <h6>Description</h6>
              <p>{description}</p>
              <div className="row">
                <div className="col-sm-6">
                  <h6>
                    Comics
                    <LinkType character={character} type="comiclink" text={`(${character.comics.available})`} />
                  </h6>
                  {comicsList('comics', 4)}
                  <p className="text-center">
                    <LinkType character={character} type="comiclink" text="More Comics" />
                  </p>
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
    }

    return (
      <div className="container">
        {returnedDOM}
      </div>
    );
  }
}

// Return link if type (detail, wiki, comiclink) is found
const LinkType = (props) => {
  const { character, type, text } = props;

  let link = text;
  const urlType = character.urls.find(url => url.type === type);
  if (urlType !== undefined) {
    link = <a href={urlType.url} target="_blank" rel="noopener noreferrer">{text}</a>;
  }
  return link;
};

DetailedCharacter.propTypes = {
  favCharacters: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFavClicked: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired
};

LinkType.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.object,
  }).isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

LinkType.defaultProps = {
  type: 'detail',
  text: 'detail'
};
