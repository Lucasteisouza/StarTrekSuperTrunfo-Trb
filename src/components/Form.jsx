import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onSaveButtonClick,
      onInputChange } = this.props;

    let trunfoPicker;
    if (hasTrunfo) {
      trunfoPicker = (<p>Você já tem um Super Trunfo em seu baralho</p>);
    } else {
      trunfoPicker = (
        <label htmlFor="cardTrunfo" className="form-check-label">
          Super Trunfo?
          <input
            className="form-check-input"
            type="checkbox"
            name="cardTrunfo"
            id="cardTrunfo"
            data-testid="trunfo-input"
            checked={ cardTrunfo }
            onChange={ onInputChange }
          />
        </label>);
    }
    return (
      <div className="card-form-container">
        <h2>Adicione uma nova carta</h2>
        <form className="row-mb-3">
          <label htmlFor="cardName" className="form-label">
            Nome da carta:
            <input
              className="form-control"
              type="text"
              name="cardName"
              id="cardName"
              data-testid="name-input"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
          Descrição da carta:
          <label htmlFor="cardDescription" className="form-label">
            <textarea
              className="form-control"
              name="cardDescription"
              id="cardDescription"
              cols="30"
              rows="2"
              data-testid="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr1" className="form-label">
            Inteligência:
            <input
              className="form-control num-form-control"
              type="number"
              name="cardAttr1"
              id="cardAttr1"
              data-testid="attr1-input"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr2" className="form-label">
            Liderança:
            <input
              className="form-control num-form-control"
              type="number"
              name="cardAttr2"
              id="cardAttr2"
              data-testid="attr2-input"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr3" className="form-label">
            Diplomacia:
            <input
              className="form-control num-form-control"
              type="number"
              name="cardAttr3"
              id="cardAttr3"
              data-testid="attr3-input"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardImage" className="form-label">
            Imagem da carta:
            <input
              className="form-control form-control"
              type="text"
              name="cardImage"
              id="cardImage"
              data-testid="image-input"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardRare" className="form-label">
            Raridade: 
            <select
              className="form-select num-form-control"
              name="cardRare"
              id="cardRare"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
          </label>
          <div className="form-footer">
            { trunfoPicker }
            <button
              className="btn btn-primary"
              type="button"
              data-testid="save-button"
              disabled={ isSaveButtonDisabled }
              onClick={ onSaveButtonClick }
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
