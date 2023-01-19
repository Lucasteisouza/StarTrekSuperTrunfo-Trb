import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    deck: [],
    nameFilter: '',
    rareFilter: '',
    trunfoFilter: false,
  };

  validator = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3 } = this.state;
    const noBlanks = (cardName !== ''
    && cardDescription !== ''
    && cardImage !== ''
    && cardRare !== '');
    const totalCap = 210;
    const attrCap = 90;
    const lowCap = 0;
    const parsedAtt1 = parseInt(cardAttr1, 10);
    const parsedAtt2 = parseInt(cardAttr2, 10);
    const parsedAtt3 = parseInt(cardAttr3, 10);
    const sum = parsedAtt1 + parsedAtt2 + parsedAtt3;
    const validCaps = (sum <= totalCap
      && parsedAtt1 <= attrCap
      && parsedAtt2 <= attrCap
      && parsedAtt3 <= attrCap
      && parsedAtt1 >= lowCap
      && parsedAtt2 >= lowCap
      && parsedAtt3 >= lowCap
    );
    const valid = (validCaps && noBlanks);
    this.setState({
      isSaveButtonDisabled: !valid,
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validator);
  };

  onSaveButtonClick = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState((prevState) => ({
      deck: [...prevState.deck, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }), (() => {
      const { deck } = this.state;
      const alreadyTrunfo = deck.find((element) => element.cardTrunfo === true);
      if (alreadyTrunfo) {
        this.setState({
          hasTrunfo: true,
        });
      }
    }));
  };

  onDeleteBtnClick = ({ target }) => {
    const { deck } = this.state;
    const selectedCardName = target.parentNode.childNodes[0].innerHTML;
    const filteredDeck = deck.filter((card) => card.cardName !== selectedCardName);
    let deckHasTrunfo = false;
    if (filteredDeck.find((card) => card.cardTrunfo !== undefined)) {
      deckHasTrunfo = true;
    }
    this.setState({
      deck: filteredDeck,
      hasTrunfo: deckHasTrunfo,
    });
  };

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      deck,
      nameFilter,
      rareFilter,
      trunfoFilter,
    } = this.state;

    const deckFF = trunfoFilter ? deck.filter((card) => card.cardTrunfo) : deck;

    return (
      <div className="master">
        <h1>Star Trek Trunfo</h1>
        <div className="submaster">
          <div className="deck-builder-container">
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
            <div className="prev-card-container">
              <h3>Preview</h3>
              <Card
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }
                preview
                onDeleteBtnClick={ this.onDeleteBtnClick }
              />
            </div>
          </div>
          <div className="grimoire-container">
            <div className="filter-container">
              <h4 className="filter-title">Filtros de Busca</h4>
              <label htmlFor="nameFilter" className="form-label">
                Filtrar por nome:
                <input
                  className="form-control"
                  type="text"
                  name="nameFilter"
                  id="nameFilter"
                  disabled={ trunfoFilter }
                  data-testid="name-filter"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="rareFilter" className="form-label rare-filter">
                Filtrar por raridade:
                <select
                  className="form-select"
                  name="rareFilter"
                  id="rareFilter"
                  onChange={ this.onInputChange }
                  disabled={ trunfoFilter }
                  data-testid="rare-filter"
                >
                  <option value="todas">Todas</option>
                  <option value="normal">Normal</option>
                  <option value="raro">Raro</option>
                  <option value="muito raro">Muito raro</option>
                </select>
              </label>
              <label htmlFor="trunfoFilter" className="form-check-label">
                Mostrar Super Trunfo?
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="trunfoFilter"
                  id="trunfoFilter"
                  onChange={ this.onInputChange }
                  data-testid="trunfo-filter"
                />
              </label>
            </div>
            <div className="deck-container">
              {
                deckFF
                  .filter((card) => {
                    const rarity = (rareFilter === 'todas') ? '' : rareFilter;
                    if (rarity === 'raro') {
                      return card.cardRare === rarity;
                    } return card.cardRare.includes(rarity);
                  })
                  .filter((card) => card.cardName.includes(nameFilter))
                  .map((card) => (<Card
                    key={ card.cardName }
                    cardName={ card.cardName }
                    cardDescription={ card.cardDescription }
                    cardAttr1={ card.cardAttr1 }
                    cardAttr2={ card.cardAttr2 }
                    cardAttr3={ card.cardAttr3 }
                    cardImage={ card.cardImage }
                    cardRare={ card.cardRare }
                    cardTrunfo={ card.cardTrunfo }
                    preview={ false }
                    onDeleteBtnClick={ this.onDeleteBtnClick }
                  />))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
