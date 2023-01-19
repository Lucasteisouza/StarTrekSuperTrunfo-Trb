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
      cardTrunfo,
      preview,
      onDeleteBtnClick } = this.props;

    const deleteBtn = (
      <button
        className="btn btn-danger"
        type="button"
        data-testid="delete-button"
        onClick={ onDeleteBtnClick }
      >
        Excluir
      </button>);
    return (
      <div className="prev-card">
        <h3 className="card-content" data-testid="name-card">{ cardName }</h3>
        <div className={ cardRare }>
          <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        </div>
        <p
          className="card-content"
          data-testid="description-card"
        >
          { cardDescription }
        </p>
        <p
          className="card-content"
          data-testid="attr1-card"
        >
          {`Inteligência: ${cardAttr1}`}
        </p>
        <p
          className="card-content"
          data-testid="attr2-card"
        >
          {`Liderança: ${cardAttr2}`}
        </p>
        <p
          className="card-content"
          data-testid="attr3-card"
        >
          {`Diplomacia: ${cardAttr3}`}
        </p>
        <p className="card-content" data-testid="rare-card">{`Raridade: ${cardRare}`}</p>
        {
          cardTrunfo && <p data-testid="trunfo-card" className={ cardTrunfo.toString() }>Super Trunfo</p>
        }
        { !preview && deleteBtn}
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
  preview: PropTypes.bool.isRequired,
  onDeleteBtnClick: PropTypes.func.isRequired,
};

export default Card;
