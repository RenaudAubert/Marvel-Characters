import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Character extends Component {
  constructor(props) {
    super(props);

    this.favClick = this.favClick.bind(this);
  }

  favClick() {
    const { character, onFavClicked } = this.props;
    onFavClicked(character.id);
  }

  // Render each character card with image, name and description
  render() {
    const { character, isFav } = this.props;
    const name = character.name || '';
    const description = character.description || 'No description available for this character';
    const imgURL = character.thumbnail && `${character.thumbnail.path}/landscape_large.${character.thumbnail.extension}`;

    return (
      <div className="h-100 card mb-4 box-shadow">
        <Link to={`/characters/${character.id}`}>
          <img className="card-img-top" src={imgURL} alt="" />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className={`card-text ${character.description}` ? '' : ' text-danger'}>{description}</p>
        </div>
        <div className="card-footer text-muted">
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link to={`/characters/${character.id}`}>
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  <i className="fas fa-search" />
                </button>
              </Link>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.favClick}>
                <i className={isFav ? 'fas fa-star' : 'far fa-star'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Character.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.object,
  }).isRequired,
  isFav: PropTypes.bool,
  onFavClicked: PropTypes.func.isRequired
};

Character.defaultProps = {
  isFav: false
};
