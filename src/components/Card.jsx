import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo } = this.props;
    return (
      <div>
        <h4 data-testid="name-card">{ cardName }</h4>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p data-testid="description-card">{ cardDescription }</p>
        <p data-testid="attr1-card">{`Placeholder Attr1: ${cardAttr1}`}</p>
        <p data-testid="attr2-card">{`Placeholder Attr2: ${cardAttr2}`}</p>
        <p data-testid="attr3-card">{`Placeholder Attr3: ${cardAttr3}`}</p>
        <p data-testid="rare-card">{`Raridade: ${cardRare}`}</p>
        {
          cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p>
        }
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
