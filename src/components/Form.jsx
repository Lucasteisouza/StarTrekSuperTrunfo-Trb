import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form>
        <label htmlFor="name-input">
          Nome da carta:
          <input
            type="text"
            name="name-input"
            id="name-input"
            data-testid="name-input"
          />
        </label>
        Descrição da carta:
        <label htmlFor="description-input">
          <textarea
            name="description-input"
            id="description-input"
            cols="30"
            rows="10"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="attr1-input">
          Placeholder attr1:
          <input
            type="number"
            name="attr1-input"
            id="attr1-input"
            data-testid="attr1-input"
          />
        </label>
        <label htmlFor="attr2-input">
          Placeholder attr2:
          <input
            type="number"
            name="attr2-input"
            id="attr2-input"
            data-testid="attr2-input"
          />
        </label>
        <label htmlFor="attr3-input">
          Placeholder attr3:
          <input
            type="number"
            name="attr3-input"
            id="attr3-input"
            data-testid="attr3-input"
          />
        </label>
        <label htmlFor="image-input">
          Nome da carta:
          <input
            type="text"
            name="image-input"
            id="image-input"
            data-testid="image-input"
          />
        </label>
        <label htmlFor="rare-input">
          <select name="rare-input" id="rare-input" data-testid="rare-input">
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-input">
          Super Trunfo?
          <input
            type="checkbox"
            name="trunfo-input"
            id="trunfo-input"
            data-testid="trunfo-input"
          />
        </label>
        <button type="submit" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
